import { create } from "zustand";
import type { FileItem } from "@/types/file-structure";
import { convertEditorCodeToFileExplorer } from "@/lib/utils/file-explorer-utils";
import { useEditorCode } from "@/stores/editor";
import type { projectFiles } from "@/types/webcontainer-files";

// Manages the currently selected file path in the editor UI
export interface FilePathsStore {
  selectedFilePath: string | null;
  setSelectedFilePath: (filePath: string | null) => void;
  resetSelectedFilePath: () => void;
}

export const useFilePaths = create<FilePathsStore>((set) => ({
  selectedFilePath: null,
  setSelectedFilePath: (filePath) => set({ selectedFilePath: filePath }),
  resetSelectedFilePath: () => set({ selectedFilePath: null }),
}));

// Manages the open/closed state of folders in the file explorer UI
export interface FileExplorerOpenStatesStore {
  expandedFolders: Set<string>;
  toggleFolder: (folderPath: string) => void;
  expandFolder: (folderPath: string) => void;
  collapseFolder: (folderPath: string) => void;
  resetExpandedFolders: () => void;
}

export const useFileExplorerOpenStates = create<FileExplorerOpenStatesStore>(
  (set) => ({
    expandedFolders: new Set<string>(),
    toggleFolder: (folderPath) =>
      set((state) => {
        const newSet = new Set(state.expandedFolders);
        if (newSet.has(folderPath)) {
          newSet.delete(folderPath);
        } else {
          newSet.add(folderPath);
        }
        return { expandedFolders: newSet };
      }),
    expandFolder: (folderPath) =>
      set((state) => ({
        expandedFolders: new Set(state.expandedFolders).add(folderPath),
      })),
    collapseFolder: (folderPath) =>
      set((state) => {
        const newSet = new Set(state.expandedFolders);
        newSet.delete(folderPath);
        return { expandedFolders: newSet };
      }),
    resetExpandedFolders: () => set({ expandedFolders: new Set<string>() }),
  }),
);

// Manages the file explorer tree structure (derived from EditorCode)
interface FileExplorerStore {
  fileExplorerTree: FileItem[];
}

export const useFileExplorer = create<FileExplorerStore>((set, get) => {
  const deriveFileExplorerTree = (editorCode: projectFiles): FileItem[] => {
    return convertEditorCodeToFileExplorer(editorCode);
  };

  // Initialize fileExplorerTree with the initial state from useEditorCode
  set({
    fileExplorerTree: deriveFileExplorerTree(
      useEditorCode.getState().EditorCode,
    ),
  });

  // Subscribe to useEditorCode store.
  // The listener receives the entire state of useEditorCode.
  const unsubscribe = useEditorCode.subscribe((editorState) => {
    // We need to compare the relevant part of the state (EditorCode)
    // to decide if we need to update our derived tree.
    // This requires knowing the previous state of EditorCode or using
    // a selector within the component that uses useFileExplorer.
    // For simplicity here, we'll re-derive on every notification.
    // Zustand's `set` will handle not updating if the result is shallowly equal.
    set({
      fileExplorerTree: deriveFileExplorerTree(editorState.EditorCode),
    });
  });
  // Note: It's good practice to return the unsubscribe function from the store
  // if it were to be used in a context where the store itself might be "destroyed",
  // though for global stores like this, it's less critical.

  return {
    fileExplorerTree: get().fileExplorerTree,
  };
});

// Helper function to get the parent path of an item
export function getParentPath(itemPath: string): string {
  const parts = itemPath.split("/");
  if (parts.length <= 1) {
    return ""; // Root item, parent is root
  }
  parts.pop();
  return parts.join("/");
}
