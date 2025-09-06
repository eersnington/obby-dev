import { cn } from '@repo/design-system/lib/utils';
import { BotIcon, UserIcon } from 'lucide-react';
import { MessagePart } from './message-part';
import type { ChatUIMessage } from './types';

type Props = {
  message: ChatUIMessage;
};

export function Message({ message }: Props) {
  return (
    <div
      className={cn({
        'mr-20': message.role === 'assistant',
        'ml-20': message.role === 'user',
      })}
    >
      {/* Message Header */}
      <div className="mb-1.5 flex items-center gap-2 font-medium font-mono text-primary text-sm">
        {message.role === 'user' ? (
          <>
            <UserIcon className="ml-auto w-4" />
            <span>You</span>
          </>
        ) : (
          <>
            <BotIcon className="w-4" />
            <span>Assistant ({message.metadata?.model})</span>
          </>
        )}
      </div>

      {/* Message Content */}
      <div className="space-y-1.5">
        {message.parts.map((part, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: TODO: i need to add a unique id for each part
          <MessagePart key={index} part={part} />
        ))}
      </div>

      {/* Message Actions: Coming Soon */}
    </div>
  );
}
