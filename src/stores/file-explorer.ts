import { create } from "zustand";
import { fileStructure, type FileItem } from "@/types/file-structure";

export interface FilePaths {
  filePaths: string;
  fileupdating: boolean;
  setFilePaths: (filePaths: string) => void;
  setFileupdating: (fileupdating: boolean) => void;
  resetFilePaths: () => void;
}

export const useFilePaths = create<FilePaths>((set) => ({
  fileupdating: false,
  filePaths: "src/App.tsx",
  setFilePaths: (filePaths) => set({ filePaths }),
  setFileupdating: (fileupdating: boolean) =>
    set({ fileupdating: !fileupdating }),
  resetFilePaths: () => set({ filePaths: "src/App.tsx", fileupdating: false }),
}));

export interface FileExplorerOpenStates {
  openFolders: Set<string>;
  setOpenFolder: (path: string, isOpen: boolean) => void;
  resetOpenFolders: () => void;
}

export const useFileExplorerOpenStates = create<FileExplorerOpenStates>(
  (set) => ({
    openFolders: new Set<string>(["src"]),
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
    resetOpenFolders: () => set({ openFolders: new Set<string>(["src"]) }),
  }),
);

interface FileExplorer {
  fileExplorer: FileItem[];
  setFileExplorer: (fileExplorer: FileItem[]) => void;
  resetFileExplorer: () => void;
  addFileExplorer: (fileName: string) => void;
  addFileByAI: (filePath: string, fileName: string) => void;
  deleteFileExplorer: (fileName: string) => void;
  renameFileExplorer: (fileName: string, newName: string) => void;
  renameFolderExplorer: (folderPath: string, newName: string) => void;
  newFolderExplorer: (folderName: string) => void;
}

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
  addFileExplorer: (fileName: string) =>
    set((state) => {
      const { openFolders } = useFileExplorerOpenStates.getState();
      const currentPath = Array.from(openFolders).pop(); // Get last opened folder

      if (!currentPath) {
        // If no folder is open, add to root
        return {
          fileExplorer: [
            ...state.fileExplorer,
            { name: fileName, type: "file" },
          ],
        };
      }

      // Split the path into parts for nested folders
      const pathParts = currentPath.split("/");

      // Helper function to recursively find and update the target folder
      const addFileToPath = (items: FileItem[], path: string[]): FileItem[] => {
        if (path.length === 0) {
          // We've reached the target location, add the new file here
          return [...items, { name: fileName, type: "file" }];
        }

        const currentFolder = path[0];
        const remainingPath = path.slice(1);

        return items.map((item) => {
          if (item.name === currentFolder && item.type === "folder") {
            return {
              ...item,
              children: addFileToPath(item.children || [], remainingPath),
            };
          }
          return item;
        });
      };

      // Start the recursive process from the root
      return {
        fileExplorer: addFileToPath(state.fileExplorer, pathParts),
      };
    }),
  deleteFileExplorer: (fileName: string) =>
    set((state) => {
      const { openFolders } = useFileExplorerOpenStates.getState();
      const currentPath = Array.from(openFolders).pop(); // Get last opened folder

      if (!currentPath) {
        // If no folder is open, delete from root
        return {
          fileExplorer: state.fileExplorer.filter(
            (item) => item.name !== fileName,
          ),
        };
      }

      // Split the path into parts for nested folders
      const pathParts = currentPath.split("/");

      // Helper function to recursively find and delete the file
      const deleteFileFromPath = (
        items: FileItem[],
        path: string[],
      ): FileItem[] => {
        if (path.length === 0) {
          // We've reached the target location, remove the file here
          return items.filter(
            (item) => item.name !== fileName.split("/").pop(),
          );
        }

        const currentFolder = path[0];
        const remainingPath = path.slice(1);

        return items.map((item) => {
          if (item.name === currentFolder && item.type === "folder") {
            return {
              ...item,
              children: deleteFileFromPath(item.children || [], remainingPath),
            };
          }
          return item;
        });
      };

      // Start the recursive process from the root
      return {
        fileExplorer: deleteFileFromPath(state.fileExplorer, pathParts),
      };
    }),
  renameFileExplorer: (fileName: string, newName: string) =>
    set((state) => {
      const { openFolders } = useFileExplorerOpenStates.getState();
      const currentPath = Array.from(openFolders).pop(); // Get last opened folder

      if (!currentPath) {
        // If no folder is open, rename at root level
        return {
          fileExplorer: state.fileExplorer.map((item) =>
            item.name === fileName ? { ...item, name: newName } : item,
          ),
        };
      }

      // Split the path into parts for nested folders
      const pathParts = currentPath.split("/");

      // Helper function to recursively find and rename the item
      const renameItemInPath = (
        items: FileItem[],
        path: string[],
      ): FileItem[] => {
        if (path.length === 0) {
          // We've reached the target location, rename the item here
          return items.map((item) =>
            item.name === fileName.split("/").pop()
              ? { ...item, name: newName }
              : item,
          );
        }

        const currentFolder = path[0];
        const remainingPath = path.slice(1);

        return items.map((item) => {
          if (item.name === currentFolder && item.type === "folder") {
            return {
              ...item,
              children: renameItemInPath(item.children || [], remainingPath),
            };
          }
          return item;
        });
      };

      // Start the recursive process from the root
      return {
        fileExplorer: renameItemInPath(state.fileExplorer, pathParts),
      };
    }),
  renameFolderExplorer: (folderPath: string, newName: string) =>
    set((state) => {
      console.log("Renaming folder:", folderPath, "to", newName);
      const { openFolders } = useFileExplorerOpenStates.getState();
      const currentPath = Array.from(openFolders).pop(); // Get last opened folder

      if (!currentPath) {
        // If no folder is open, we can't rename
        return { fileExplorer: state.fileExplorer };
      }

      // Get the current folder's full path
      const pathParts = currentPath.split("/");
      const targetFolder = pathParts[pathParts.length - 1]; // Get the last folder in the path

      // Helper function to recursively find and rename the folder
      const renameFolderInPath = (
        items: FileItem[],
        path: string[],
        depth: number = 0,
      ): FileItem[] => {
        return items.map((item) => {
          // If we're at the target depth and found our folder
          if (
            depth === path.length - 1 &&
            item.name === targetFolder &&
            item.type === "folder"
          ) {
            return { ...item, name: newName };
          }

          // If this is a folder in our path, traverse into it
          if (item.type === "folder" && item.name === path[depth]) {
            return {
              ...item,
              children: renameFolderInPath(
                item.children || [],
                path,
                depth + 1,
              ),
            };
          }

          return item;
        });
      };

      // Start the recursive process from the root
      return {
        fileExplorer: renameFolderInPath(state.fileExplorer, pathParts),
      };
    }),
  newFolderExplorer: (folderName: string) =>
    set((state) => {
      const { openFolders } = useFileExplorerOpenStates.getState();
      const currentPath = Array.from(openFolders).pop(); // Get last opened folder

      if (!currentPath) {
        // If no folder is open, add to root
        return {
          fileExplorer: [
            ...state.fileExplorer,
            { name: folderName, type: "folder", children: [] },
          ],
        };
      }

      // Split the path into parts for nested folders
      const pathParts = currentPath.split("/");

      // Helper function to recursively find and update the target folder
      const addFolderToPath = (
        items: FileItem[],
        path: string[],
      ): FileItem[] => {
        if (path.length === 0) {
          // We've reached the target location, add the new folder here
          return [...items, { name: folderName, type: "folder", children: [] }];
        }

        const currentFolder = path[0];
        const remainingPath = path.slice(1);

        return items.map((item) => {
          if (item.name === currentFolder && item.type === "folder") {
            return {
              ...item,
              children: addFolderToPath(item.children || [], remainingPath),
            };
          }
          return item;
        });
      };

      // Start the recursive process from the root
      return {
        fileExplorer: addFolderToPath(state.fileExplorer, pathParts),
      };
    }),
}));
