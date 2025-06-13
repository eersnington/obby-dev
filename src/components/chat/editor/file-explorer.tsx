import { Plus, FolderPlus } from "lucide-react";
import { useFilePaths, useFileExplorer } from "@/stores/file-explorer";
import type { FileItem } from "@/types/file-structure";
import { generateArrayKey } from "@/lib/utils/array-utils";
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
import { useState } from "react";
import { toast } from "sonner";
import FileTree from "./file-tree";

export default function FileExplorer() {
  const { fileExplorer, addFileExplorer, newFolderExplorer } =
    useFileExplorer();
  const { setFilePaths } = useFilePaths();

  const [newFileDialog, setNewFileDialog] = useState(false);
  const [newFolderDialog, setNewFolderDialog] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");

  // Sort function to put folders before files
  const sortItems = (items: FileItem[]) => {
    return [...items].sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "folder" ? -1 : 1;
    });
  };

  const onFileClick = (filePath: string) => {
    setFilePaths(filePath);
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      // Create file at root level by passing empty string as targetPath
      addFileExplorer(newFileName.trim(), "");
      setNewFileName("");
      setNewFileDialog(false);
      toast.success(`File "${newFileName.trim()}" created successfully`);
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // Create folder at root level by passing empty string as targetPath
      newFolderExplorer(newFolderName.trim(), "");
      setNewFolderName("");
      setNewFolderDialog(false);
      toast.success(`Folder "${newFolderName.trim()}" created successfully`);
    }
  };

  const openNewFileDialog = () => {
    setNewFileName("");
    setNewFileDialog(true);
  };

  const openNewFolderDialog = () => {
    setNewFolderName("");
    setNewFolderDialog(true);
  };

  return (
    <div className="h-full flex flex-col border-r bg-muted/20 min-w-0">
      <div className="p-3 border-b bg-muted/30">
        <h1 className="text-sm font-medium">Explorer</h1>
      </div>

      <ContextMenu>
        <ContextMenuTrigger className="flex-1 p-2 min-h-0 overflow-hidden">
          <div className="space-y-1">
            {sortItems(fileExplorer).map((item, index) => (
              <FileTree
                key={generateArrayKey(index)}
                item={item}
                onFileClick={onFileClick}
              />
            ))}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={openNewFileDialog}>
            <Plus className="mr-2 h-4 w-4" />
            New File
          </ContextMenuItem>
          <ContextMenuItem onClick={openNewFolderDialog}>
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
              Enter the name for your new file including the extension.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="e.g., index.js, style.css, README.md"
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
              Enter the name for your new folder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="e.g., components, utils, assets"
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
