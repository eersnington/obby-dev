import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Plus,
  FolderPlus,
  Edit,
  Trash2,
} from "lucide-react";
import {
  useFilePaths,
  useFileExplorerOpenStates,
  useFileExplorer,
} from "@/stores/file-explorer";
import type { FileItem } from "@/types/file-structure";
import { generateArrayKey } from "@/lib/utils/array-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import { toast } from "sonner";

const FileExplorer = () => {
  const { fileExplorer, addFileExplorer, newFolderExplorer } =
    useFileExplorer();
  const { setFilePaths } = useFilePaths();
  const [newFileName, setNewFileName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [isNewFilePopoverOpen, setIsNewFilePopoverOpen] = useState(false);
  const [isNewFolderPopoverOpen, setIsNewFolderPopoverOpen] = useState(false);

  // Sort function to put folders before files
  const sortItems = (items: FileItem[]) => {
    return [...items].sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name); // Alphabetical within same type
      }
      return a.type === "folder" ? -1 : 1; // Folders before files
    });
  };

  const onFileClick = (filePath: string) => {
    setFilePaths(filePath);
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      addFileExplorer(newFileName.trim());
      setNewFileName("");
      setIsNewFilePopoverOpen(false);
      toast.success(`File "${newFileName}" created successfully`);
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      newFolderExplorer(newFolderName.trim());
      setNewFolderName("");
      setIsNewFolderPopoverOpen(false);
      toast.success(`Folder "${newFolderName}" created successfully`);
    }
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
          <ContextMenuItem asChild>
            <Popover
              open={isNewFilePopoverOpen}
              onOpenChange={setIsNewFilePopoverOpen}
            >
              <PopoverTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none w-full hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <Plus className="mr-2 h-4 w-4" />
                New File
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Create New File
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Enter the name for your new file.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="filename">Name</Label>
                      <Input
                        id="filename"
                        placeholder="index.js"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCreateFile();
                          }
                        }}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleCreateFile} size="sm">
                        Create File
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </ContextMenuItem>

          <ContextMenuItem asChild>
            <Popover
              open={isNewFolderPopoverOpen}
              onOpenChange={setIsNewFolderPopoverOpen}
            >
              <PopoverTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none w-full hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Create New Folder
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Enter the name for your new folder.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="foldername">Name</Label>
                      <Input
                        id="foldername"
                        placeholder="components"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCreateFolder();
                          }
                        }}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleCreateFolder} size="sm">
                        Create Folder
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default FileExplorer;

interface FileTreeProps {
  item: FileItem;
  depth?: number;
  path?: string;
  onFileClick: (filePath: string) => void;
}

const FileTree = ({
  item,
  depth = 0,
  path = "",
  onFileClick,
}: FileTreeProps) => {
  const currentPath = path ? `${path}/${item.name}` : item.name;
  const { filePaths } = useFilePaths();
  const { openFolders, setOpenFolder } = useFileExplorerOpenStates();
  const { deleteFileExplorer, renameFileExplorer, renameFolderExplorer } =
    useFileExplorer();
  const isOpen = openFolders.has(currentPath);
  const isSelected = currentPath === filePaths;
  const [isRenamePopoverOpen, setIsRenamePopoverOpen] = useState(false);
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

  const handleRename = () => {
    if (newItemName.trim() && newItemName !== item.name) {
      if (item.type === "folder") {
        renameFolderExplorer(currentPath, newItemName.trim());
      } else {
        renameFileExplorer(currentPath, newItemName.trim());
      }
      setIsRenamePopoverOpen(false);
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
          <ContextMenuItem asChild>
            <Popover
              open={isRenamePopoverOpen}
              onOpenChange={setIsRenamePopoverOpen}
            >
              <PopoverTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none w-full hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <Edit className="mr-2 h-4 w-4" />
                Rename
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Rename {item.type === "folder" ? "Folder" : "File"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Enter the new name for this {item.type}.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="rename">Name</Label>
                      <Input
                        id="rename"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRename();
                          }
                        }}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleRename} size="sm">
                        Rename
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
};
