import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Edit,
  Trash2,
} from "lucide-react";
import {
  useFileExplorerOpenStates,
  useFilePaths,
} from "@/stores/file-explorer";
import { useEditorCode } from "@/stores/editor";
import type { FileItem } from "@/types/file-structure";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FolderPlus } from "lucide-react"; // Added for folder context menu

interface FileTreeProps {
  item: FileItem;
  depth?: number;
  path?: string; // Base path from parent
  onFileClick: (filePath: string) => void;
  onNewFileInFolder: (targetPath: string) => void; // From FileExplorer
  onNewFolderInFolder: (targetPath: string) => void; // From FileExplorer
}

export default function FileTree({
  item,
  depth = 0,
  path = "",
  onFileClick,
  onNewFileInFolder,
  onNewFolderInFolder,
}: FileTreeProps) {
  const currentPath = path ? `${path}/${item.name}` : item.name;

  const { selectedFilePath, setSelectedFilePath } = useFilePaths();
  const { expandedFolders, toggleFolder, expandFolder } =
    useFileExplorerOpenStates();
  const editorCodeActions = useEditorCode.getState();

  const isOpen = expandedFolders.has(currentPath);
  const isSelected = currentPath === selectedFilePath;

  const [renameDialog, setRenameDialog] = useState(false);
  const [newItemName, setNewItemName] = useState(item.name);

  const sortItems = useCallback((items: FileItem[]): FileItem[] => {
    return [...items].sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "folder" ? -1 : 1;
    });
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (item.type === "folder") {
        toggleFolder(currentPath);
      } else {
        onFileClick(currentPath);
      }
    },
    [item.type, currentPath, toggleFolder, onFileClick],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        if (item.type === "folder") {
          toggleFolder(currentPath);
        } else {
          onFileClick(currentPath);
        }
      }
    },
    [item.type, currentPath, toggleFolder, onFileClick],
  );

  const openRenameDialog = useCallback(() => {
    setNewItemName(item.name); // Reset to current name when opening
    setRenameDialog(true);
  }, [item.name]);

  const handleRename = useCallback(() => {
    const trimmedName = newItemName.trim();
    if (trimmedName && trimmedName !== item.name) {
      const newPath = editorCodeActions.renameItem(currentPath, trimmedName);
      setRenameDialog(false);
      if (newPath) {
        toast.success(
          `${item.type === "folder" ? "Folder" : "File"} renamed to "${trimmedName}"`,
        );
        if (isSelected) {
          setSelectedFilePath(newPath); // Update selection to new path
        }
        // Ensure parent of newPath is expanded if it's a folder
        const parentOfNew = newPath.substring(0, newPath.lastIndexOf("/"));
        if (parentOfNew) expandFolder(parentOfNew);
      } else {
        toast.error(
          "Failed to rename. Name might be invalid or already exist.",
        );
      }
    } else if (trimmedName === item.name) {
      setRenameDialog(false); // Close if name is unchanged
    }
  }, [
    newItemName,
    item.name,
    item.type,
    currentPath,
    editorCodeActions,
    isSelected,
    setSelectedFilePath,
    expandFolder,
  ]);

  const handleDelete = useCallback(() => {
    editorCodeActions.deleteItem(currentPath);
    toast.success(
      `${item.type === "folder" ? "Folder" : "File"} "${item.name}" deleted`,
    );
    if (isSelected) {
      setSelectedFilePath(null); // Clear selection if deleted item was selected
    }
  }, [
    currentPath,
    item.name,
    item.type,
    editorCodeActions,
    isSelected,
    setSelectedFilePath,
  ]);

  const handleNewFileInThisFolder = useCallback(() => {
    onNewFileInFolder(currentPath);
  }, [currentPath, onNewFileInFolder]);

  const handleNewFolderInThisFolder = useCallback(() => {
    onNewFolderInFolder(currentPath);
  }, [currentPath, onNewFolderInFolder]);

  return (
    <div className="w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start h-7 px-1 mb-1 overflow-hidden ${
              isSelected ? "bg-accent text-accent-foreground" : "" // Improved selected style
            }`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-expanded={item.type === "folder" ? isOpen : undefined}
            aria-selected={isSelected}
            role="treeitem"
          >
            <div className="flex items-center gap-1 w-full min-w-0 overflow-hidden">
              {item.type === "folder" && (
                <span className="flex-shrink-0">
                  {isOpen ? (
                    <ChevronDown size={16} /> // Slightly larger icons
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </span>
              )}
              {item.type === "folder" ? (
                <Folder size={16} className="flex-shrink-0" />
              ) : (
                <File size={16} className="flex-shrink-0" />
              )}
              <span className="text-sm truncate min-w-0 flex-1 text-left overflow-hidden">
                {" "}
                {/* text-sm for better readability */}
                {item.name}
              </span>
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {item.type === "folder" && (
            <>
              <ContextMenuItem onClick={handleNewFileInThisFolder}>
                <Plus className="mr-2 h-4 w-4" />
                New File
              </ContextMenuItem>
              <ContextMenuItem onClick={handleNewFolderInThisFolder}>
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </ContextMenuItem>
            </>
          )}
          <ContextMenuItem onClick={openRenameDialog}>
            <Edit className="mr-2 h-4 w-4" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            onClick={handleDelete}
            className="text-destructive focus:text-destructive focus:bg-destructive/10" // Improved destructive style
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={renameDialog} onOpenChange={setRenameDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Rename {item.type === "folder" ? "Folder" : "File"}
            </DialogTitle>
            <DialogDescription>
              Enter the new name for "{item.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                }
              }}
              autoFocus
              onFocus={(e) => e.target.select()} // Auto-select text on focus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              disabled={
                !newItemName.trim() ||
                newItemName.trim() === item.name ||
                newItemName.includes("/") // Prevent slashes in names
              }
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isOpen &&
        item.children &&
        item.children.length > 0 && ( // Added check for children.length
          <fieldset className="w-full border-none p-0 m-0">
            {" "}
            {/* Changed div to fieldset, reset styles */}
            {sortItems(item.children).map(
              (
                child, // Removed index from map
              ) => (
                <FileTree
                  key={`${currentPath}/${child.name}`} // More robust key
                  item={child}
                  depth={depth + 1}
                  path={currentPath}
                  onFileClick={onFileClick}
                  onNewFileInFolder={onNewFileInFolder} // Pass down
                  onNewFolderInFolder={onNewFolderInFolder} // Pass down
                />
              ),
            )}
          </fieldset>
        )}
    </div>
  );
}
