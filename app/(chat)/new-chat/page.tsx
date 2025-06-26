import { cookies } from 'next/headers';

import { Chat } from '@/components/artifact-blocks/chat';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/ai/data-stream-handler';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function Page() {
  const { user } = await withAuth();

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={'obbylabs:agent-chat'}
          initialVisibilityType="private"
          isReadonly={false}
          session={user}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie.value}
        initialVisibilityType="private"
        isReadonly={false}
        session={user}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
