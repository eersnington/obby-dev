'use client';

import { cn } from '@repo/design-system/lib/utils';
import type { ReactNode } from 'react';
import { useTabState } from './use-tab-state';

interface Props {
  children: ReactNode;
  tabId: string;
}

export function TabItem({ children, tabId }: Props) {
  const [activeTabId, setTabId] = useTabState();
  return (
    <li className={cn({ 'border-b border-b-black': activeTabId === tabId })}>
      <button
        className="w-full text-left"
        onClick={() => setTabId(tabId)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setTabId(tabId);
          }
        }}
        type="button"
      >
        {children}
      </button>
    </li>
  );
}
