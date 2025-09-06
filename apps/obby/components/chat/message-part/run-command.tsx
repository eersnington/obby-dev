import { cn } from '@repo/design-system/lib/utils';
import { SquareChevronRightIcon } from 'lucide-react';
import { Streamdown } from 'streamdown';
import type { DataPart } from '@/ai/messages/data-parts';
import { MessageSpinner } from '../message-spinner';
import { ToolHeader } from '../tool-header';
import { ToolMessage } from '../tool-message';

export function RunCommand(props: {
  className?: string;
  message: DataPart['run-command'];
}) {
  return (
    <ToolMessage className={cn(props.className)}>
      <ToolHeader>
        <SquareChevronRightIcon className="h-3.5 w-3.5" />
        {props.message.status === 'loading' ? (
          <span>Dispatching Command</span>
        ) : (
          <span>Command Dispatched</span>
        )}
      </ToolHeader>
      <div>
        <span>
          <Streamdown>{`\`${props.message.command} ${props.message.args.join(
            ' '
          )}\``}</Streamdown>
          {props.message.status === 'loading' && <MessageSpinner />}
        </span>
      </div>
    </ToolMessage>
  );
}
