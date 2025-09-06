'use client';

import { Preview as PreviewComponent } from '@/components/preview/preview';
import { useSandboxStore } from './state';

type Props = {
  className?: string;
};

export function Preview({ className }: Props) {
  const { status, url, sandboxId, paths } = useSandboxStore();
  return (
    <PreviewComponent
      className={className}
      disabled={status === 'stopped'}
      paths={paths}
      sandboxId={sandboxId}
      url={url}
    />
  );
}
