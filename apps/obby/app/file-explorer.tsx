'use client';

import { FileExplorer as FileExplorerComponent } from '@/components/file-explorer/file-explorer';
import { useSandboxStore } from './state';

type Props = {
  className: string;
};

export function FileExplorer({ className }: Props) {
  const { sandboxId, status, paths } = useSandboxStore();
  return (
    <FileExplorerComponent
      className={className}
      disabled={status === 'stopped'}
      paths={paths}
      sandboxId={sandboxId}
    />
  );
}
