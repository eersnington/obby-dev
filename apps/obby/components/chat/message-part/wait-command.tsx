import { cn } from '@repo/design-system/lib/utils';
import { SquareChevronRightIcon } from 'lucide-react';
import Markdown from 'react-markdown';
import type { DataPart } from '@/ai/messages/data-parts';
import { MessageSpinner } from '../message-spinner';
import { ToolHeader } from '../tool-header';
import { ToolMessage } from '../tool-message';

export function WaitCommand(props: {
  className?: string;
  message: DataPart['wait-command'];
}) {
  return (
    <ToolMessage className={cn(props.className)}>
      <ToolHeader>
        <SquareChevronRightIcon className="h-3.5 w-3.5" />
        {props.message.status === 'loading' && <span>Waiting for Command</span>}
        {props.message.status === 'done' && (
          <span>
            Command Finished
            {typeof props.message.exitCode === 'number'
              ? ` (${props.message.exitCode})`
              : ''}
          </span>
        )}
      </ToolHeader>
      <span>
        <Markdown>{`\`${props.message.command} ${props.message.args.join(
          ' '
        )}\``}</Markdown>
        {props.message.status === 'loading' && <MessageSpinner />}
      </span>
    </ToolMessage>
  );
}
