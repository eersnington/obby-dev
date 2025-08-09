'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTabState } from './use-tab-state';

interface Props {
  className?: string;
  children: ReactNode;
  tabId: string;
}

export function TabGroup({ children, tabId, className }: Props) {
  const [activeTabId] = useTabState();
  return (
    <div
      className={cn(
        'flex min-h-0 w-full flex-col lg:w-1/2 lg:space-y-2',
        { 'hidden lg:flex': activeTabId === tabId },
        className
      )}
    >
      {children}
    </div>
  );
}
