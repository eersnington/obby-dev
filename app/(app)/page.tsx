import { cookies, headers } from 'next/headers';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/ai/data-stream-handler';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getOSFromUA } from '@/lib/utils/os-utils';
import { UnifiedChatLayout } from '@/components/chat/unified-chat-layout';
import { ChatContainer } from '@/components/chat/chat-container';

export default async function Page() {
  const [headersRes, authUser] = await Promise.all([headers(), withAuth()]);
  const { user } = authUser;

  const os = getOSFromUA(headersRes.get('user-agent'));
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  const chatModel = modelIdFromCookie?.value || 'obbylabs:agent-chat';

  return (
    <UnifiedChatLayout user={user} os={os} isLandingPage={true}>
      <ChatContainer
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={chatModel}
        initialVisibilityType="private"
        isReadonly={false}
        session={user}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </UnifiedChatLayout>
  );
}
