import { create } from "zustand";
import { fileStructure, type FileItem } from "@/types/file-structure";
import { syncFileExplorerFromEditorCode } from "@/lib/utils/file-explorer-utils";
import { useEditorCode } from "@/stores/editor";

export interface FilePaths {
  filePaths: string;
  fileupdating: boolean;
  setFilePaths: (filePaths: string) => void;
  setFileupdating: (fileupdating: boolean) => void;
  resetFilePaths: () => void;
}

export const useFilePaths = create<FilePaths>((set) => ({
  fileupdating: false,
  filePaths: "",
  setFilePaths: (filePaths) => set({ filePaths }),
  setFileupdating: (fileupdating: boolean) =>
    set({ fileupdating: !fileupdating }),
  resetFilePaths: () => set({ filePaths: "", fileupdating: false }),
}));

export interface FileExplorerOpenStates {
  openFolders: Set<string>;
  setOpenFolder: (path: string, isOpen: boolean) => void;
  resetOpenFolders: () => void;
}

export const useFileExplorerOpenStates = create<FileExplorerOpenStates>(
  (set) => ({
    openFolders: new Set<string>(),
    setOpenFolder: (path: string, isOpen: boolean) =>
      set((state) => {
        const newOpenFolders = new Set(state.openFolders);
        if (isOpen) {
          newOpenFolders.add(path);
        } else {
          newOpenFolders.delete(path);
        }
        return { openFolders: newOpenFolders };
      }),
    resetOpenFolders: () => set({ openFolders: new Set<string>() }),
  }),
);

interface FileExplorer {
  fileExplorer: FileItem[];
  setFileExplorer: (fileExplorer: FileItem[]) => void;
  resetFileExplorer: () => void;
  addFileExplorer: (fileName: string, targetPath?: string) => void;
  addFileByAI: (filePath: string, fileName: string) => void;
  deleteFileExplorer: (itemPath: string) => void;
  renameItemExplorer: (itemPath: string, newName: string) => void;
  newFolderExplorer: (folderName: string, targetPath?: string) => void;
}

// Helper function to add an item to the file tree at a specific path
const addItemToTree = (
  items: FileItem[],
  newItem: FileItem,
  targetPath?: string,
): FileItem[] => {
  const { openFolders } = useFileExplorerOpenStates.getState();
  const currentPath =
    targetPath !== undefined ? targetPath : Array.from(openFolders).pop() || "";

  if (!currentPath || currentPath === "") {
    // Add to root level
    return [...items, newItem];
  }

  const pathParts = currentPath.split("/");

  const addItemToPath = (items: FileItem[], path: string[]): FileItem[] => {
    if (path.length === 0) {
      return [...items, newItem];
    }

    const currentFolder = path[0];
    const remainingPath = path.slice(1);

    return items.map((item) => {
      if (item.name === currentFolder && item.type === "folder") {
        return {
          ...item,
          children: addItemToPath(item.children || [], remainingPath),
        };
      }
      return item;
    });
  };

  return addItemToPath(items, pathParts);
};

export const useFileExplorer = create<FileExplorer>((set) => ({
  fileExplorer: fileStructure,
  setFileExplorer: (fileExplorer) => set({ fileExplorer }),
  resetFileExplorer: () => set({ fileExplorer: fileStructure }),
  addFileByAI: (filePath: string, fileName: string) =>
    set((state) => {
      const { setOpenFolder } = useFileExplorerOpenStates.getState();
      // Parse the file path to extract folder structure
      const pathParts = filePath.split("/");
      const fileNameFromPath = pathParts.pop() || fileName; // Use the last part as filename or fallback to provided fileName

      // If there are no folders in the path, just add the file to root
      if (pathParts.length === 0) {
        return {
          fileExplorer: [
            ...state.fileExplorer,
            { name: fileNameFromPath, type: "file" },
          ],
        };
      }

      // Keep track of the current path as we build it
      let currentPath = "";

      // Helper function to recursively create/navigate folder structure
      const addFileToPath = (
        items: FileItem[],
        remainingPath: string[],
        file: string,
      ): FileItem[] => {
        if (remainingPath.length === 0) {
          // We've reached the target folder, add the file here
          return [...items, { name: file, type: "file" }];
        }

        const currentFolder = remainingPath[0];
        const nextPath = remainingPath.slice(1);

        // Update the current path
        currentPath = currentPath
          ? `${currentPath}/${currentFolder}`
          : currentFolder;
        // Open the folder
        setOpenFolder(currentPath, true);

        // Check if the folder already exists
        const existingFolder = items.find(
          (item) => item.name === currentFolder && item.type === "folder",
        );

        if (existingFolder) {
          // Folder exists, continue navigating
          return items.map((item) => {
            if (item.name === currentFolder && item.type === "folder") {
              return {
                ...item,
                children: addFileToPath(item.children || [], nextPath, file),
              };
            }
            return item;
          });
        }
        // Folder doesn't exist, create it and continue
        return [
          ...items,
          {
            name: currentFolder,
            type: "folder",
            children: addFileToPath([], nextPath, file),
          },
        ];
      };

      // Start the recursive process
      return {
        fileExplorer: addFileToPath(
          state.fileExplorer,
          pathParts,
          fileNameFromPath,
        ),
      };
    }),
  addFileExplorer: (fileName: string, targetPath?: string) =>
    set((state) => {
      return {
        fileExplorer: addItemToTree(
          state.fileExplorer,
          { name: fileName, type: "file" },
          targetPath,
        ),
      };
    }),
  deleteFileExplorer: (itemPath: string) =>
    set((state) => {
      // Helper function to recursively delete an item from the file tree
      const deleteItemFromTree = (
        items: FileItem[],
        pathParts: string[],
        currentDepth: number = 0,
      ): FileItem[] => {
        if (currentDepth === pathParts.length - 1) {
          // We're at the target level, filter out the item to delete
          const itemToDelete = pathParts[currentDepth];
          return items.filter((item) => item.name !== itemToDelete);
        }

        const currentFolder = pathParts[currentDepth];
        return items.map((item) => {
          if (item.name === currentFolder && item.type === "folder") {
            return {
              ...item,
              children: deleteItemFromTree(
                item.children || [],
                pathParts,
                currentDepth + 1,
              ),
            };
          }
          return item;
        });
      };

      const pathParts = itemPath.split("/");

      // Also update EditorCode for WebContainer sync
      const { EditorCode, setCode } = useEditorCode.getState();
      const newEditorCode = { ...EditorCode };

      if (pathParts.length === 1) {
        delete newEditorCode[itemPath];
      } else {
        let current = newEditorCode as Record<string, unknown>;
        for (let i = 0; i < pathParts.length - 1; i++) {
          if (
            current[pathParts[i]] &&
            typeof current[pathParts[i]] === "object" &&
            (current[pathParts[i]] as { directory?: unknown }).directory
          ) {
            current = (
              current[pathParts[i]] as { directory: Record<string, unknown> }
            ).directory;
          }
        }
        delete current[pathParts[pathParts.length - 1]];
      }

      setCode(newEditorCode);

      return {
        fileExplorer: deleteItemFromTree(state.fileExplorer, pathParts),
      };
    }),
  renameItemExplorer: (itemPath: string, newName: string) =>
    set((state) => {
      // Helper function to recursively find and rename an item
      const renameItemInTree = (
        items: FileItem[],
        pathParts: string[],
        currentDepth: number = 0,
      ): FileItem[] => {
        if (currentDepth === pathParts.length - 1) {
          // We're at the target level, rename the item
          const itemToRename = pathParts[currentDepth];
          return items.map((item) =>
            item.name === itemToRename ? { ...item, name: newName } : item,
          );
        }

        const currentFolder = pathParts[currentDepth];
        return items.map((item) => {
          if (item.name === currentFolder && item.type === "folder") {
            return {
              ...item,
              children: renameItemInTree(
                item.children || [],
                pathParts,
                currentDepth + 1,
              ),
            };
          }
          return item;
        });
      };

      const pathParts = itemPath.split("/");

      return {
        fileExplorer: renameItemInTree(state.fileExplorer, pathParts),
      };
    }),
  newFolderExplorer: (folderName: string, targetPath?: string) =>
    set((state) => {
      return {
        fileExplorer: addItemToTree(
          state.fileExplorer,
          { name: folderName, type: "folder", children: [] },
          targetPath,
        ),
      };
    }),
}));
