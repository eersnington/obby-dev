'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, LockOpen, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useChatVisibility } from '@/hooks/use-chat-visibility';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type VisibilityType = 'private' | 'public';

const visibilities: Array<{
  id: VisibilityType;
  label: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: 'private',
    label: 'Private',
    description: 'Only you can access this chat',
    icon: <Lock className="w-4 h-4" />,
  },
  {
    id: 'public',
    label: 'Public',
    description: 'Anyone with the link can access this chat',
    icon: <LockOpen className="w-4 h-4" />,
  },
];

export function VisibilitySelector({
  chatId,
  className,
  selectedVisibilityType,
  isChatSelected,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isChatSelected: boolean;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);

  const { visibilityType, setVisibilityType } = useChatVisibility({
    chatId,
    initialVisibilityType: selectedVisibilityType,
  });

  const selectedVisibility = useMemo(
    () => visibilities.find((visibility) => visibility.id === visibilityType),
    [visibilityType],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button
          variant="outline"
          className="hidden md:flex md:px-2 md:h-[34px]"
        >
          {selectedVisibility?.icon}
          {selectedVisibility?.label}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[300px]">
        {visibilities.map((visibility) => {
          const isPublicOption = visibility.id === 'public';
          const isDisabled = isPublicOption && !isChatSelected;
          return (
            <DropdownMenuItem
              key={visibility.id}
              onSelect={() => {
                if (isDisabled) return;
                setVisibilityType(visibility.id);
                setOpen(false);

                if (isPublicOption) {
                  const url = `${window.location.origin}/chat/${chatId}`;
                  navigator.clipboard
                    .writeText(url)
                    .then(() => {
                      toast('Link copied to clipboard');
                    })
                    .catch((err) => {
                      console.error('Failed to copy link: ', err);
                      toast.error('Failed to copy link');
                    });
                }
              }}
              className={cn(
                'gap-4 group/item flex flex-row justify-between items-center',
                isDisabled && 'opacity-50 cursor-not-allowed',
              )}
              disabled={isDisabled}
              data-active={visibility.id === visibilityType}
            >
              <div className="flex flex-col gap-1 items-start">
                {visibility.label}
                {visibility.description && (
                  <div className="text-xs text-muted-foreground">
                    {visibility.description}
                  </div>
                )}
              </div>
              <div className="text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100">
                <Check className="w-4 h-4" />
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
