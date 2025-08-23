import { cn } from '@repo/design-system/lib/utils';
import type { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export function Panel({ className, children }: Props) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col rounded-sm border border-primary/18 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}

export function PanelHeader({ className, children }: Props) {
  return (
    <div
      className={cn(
        'flex items-center border-border border-b bg-secondary px-2.5 py-1.5 text-secondary-foreground text-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
