import { BoxIcon } from 'lucide-react';
import Markdown from 'react-markdown';
import type { DataPart } from '@/ai/messages/data-parts';
import { cn } from '@/lib/utils';
import { MessageSpinner } from '../message-spinner';
import { ToolHeader } from '../tool-header';
import { ToolMessage } from '../tool-message';

export function CreateSandbox(props: {
  className?: string;
  message: DataPart['create-sandbox'];
}) {
  return (
    <ToolMessage className={cn(props.className)}>
      <ToolHeader>
        <BoxIcon className="h-3.5 w-3.5" />
        {props.message.status === 'loading' ? (
          <span>Creating Sandbox</span>
        ) : (
          <span>Created Sandbox</span>
        )}
      </ToolHeader>
      <div>
        {props.message.status === 'loading' && <MessageSpinner />}
        {props.message.sandboxId && (
          <Markdown>{`Sandbox created with id \`${props.message.sandboxId}\``}</Markdown>
        )}
      </div>
    </ToolMessage>
  );
}
