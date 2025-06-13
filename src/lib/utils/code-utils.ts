import type { FileContent } from "@/types/webcontainer-files";

export function cleanCodeContent(content: string): string {
  return content
    .replace(/^>?\s*/, "") // Remove leading '>' and whitespace
    .replace(/\s*<\/boltAction>\s*$/, "") // Remove trailing boltAction tag
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\([^\\])/g, "$1")
    .replace(/\\"/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;lt;/g, "<")
    .replace(/&amp;gt;/g, ">")
    .replace(/\{&gt;/g, "{>")
    .replace(/&lt;\}/g, "<}")
    .replace(/=&gt;/g, "=>")
    .trim();
}

export const cleanTerminalOutput = (output: string): string => {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: This regex is intentionally matching the ANSI escape character (\x1B) to remove color codes and other control sequences.
  const ansiRegex = /\x1B\[[0-9;?]*[a-zA-Z]/g;

  return (
    output
      // Remove all ANSI escape sequences (for colors, cursor positioning, etc.).
      .replace(ansiRegex, "")
      // Replace the fancy arrow character with a standard '>'.
      .replace(/➜/g, ">")
      // Collapse multiple consecutive whitespace characters into a single space.
      .replace(/\s+/g, " ")
      // Remove any leading or trailing whitespace from the final string.
      .trim()
  );
};

export function findFileContent(
  files: Record<string, FileContent>,
  path: string,
): string | null {
  const parts = path.split("/");

  let current: FileContent | undefined = files[parts[0]];

  // For paths like "src/App.tsx", we need to traverse the directory structure
  for (let i = 1; i < parts.length; i++) {
    if (!current) return null;

    // If we're in a directory, get the next part
    if (current.directory) {
      current = current.directory[parts[i]];
    } else {
      return null;
    }
  }

  // Return the file contents if we found them
  return current?.file?.contents ?? null;
}

export const getLanguageFromExtension = (ext: string): string => {
  const normalizedExt = ext.toLowerCase().split(".").pop();

  if (!normalizedExt) return "typescript"; // Default to TypeScript if no extension is found

  const map: Record<string, string> = {
    js: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    json: "json",
    html: "html",
    css: "css",
    py: "python",
    java: "java",
    rb: "ruby",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
    go: "go",
    rs: "rust",
    php: "php",
    swift: "swift",
    md: "plaintext",
    sh: "bash",
  };
  return map[normalizedExt] || "typescript";
};
