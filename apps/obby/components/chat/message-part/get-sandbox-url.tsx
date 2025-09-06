import { cn } from '@repo/design-system/lib/utils';
import { LinkIcon } from 'lucide-react';
import type { DataPart } from '@/ai/messages/data-parts';
import { MessageSpinner } from '../message-spinner';
import { ToolHeader } from '../tool-header';
import { ToolMessage } from '../tool-message';

export function GetSandboxURL(props: {
  className?: string;
  message: DataPart['get-sandbox-url'];
}) {
  return (
    <ToolMessage className={cn(props.className)}>
      <ToolHeader>
        <LinkIcon className="h-3.5 w-3.5" />
        {props.message.url ? (
          <span>Got Sandbox URL</span>
        ) : (
          <span>Getting Sandbox URL</span>
        )}
      </ToolHeader>
      <div>
        {!props.message.url && <MessageSpinner />}
        {props.message.url && (
          <a href={props.message.url} target="_blank">
            {props.message.url}
          </a>
        )}
      </div>
    </ToolMessage>
  );
}
