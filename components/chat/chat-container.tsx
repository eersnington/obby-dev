'use client';

import { useEffect } from 'react';
import { useChatStore } from '@/stores/chat-store';
import { Chat } from '@/components/artifact-blocks/chat';
import type { UIMessage } from 'ai';
import type { User } from '@workos-inc/node';
import type { VisibilityType } from '../artifact-blocks/visibility-selector';

interface ChatContainerProps {
  id: string;
  initialMessages: Array<UIMessage>;
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: User | null;
  autoResume: boolean;
}

export function ChatContainer({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  session,
  autoResume,
}: ChatContainerProps) {
  const { isChatActive, startChat, resetChat } = useChatStore();

  const hasMessages = initialMessages.length > 0;

  useEffect(() => {
    if (hasMessages && !isChatActive) {
      console.log('[ChatContainer] Has messages, starting chat:', id);
      startChat(id);
    }
  }, [hasMessages, isChatActive, startChat, id]);

  return (
    <Chat
      id={id}
      initialMessages={initialMessages}
      initialChatModel={initialChatModel}
      initialVisibilityType={initialVisibilityType}
      isReadonly={isReadonly}
      session={session}
      autoResume={autoResume}
    />
  );
}
