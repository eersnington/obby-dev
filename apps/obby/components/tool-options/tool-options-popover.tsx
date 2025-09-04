'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/design-system/components/ui/popover';
import { Check, Globe, Search, Settings2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  OPTIONAL_TOOL_KEYS,
  type OptionalToolKey,
  useToolOptionsStore,
} from '@/stores/use-tool-options-store';

type ToolConfig = Record<OptionalToolKey, { label: string; icon: ReactNode }>;

const TOOL_CONFIG: ToolConfig = {
  webScrape: {
    label: 'Web Scrape',
    icon: <Globe aria-hidden className="h-4 w-4 text-primary" />,
  },
  webSearch: {
    label: 'Web Search',
    icon: <Search aria-hidden className="h-4 w-4 text-primary" />,
  },
};

export type ToolOptionsPopoverProps = {
  className?: string;
  trigger?: (props: {
    open: boolean;
    enabledCount: number;
    total: number;
  }) => React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ToolOptionsPopover({
  className,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: ToolOptionsPopoverProps) {
  // Single subscription to the store to avoid multiple re-renders.
  const { webScrape, webSearch, setOption } = useToolOptionsStore((s) => ({
    webScrape: s.webScrape,
    webSearch: s.webSearch,
    setOption: s.setOption,
  }));

  const toolState: Record<OptionalToolKey, boolean> = {
    webScrape,
    webSearch,
  };

  // Simple derived counts (cheap enough; no need for memoization).
  let enabledCount = 0;
  for (const key of OPTIONAL_TOOL_KEYS) {
    if (toolState[key]) {
      enabledCount++;
    }
  }
  const total = OPTIONAL_TOOL_KEYS.length;

  // Support controlled + uncontrolled usage.
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  return (
    <Popover onOpenChange={handleOpenChange} open={open}>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger({ open, enabledCount, total })
        ) : (
          <Button
            aria-label="Open tool options"
            className={className}
            type="button"
            variant="outline"
          >
            <Settings2 aria-hidden className="h-4 w-4" />
            Tools
            <span className="ml-2 rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono font-semibold text-[10px] text-primary tabular-nums">
              {enabledCount}/{total}
            </span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        aria-label="Tool options"
        className="w-64 p-2"
        side="bottom"
      >
        <div className="mb-2 px-1">
          <h3 className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
            Tool Options
          </h3>
        </div>
        <div className="space-y-1">
          {OPTIONAL_TOOL_KEYS.map((key) => {
            const cfg = TOOL_CONFIG[key];
            const enabled = toolState[key];
            return (
              <button
                aria-pressed={enabled}
                className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted/60 focus:outline-none focus:ring-1 focus:ring-ring"
                key={key}
                onClick={() => setOption(key, !enabled)}
                type="button"
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  {cfg.icon}
                </span>
                <span className="flex-1 select-none">{cfg.label}</span>
                {enabled && (
                  <Check
                    aria-label="Enabled"
                    className="h-4 w-4 text-primary opacity-90"
                  />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
