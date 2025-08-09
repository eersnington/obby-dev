import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function ToolMessage(props: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-md border border-border bg-background px-3.5 py-3 font-mono text-sm',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
