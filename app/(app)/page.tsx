import { cookies, headers } from 'next/headers';
import { generatePrefixedUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/ai/data-stream-handler';
import { SidebarToggle } from 'components/app-layout/sidebar-toggle';
import { LowProfileFooter } from '@/components/landing/low-profile-footer';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { Chat } from '@/components/artifact-blocks/chat';
import { getOSFromUA } from '@/lib/utils/os-utils';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/app-layout/header';
import { AppSidebar } from '@/components/app-layout/app-sidebar';
import { DynamicChatHeader } from '@/components/ai/dynamic-chat-header';

export default async function Page() {
  const [headersRes, authUser] = await Promise.all([headers(), withAuth()]);
  const { user } = authUser;

  const os = getOSFromUA(headersRes.get('user-agent'));
  const id = generatePrefixedUUID('chat');

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  return (
    <SidebarProvider className="flex flex-col">
      <Header />
      <div className="flex flex-1">
        <AppSidebar user={user} os={os} />
        <SidebarInset className="p-2">
          <div className="flex flex-col bg-accent/30 border-2 border-accent h-full w-full rounded-lg shadow-sm">
            <header className="flex h-16 items-center gap-4 px-6">
              {user && <SidebarToggle />}
            </header>
            <main className="flex-1 p-6">
              <div className="space-y-6">
                <div className="max-w-3xl mx-auto">
                  {!modelIdFromCookie ? (
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
                  ) : (
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
                  )}
                </div>
              </div>
            </main>
            <LowProfileFooter />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
