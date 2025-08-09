'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTabState } from './use-tab-state';

interface Props {
  className?: string;
  children: ReactNode;
  tabId: string;
}

export function TabContent({ children, tabId, className }: Props) {
  const [activeTabId] = useTabState();
  return (
    <div
      className={cn(
        'hidden h-full min-h-0 lg:flex ',
        { flex: activeTabId === tabId },
        className
      )}
    >
      {children}
    </div>
  );
}
