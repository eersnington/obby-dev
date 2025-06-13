import type { projectFiles, FileContent } from "@/types/webcontainer-files";
import type { FileItem } from "@/types/file-structure";
import { useFileExplorer } from "@/stores/file-explorer";

// Converts EditorCode structure to FileExplorer structure and updates the store
export function syncFileExplorerFromEditorCode(editorCode: projectFiles): void {
  // Convert editorCode to fileExplorer structure
  const fileExplorerItems = convertEditorCodeToFileExplorer(editorCode);

  // Update the file explorer store
  const { setFileExplorer } = useFileExplorer.getState();
  setFileExplorer(fileExplorerItems);
}

// Converts EditorCode structure to FileExplorer structure
export function convertEditorCodeToFileExplorer(
  editorCode: projectFiles,
): FileItem[] {
  const result: FileItem[] = [];

  for (const [key, value] of Object.entries(editorCode)) {
    if (value.file) {
      result.push({
        name: key,
        type: "file",
      });
    } else if (value.directory) {
      result.push({
        name: key,
        type: "folder",
        children: processDirectory(value.directory),
      });
    }
  }

  return result;
}

//  Recursively processes a directory structure
function processDirectory(directory: Record<string, FileContent>): FileItem[] {
  const result: FileItem[] = [];

  for (const [key, value] of Object.entries(directory)) {
    if (value.file) {
      result.push({
        name: key,
        type: "file",
      });
    } else if (value.directory) {
      result.push({
        name: key,
        type: "folder",
        children: processDirectory(value.directory),
      });
    }
  }

  return result;
}
