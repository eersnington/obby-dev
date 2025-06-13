import { create } from "zustand";
import type { projectFiles } from "@/types/webcontainer-files";
import { defaultProjectFiles } from "@/lib/utils/default-project-files";
import { cleanCodeContent, findFileContent } from "@/lib/utils/code-utils";
// import { getParentPath } from "./file-explorer"; // Not used directly in this store

interface EditorCodeStore {
  EditorCode: projectFiles;
  getfileCode: (filePath: string) => string;
  setCode: (code: projectFiles) => void;
  setEditorCode: (filePath: string, code: string) => void; // Updates or creates a file with content

  // New file operations
  createFile: (
    parentPath: string,
    fileName: string,
    content?: string,
  ) => string; // Returns new file path
  createFolder: (parentPath: string, folderName: string) => string; // Returns new folder path
  renameItem: (oldPath: string, newName: string) => string | null; // Returns new path or null if failed
  deleteItem: (path: string) => void;
  // moveItem: (oldPath: string, newParentPath: string) => string | null; // Future: for drag & drop
}

export const useEditorCode = create<EditorCodeStore>((set, get) => ({
  EditorCode: defaultProjectFiles,

  getfileCode: (filePath: string): string => {
    return findFileContent(get().EditorCode, filePath) ?? "";
  },

  setCode: (code: projectFiles) => {
    set({ EditorCode: code });
    // No need to call syncFileExplorerFromEditorCode explicitly if useFileExplorer subscribes
  },

  setEditorCode: (filePath, code) =>
    set((state) => {
      const cleanedCode = cleanCodeContent(code);
      const parts = filePath.split("/");
      const newEditorCode = JSON.parse(JSON.stringify(state.EditorCode)); // Deep copy

      let currentLevel = newEditorCode;
      for (let i = 0; i < parts.length - 1; i++) {
        const dirName = parts[i];
        if (!currentLevel[dirName]) {
          currentLevel[dirName] = { directory: {} };
        } else if (!currentLevel[dirName].directory) {
          // It exists but is a file, this is an error or needs handling
          // For now, overwrite if it's a file, or ensure it's a directory
          currentLevel[dirName] = { directory: {} };
        }
        currentLevel = currentLevel[dirName].directory as projectFiles;
      }
      currentLevel[parts[parts.length - 1]] = {
        file: { contents: cleanedCode },
      };
      return { EditorCode: newEditorCode };
    }),

  createFile: (parentPath, fileName, content = "") => {
    const newFilePath = parentPath ? `${parentPath}/${fileName}` : fileName;
    get().setEditorCode(newFilePath, content); // Use existing setEditorCode
    // Ensure parent folders are expanded in UI (handled by UI calling expandFolder)
    // Ensure new file is selected in UI (handled by UI calling setSelectedFilePath)
    return newFilePath;
  },

  createFolder: (parentPath, folderName) => {
    const newFolderPath = parentPath
      ? `${parentPath}/${folderName}`
      : folderName;
    set((state) => {
      const parts = newFolderPath.split("/");
      const newEditorCode = JSON.parse(JSON.stringify(state.EditorCode));
      let currentLevel = newEditorCode;

      for (let i = 0; i < parts.length; i++) {
        const dirName = parts[i];
        if (i === parts.length - 1) {
          // Last part is the new folder
          if (!currentLevel[dirName]) {
            currentLevel[dirName] = { directory: {} };
          } else if (currentLevel[dirName].file) {
            // Error: A file with this name already exists
            console.error(
              `Cannot create folder: File ${dirName} already exists at this path.`,
            );
            return state; // No change
          }
          // If it's already a directory, do nothing
        } else {
          // Traverse or create intermediate directories
          if (!currentLevel[dirName]) {
            currentLevel[dirName] = { directory: {} };
          } else if (currentLevel[dirName].file) {
            // Error: A file exists where a directory segment is needed
            console.error(
              `Cannot create folder: Path segment ${dirName} is a file.`,
            );
            return state; // No change
          }
          currentLevel = currentLevel[dirName].directory as projectFiles;
        }
      }
      return { EditorCode: newEditorCode };
    });
    // Ensure parent folders are expanded (handled by UI)
    return newFolderPath;
  },

  deleteItem: (path) =>
    set((state) => {
      const parts = path.split("/");
      const newEditorCode = JSON.parse(JSON.stringify(state.EditorCode));
      let currentLevel = newEditorCode;

      for (let i = 0; i < parts.length - 1; i++) {
        const dirName = parts[i];
        if (!currentLevel[dirName] || !currentLevel[dirName].directory) {
          console.error(
            "Cannot delete: Path not found or not a directory segment.",
          );
          return state; // Path not found
        }
        currentLevel = currentLevel[dirName].directory as projectFiles;
      }
      const itemName = parts[parts.length - 1];
      if (currentLevel[itemName]) {
        delete currentLevel[itemName];
        return { EditorCode: newEditorCode };
      }
      console.error("Cannot delete: Item not found at path.");
      return state; // Item not found
    }),

  renameItem: (oldPath, newName) => {
    let newPath: string | null = null;
    set((state) => {
      const oldParts = oldPath.split("/");
      const oldItemName = oldParts.pop();
      if (!oldItemName) return state; // Invalid oldPath

      const parentPath = oldParts.join("/");
      newPath = parentPath ? `${parentPath}/${newName}` : newName;

      // Check if newName already exists at the target location
      let checkLevel = state.EditorCode;
      if (parentPath) {
        const parentParts = parentPath.split("/");
        for (const part of parentParts) {
          if (!checkLevel[part] || !checkLevel[part].directory) {
            console.error(
              "Rename failed: Parent path for new name check is invalid.",
            );
            newPath = null;
            return state;
          }
          checkLevel = checkLevel[part].directory as projectFiles;
        }
      }
      if (checkLevel[newName]) {
        console.error(
          `Rename failed: Item with name "${newName}" already exists in "${parentPath}".`,
        );
        newPath = null;
        return state;
      }

      const newEditorCode = JSON.parse(JSON.stringify(state.EditorCode));
      let currentLevel = newEditorCode;
      let parentOfOldItem = newEditorCode;

      if (parentPath) {
        const parentParts = parentPath.split("/");
        for (const part of parentParts) {
          if (!currentLevel[part] || !currentLevel[part].directory) {
            console.error("Rename failed: Parent path of old item is invalid.");
            newPath = null;
            return state;
          }
          parentOfOldItem = currentLevel[part].directory as projectFiles;
          currentLevel = parentOfOldItem;
        }
      } else {
        // Renaming a root item, parent is the root EditorCode object
        parentOfOldItem = newEditorCode;
      }

      const itemToRename = parentOfOldItem[oldItemName];
      if (!itemToRename) {
        console.error("Rename failed: Old item not found.");
        newPath = null;
        return state;
      }

      delete parentOfOldItem[oldItemName];
      parentOfOldItem[newName] = itemToRename; // Move the item to the new name

      return { EditorCode: newEditorCode };
    });
    // UI should update selected path if oldPath was selected
    return newPath;
  },
}));
