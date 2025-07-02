import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { convertToUIMessages } from '@/lib/utils';

import { Chat } from '@/components/artifact-blocks/chat';
import { DataStreamHandler } from '@/components/ai/data-stream-handler';

import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function ChatPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const [workOsUser, chat] = await Promise.all([
    withAuth(),
    fetchQuery(api.chats.getChatById, { id }),
  ]);

  const { user } = workOsUser;

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

  if (!chatModelFromCookie) {
    return (
      <>
        <SidebarProvider>
          <Chat
            id={chat.chatId}
            initialMessages={convertToUIMessages(messagesFromDb)}
            initialChatModel={'obbylabs:agent-chat'}
            initialVisibilityType={chat.visibility}
            isReadonly={user?.id !== chat.userId}
            session={user}
            autoResume={true}
          />
          <DataStreamHandler id={id} />
        </SidebarProvider>
      </>
    );
  }

  return (
    <>
      <SidebarProvider>
        <Chat
          id={chat.chatId}
          initialMessages={convertToUIMessages(messagesFromDb)}
          initialChatModel={chatModelFromCookie.value}
          initialVisibilityType={chat.visibility}
          isReadonly={user?.id !== chat.userId}
          session={user}
          autoResume={true}
        />
        <DataStreamHandler id={chat.chatId} />
      </SidebarProvider>
    </>
  );
}
