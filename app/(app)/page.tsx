import { cookies } from 'next/headers';
import { generatePrefixedUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/ai/data-stream-handler';
import { SidebarToggle } from 'components/app-layout/sidebar-toggle';
import { HeroSection } from '@/components/landing/hero-section';
import { LandingChatInput } from '@/components/landing/landing-chat-input';
import { LowProfileFooter } from '@/components/landing/low-profile-footer';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function Page() {
  const { user } = await withAuth();

  const id = generatePrefixedUUID('chat');

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  // if (!modelIdFromCookie) {
  //   return (
  //     <>
  //       <Chat
  //         key={id}
  //         id={id}
  //         initialMessages={[]}
  //         selectedChatModel={DEFAULT_CHAT_MODEL}
  //         selectedVisibilityType="private"
  //         isReadonly={false}
  //         isChatSelected={false}
  //         user={user}
  //         autoResume={false}
  //       />
  //       <DataStreamHandler id={id} />
  //     </>
  //   );
  // }

  // return (<>
  //   <Chat
  //     key={id}
  //     id={id}
  //     initialMessages={[]}
  //     selectedChatModel={modelIdFromCookie.value}
  //     selectedVisibilityType="private"
  //     isReadonly={false}
  //     isChatSelected={false}
  //     user={user}
  //     autoResume={false}
  //   />
  //   <DataStreamHandler id={id} />
  // </>);

  return (
    <div className="flex flex-col bg-accent/30 border-2 border-accent h-full w-full rounded-lg shadow-sm">
      <header className="flex h-16 items-center gap-4 px-6">
        {user && <SidebarToggle />}
      </header>
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="max-w-3xl mx-auto">
            <HeroSection />
            <div className="mt-8">
              <LandingChatInput />
            </div>
          </div>
        </div>
      </main>
      <LowProfileFooter />
    </div>
  );
}
