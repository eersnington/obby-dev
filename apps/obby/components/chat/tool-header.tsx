import { cn } from '@repo/design-system/lib/utils';
import type { ReactNode } from 'react';

export function ToolHeader(props: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'mb-1 flex items-center gap-1 font-semibold text-muted-foreground',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
