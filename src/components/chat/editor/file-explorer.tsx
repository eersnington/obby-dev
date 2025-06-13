import { Plus, FolderPlus } from "lucide-react";
import {
  useFilePaths,
  useFileExplorerOpenStates,
  useFileExplorer,
  // getParentPath, // Not used in this file
} from "@/stores/file-explorer";
import { useEditorCode } from "@/stores/editor";
import type { FileItem } from "@/types/file-structure";
// import { generateArrayKey } from "@/lib/utils/array-utils"; // Not used
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import FileTree from "./file-tree";

export default function FileExplorer() {
  const { fileExplorerTree } = useFileExplorer();
  const { setSelectedFilePath } = useFilePaths();
  const { expandFolder } = useFileExplorerOpenStates();
  const editorCodeActions = useEditorCode.getState();

  const [newFileDialog, setNewFileDialog] = useState(false);
  const [newFolderDialog, setNewFolderDialog] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  // targetPathForCreation will store the path of the folder right-clicked, or "" for root
  const [targetPathForCreation, setTargetPathForCreation] =
    useState<string>("");

  const sortItems = useCallback((items: FileItem[]): FileItem[] => {
    return [...items].sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "folder" ? -1 : 1;
    });
  }, []);

  const onFileClick = useCallback(
    (filePath: string) => {
      setSelectedFilePath(filePath);
    },
    [setSelectedFilePath],
  );

  const handleCreateFile = useCallback(() => {
    if (newFileName.trim()) {
      const trimmedName = newFileName.trim();
      const newPath = editorCodeActions.createFile(
        targetPathForCreation,
        trimmedName,
      );
      if (newPath) {
        setSelectedFilePath(newPath);
        if (targetPathForCreation) {
          expandFolder(targetPathForCreation);
        }
        toast.success(`File "${trimmedName}" created`);
      } else {
        toast.error(`Failed to create file "${trimmedName}"`);
      }
      setNewFileName("");
      setNewFileDialog(false);
    }
  }, [
    newFileName,
    editorCodeActions,
    targetPathForCreation,
    setSelectedFilePath,
    expandFolder,
  ]);

  const handleCreateFolder = useCallback(() => {
    if (newFolderName.trim()) {
      const trimmedName = newFolderName.trim();
      const newPath = editorCodeActions.createFolder(
        targetPathForCreation,
        trimmedName,
      );
      if (newPath) {
        // Optionally select or highlight the new folder, or expand its parent
        if (targetPathForCreation) {
          expandFolder(targetPathForCreation);
        }
        expandFolder(newPath); // Expand the newly created folder
        toast.success(`Folder "${trimmedName}" created`);
      } else {
        toast.error(`Failed to create folder "${trimmedName}"`);
      }
      setNewFolderName("");
      setNewFolderDialog(false);
    }
  }, [newFolderName, editorCodeActions, targetPathForCreation, expandFolder]);

  const openNewFileDialogForPath = useCallback((targetPath: string) => {
    setTargetPathForCreation(targetPath);
    setNewFileName("");
    setNewFileDialog(true);
  }, []);

  const openNewFolderDialogForPath = useCallback((targetPath: string) => {
    setTargetPathForCreation(targetPath);
    setNewFolderName("");
    setNewFolderDialog(true);
  }, []);

  return (
    <div className="h-full flex flex-col border-r bg-muted/20 min-w-0">
      <div className="p-3 border-b bg-muted/30">
        <h1 className="text-sm font-medium">Explorer</h1>
      </div>

      <ContextMenu>
        <ContextMenuTrigger className="flex-1 p-2 min-h-0 overflow-auto">
          {" "}
          {/* Changed to overflow-auto */}
          <div className="space-y-1">
            {sortItems(fileExplorerTree).map(
              (
                item, // item key was index, changed to item.name + path for more stability if needed
              ) => (
                <FileTree
                  key={item.name} // Assuming names are unique at root, FileTree will handle deeper keys
                  item={item}
                  onFileClick={onFileClick}
                  // Pass functions to open dialogs with correct target path
                  onNewFileInFolder={openNewFileDialogForPath}
                  onNewFolderInFolder={openNewFolderDialogForPath}
                />
              ),
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => openNewFileDialogForPath("")}>
            <Plus className="mr-2 h-4 w-4" />
            New File
          </ContextMenuItem>
          <ContextMenuItem onClick={() => openNewFolderDialogForPath("")}>
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={newFileDialog} onOpenChange={setNewFileDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Enter name for new file (e.g., index.js). It will be created in{" "}
              {targetPathForCreation || "root"}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="e.g., index.js, style.css"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newFileName.trim()) {
                  handleCreateFile();
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFileDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFile} disabled={!newFileName.trim()}>
              Create File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newFolderDialog} onOpenChange={setNewFolderDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter name for new folder. It will be created in{" "}
              {targetPathForCreation || "root"}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="e.g., components, utils"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newFolderName.trim()) {
                  handleCreateFolder();
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              disabled={!newFolderName.trim()}
            >
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
