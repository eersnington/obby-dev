import { cookies, headers } from 'next/headers';
import { generateUUID } from '@/lib/utils';
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
    <UnifiedChatLayout isLandingPage={true} os={os} user={user}>
      <ChatContainer
        autoResume={false}
        id={id}
        initialChatModel={chatModel}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        key={id}
        session={user}
      />
    </UnifiedChatLayout>
  );
}
