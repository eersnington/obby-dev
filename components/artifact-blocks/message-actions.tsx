'use client';

import { memo } from 'react';
import type { Message } from 'ai';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';
import { Copy, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import equal from 'fast-deep-equal';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

type Vote = {
  chatId: string;
  messageId: string;
  isUpvoted: boolean;
};

export function PureMessageActions({
  chatId,
  message,
  vote,
  isLoading,
}: {
  chatId: string;
  message: Message;
  vote: Vote | undefined;
  isLoading: boolean;
}) {
  const [, copyToClipboard] = useCopyToClipboard();
  const voteMessage = useMutation(api.chats.voteMessage);

  if (isLoading) return null;
  if (message.role === 'user') return null;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="py-1 px-2 h-fit text-muted-foreground"
              variant="outline"
              onClick={async () => {
                await copyToClipboard(message.content as string);
                toast.success('Copied to clipboard');
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="py-1 px-2 h-fit text-muted-foreground !pointer-events-auto"
              disabled={vote?.isUpvoted}
              variant="outline"
              onClick={async () => {
                toast.promise(
                  voteMessage({ chatId, messageId: message.id, type: 'up' }),
                  {
                    loading: 'Upvoting...',
                    success: 'Response upvoted',
                    error: 'Failed to upvote response',
                  },
                );
              }}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upvote</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="py-1 px-2 h-fit text-muted-foreground !pointer-events-auto"
              variant="outline"
              disabled={vote && !vote.isUpvoted}
              onClick={async () => {
                toast.promise(
                  voteMessage({ chatId, messageId: message.id, type: 'down' }),
                  {
                    loading: 'Downvoting...',
                    success: 'Response downvoted',
                    error: 'Failed to downvote response',
                  },
                );
              }}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Downvote</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (!equal(prevProps.vote, nextProps.vote)) return false;
    if (prevProps.isLoading !== nextProps.isLoading) return false;

    return true;
  },
);
