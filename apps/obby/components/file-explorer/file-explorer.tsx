'use client';

import {
  ScrollArea,
  ScrollBar,
} from '@repo/design-system/components/ui/scroll-area';
import { cn } from '@repo/design-system/lib/utils';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FileContent } from '@/components/file-explorer/file-content';
import { Panel, PanelHeader } from '@/components/panels/panels';
import { buildFileTree, type FileNode } from './build-file-tree';

interface Props {
  className: string;
  disabled?: boolean;
  paths: string[];
  sandboxId?: string;
}

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
            'flex w-full items-center px-1 py-0.5 text-left hover:bg-gray-100',
            { 'bg-gray-200/80': selected?.path === node.path }
          )}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              selectFile(node);
            }
          }}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
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
              <FileIcon className="mr-2 w-4 " />
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
      <PanelHeader>
        <FileIcon className="mr-2 w-4" />
        <span className="font-mono font-semibold uppercase">
          Sandbox Remote Filesystem
        </span>
        {selected && !disabled && (
          <span className="ml-auto text-gray-500">{selected.path}</span>
        )}
      </PanelHeader>

      <div className="flex h-[calc(100%-2rem-1px)] text-sm">
        <ScrollArea className="w-1/4 flex-shrink-0 border-primary/18 border-r">
          <div>{renderFileTree(fs)}</div>
        </ScrollArea>
        {selected && sandboxId && !disabled && (
          <ScrollArea className="w-3/4 flex-shrink-0">
            <FileContent
              path={selected.path.substring(1)}
              sandboxId={sandboxId}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </Panel>
  );
}
