import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { convertToUIMessages } from '@/lib/utils';

import { DataStreamHandler } from '@/components/ai/data-stream-handler';

import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getOSFromUA } from '@/lib/utils/os-utils';
import { UnifiedChatLayout } from '@/components/chat/unified-chat-layout';
import { ChatContainer } from '@/components/chat/chat-container';
import { ChatPageInitializer } from '@/components/chat/chat-page-initializer';

export default async function ChatPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const [headersRes, workOsUser, chat] = await Promise.all([
    headers(),
    withAuth(),
    fetchQuery(api.chats.getChatById, { id }),
  ]);

  const { user } = workOsUser;
  const os = getOSFromUA(headersRes.get('user-agent'));

  if (!chat) {
    notFound();
  }

  if (chat.visibility === 'private') {
    if (!user) {
      return notFound();
    }

    if (user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await fetchQuery(api.messages.getMessagesByChatId, {
    chatId: id,
  });

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');
  const chatModel = chatModelFromCookie?.value || 'obbylabs:agent-chat';

  return (
    <UnifiedChatLayout user={user} os={os}>
      <ChatPageInitializer chatId={id} />
      <ChatContainer
        id={chat.chatId}
        initialMessages={convertToUIMessages(messagesFromDb)}
        initialChatModel={chatModel}
        initialVisibilityType={chat.visibility}
        isReadonly={user?.id !== chat.userId}
        session={user}
        autoResume={true}
      />
      <DataStreamHandler id={chat.chatId} />
    </UnifiedChatLayout>
  );
}
