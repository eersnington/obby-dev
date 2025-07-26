'use client';

import { useChatStore } from '@/stores/chat-store';
import { ClientHeader } from './client-header';
import { DynamicChatHeader } from '@/components/ai/dynamic-chat-header';
import { AppSidebar } from '@/components/app-layout/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarToggle } from '@/components/app-layout/sidebar-toggle';
import { LowProfileFooter } from '@/components/landing/low-profile-footer';
import type { User } from '@workos-inc/node';
import { useEffect } from 'react';

interface UnifiedChatLayoutProps {
  children: React.ReactNode;
  user: User | null;
  os: string | null;
  isLandingPage?: boolean;
}

export function UnifiedChatLayout({
  children,
  user,
  os,
  isLandingPage = false,
}: UnifiedChatLayoutProps) {
  const { isChatActive, resetChat } = useChatStore();

  useEffect(() => {
    if (isLandingPage) {
      // reset the chat state when navigating to the landing page
      // this ensures that the chat state is cleared when navigating back to the home page
      // the buttons in the header will handle resetting the chat state when clicked
      resetChat();
    }
  }, [isLandingPage, resetChat]);

  if (isChatActive) {
    return (
      <div className="flex h-screen flex-col">
        <SidebarProvider className="flex flex-col">
          <DynamicChatHeader />
          <div className="w-full flex-1 overflow-hidden">{children}</div>
        </SidebarProvider>
      </div>
    );
  }

  return (
    <SidebarProvider className="flex flex-col">
      <ClientHeader user={user} />
      <div className="flex flex-1">
        <AppSidebar os={os} user={user} />
        <SidebarInset className="p-2">
          <div className="flex h-full w-full flex-col rounded-lg border-2 border-accent bg-accent/30 shadow-sm">
            <header className="flex h-16 items-center gap-4 px-6">
              {user && <SidebarToggle />}
            </header>
            <main className="flex-1 p-6">
              <div className="space-y-6">
                <div className="mx-auto max-w-3xl">{children}</div>
              </div>
            </main>
            <LowProfileFooter />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
