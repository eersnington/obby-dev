export interface FileNode {
  children?: FileNode[];
  content?: string;
  expanded?: boolean;
  name: string;
  path: string;
  type: 'file' | 'folder';
}

interface FileNodeBuilder {
  children?: { [key: string]: FileNodeBuilder };
  content?: string;
  expanded?: boolean;
  name: string;
  path: string;
  type: 'file' | 'folder';
}

export function buildFileTree(paths: string[]): FileNode[] {
  type NodeMap = Record<string, FileNodeBuilder>;
  const root: NodeMap = {};

  const createNode = (
    part: string,
    isFile: boolean,
    currentPath: string
  ): FileNodeBuilder => ({
    name: part,
    type: isFile ? 'file' : 'folder',
    path: currentPath,
    content: isFile
      ? `// Content for ${currentPath}\n// This will be loaded when the file is selected`
      : undefined,
    children: isFile ? undefined : {},
    expanded: false,
  });

  const insertPath = (nodeMap: NodeMap, path: string): void => {
    const parts = path.split('/').filter(Boolean);
    let current: NodeMap = nodeMap;
    let currentPath = '';

    for (const [index, part] of parts.entries()) {
      currentPath = `${currentPath}/${part}`;
      const isFile = index === parts.length - 1;

      if (!current[part]) {
        current[part] = createNode(part, isFile, currentPath);
      }

      if (!isFile) {
        if (!current[part].children) {
          current[part].children = {};
        }
        current = current[part].children as NodeMap;
      }
    }
  };

  for (const path of paths) {
    insertPath(root, path);
  }

  const convertToArray = (obj: {
    [key: string]: FileNodeBuilder;
  }): FileNode[] => {
    return Object.values(obj)
      .map(
        (node): FileNode => ({
          ...node,
          children: node.children ? convertToArray(node.children) : undefined,
        })
      )
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
  };

  return convertToArray(root);
}
