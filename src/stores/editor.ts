import { create } from "zustand";
import type { FileContent, projectFiles } from "@/types/webcontainer-files";
import { defaultProjectFiles } from "@/lib/utils/default-project-files";
import { cleanCodeContent, findFileContent } from "@/lib/utils/code-utils";
import { syncFileExplorerFromEditorCode } from "@/lib/utils/file-explorer-utils";

interface EditorCodeStore {
  EditorCode: projectFiles;
  getfileCode: (filePath: string) => string;
  setCode: (code: projectFiles) => void;
  setEditorCode: (filePath: string, code: string) => void;
}

export const useEditorCode = create<EditorCodeStore>((set) => ({
  EditorCode: defaultProjectFiles,
  getfileCode: (filePath: string): string => {
    return findFileContent(useEditorCode.getState().EditorCode, filePath) ?? "";
  },
  setCode: (code: projectFiles) => {
    // Update editor code
    set({ EditorCode: code });

    // Sync with file explorer
    syncFileExplorerFromEditorCode(code);
  },
  setEditorCode: (filePath, code) =>
    set((state) => {
      // Clean the code before storing it
      const cleanedCode = cleanCodeContent(code);

      const parts = filePath.split("/");
      const current = { ...state.EditorCode };

      if (parts.length > 1) {
        let parentObj = current;

        // Create directory structure if it doesn't exist
        for (let i = 0; i < parts.length - 1; i++) {
          const dirName = parts[i];

          // Check if directory exists, create it if not
          if (!parentObj[dirName]) {
            parentObj[dirName] = { directory: {} };
          } else if (!parentObj[dirName].directory) {
            parentObj[dirName].directory = {};
          }

          // Move to next level
          parentObj = parentObj[dirName].directory as {
            [key: string]: FileContent;
          };
        }

        // Set the file at the final level with cleaned code
        const fileName = parts[parts.length - 1];
        parentObj[fileName] = { file: { contents: cleanedCode } };
      } else {
        // Handle root level files with cleaned code
        current[filePath] = { file: { contents: cleanedCode } };
      }

      // Sync with file explorer after update
      const newState = { EditorCode: current };
      setTimeout(() => syncFileExplorerFromEditorCode(current), 0);
      return newState;
    }),
}));
