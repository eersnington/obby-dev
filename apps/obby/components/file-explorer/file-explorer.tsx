'use client';

import { cn } from '@repo/design-system/lib/utils';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FileContent } from '@/components/file-explorer/file-content';
import { Panel } from '@/components/panels/panels';
import { buildFileTree, type FileNode } from './build-file-tree';

type Props = {
  className: string;
  disabled?: boolean;
  paths: string[];
  sandboxId?: string;
};

const PADDING_LEFT = 16;
const PADDING_LEFT_DEPTH = 8;

export function FileExplorer({ className, disabled, paths, sandboxId }: Props) {
  const fileTree = useMemo(() => buildFileTree(paths), [paths]);
  const [selected, setSelected] = useState<FileNode | null>(null);
  const [fs, setFs] = useState<FileNode[]>(fileTree);

  // biome-ignore lint/correctness/useExhaustiveDependencies: wrong suggestion
  useEffect(() => {
    setFs(fileTree);
  }, [fileTree, paths]);

  const toggleFolder = (path: string) => {
    const updateNode = (nodes: FileNode[]): FileNode[] =>
      nodes.map((node) => {
        if (node.path === path && node.type === 'folder') {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    setFs(updateNode(fs));
  };

  const selectFile = (node: FileNode) => {
    if (node.type === 'file') {
      setSelected(node);
    }
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.path}>
        <button
          className={cn(
            'flex w-full items-center px-1 py-0.5 text-left hover:bg-primary/10',
            { 'bg-primary/40': selected?.path === node.path }
          )}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              selectFile(node);
            }
          }}
          style={{
            paddingLeft: `${depth * PADDING_LEFT + PADDING_LEFT_DEPTH}px`,
          }}
          type="button"
        >
          {node.type === 'folder' ? (
            <>
              {node.expanded ? (
                <ChevronDownIcon className="mr-1 w-4" />
              ) : (
                <ChevronRightIcon className="mr-1 w-4" />
              )}
              <FolderIcon className="mr-2 w-4" />
            </>
          ) : (
            <>
              <div className="mr-1 w-4" />
              <FileIcon className="mr-2 w-4" />
            </>
          )}
          <span className="">{node.name}</span>
        </button>

        {node.type === 'folder' && node.expanded && node.children && (
          <div>{renderFileTree(node.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <Panel className={className}>
      <div className="flex h-full min-h-0 text-sm">
        <div className="h-full min-h-0 w-1/4 flex-shrink-0 overflow-auto border-border border-r">
          <div>{renderFileTree(fs)}</div>
        </div>
        {selected && sandboxId && !disabled && (
          <div className="h-full min-h-0 min-w-0 flex-1 overflow-auto">
            <FileContent
              path={selected.path.substring(1)}
              sandboxId={sandboxId}
            />
          </div>
        )}
      </div>
    </Panel>
  );
}
