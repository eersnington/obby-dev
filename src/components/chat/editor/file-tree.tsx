import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Edit,
  Trash2,
} from "lucide-react";
import {
  useFileExplorer,
  useFileExplorerOpenStates,
  useFilePaths,
} from "@/stores/file-explorer";
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
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateArrayKey } from "@/lib/utils/array-utils";

interface FileTreeProps {
  item: FileItem;
  depth?: number;
  path?: string;
  onFileClick: (filePath: string) => void;
}

export default function FileTree({
  item,
  depth = 0,
  path = "",
  onFileClick,
}: FileTreeProps) {
  const currentPath = path ? `${path}/${item.name}` : item.name;
  const { filePaths } = useFilePaths();
  const { openFolders, setOpenFolder } = useFileExplorerOpenStates();
  const { deleteFileExplorer, renameItemExplorer } = useFileExplorer();

  const isOpen = openFolders.has(currentPath);
  const isSelected = currentPath === filePaths;

  // Dialog states for individual file/folder operations
  const [renameDialog, setRenameDialog] = useState(false);
  const [newItemName, setNewItemName] = useState(item.name);

  // Sort function for children
  const sortItems = (items: FileItem[]) => {
    return [...items].sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "folder" ? -1 : 1;
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === "folder") {
      setOpenFolder(currentPath, !isOpen);
    } else {
      onFileClick(currentPath);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (item.type === "folder") {
        setOpenFolder(currentPath, !isOpen);
      } else {
        onFileClick(currentPath);
      }
    }
  };

  const openRenameDialog = () => {
    setNewItemName(item.name);
    setRenameDialog(true);
  };

  const handleRename = () => {
    if (newItemName.trim() && newItemName !== item.name) {
      renameItemExplorer(currentPath, newItemName.trim());
      setRenameDialog(false);
      toast.success(
        `${item.type === "folder" ? "Folder" : "File"} renamed to "${newItemName}"`,
      );
    }
  };

  const handleDelete = () => {
    deleteFileExplorer(currentPath);
    toast.success(
      `${item.type === "folder" ? "Folder" : "File"} "${item.name}" deleted`,
    );
  };

  return (
    <div className="w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start h-7 px-1 mb-1 overflow-hidden ${
              isSelected ? "bg-accent" : ""
            }`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center gap-1 w-full min-w-0 overflow-hidden">
              {item.type === "folder" && (
                <span className="flex-shrink-0">
                  {isOpen ? (
                    <ChevronDown size={12} />
                  ) : (
                    <ChevronRight size={12} />
                  )}
                </span>
              )}
              {item.type === "folder" ? (
                <Folder size={12} className="flex-shrink-0" />
              ) : (
                <File size={12} className="flex-shrink-0" />
              )}
              <span className="text-xs truncate min-w-0 flex-1 text-left overflow-hidden">
                {item.name}
              </span>
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={openRenameDialog}>
            <Edit className="mr-2 h-4 w-4" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            onClick={handleDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Rename Dialog */}
      <Dialog open={renameDialog} onOpenChange={setRenameDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Rename {item.type === "folder" ? "Folder" : "File"}
            </DialogTitle>
            <DialogDescription>
              Enter the new name for this {item.type}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newItemName.trim()) {
                  handleRename();
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              disabled={!newItemName.trim() || newItemName === item.name}
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isOpen && item.children && (
        <div className="w-full">
          {sortItems(item.children).map((child, index) => (
            <FileTree
              key={generateArrayKey(index)}
              item={child}
              depth={depth + 1}
              path={currentPath}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
