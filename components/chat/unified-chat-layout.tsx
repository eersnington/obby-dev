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
      <div className="h-screen flex flex-col">
        <SidebarProvider className="flex flex-col">
          <DynamicChatHeader />
          <div className="flex-1 overflow-hidden w-full">{children}</div>
        </SidebarProvider>
      </div>
    );
  }

  return (
    <SidebarProvider className="flex flex-col">
      <ClientHeader user={user} />
      <div className="flex flex-1">
        <AppSidebar user={user} os={os} />
        <SidebarInset className="p-2">
          <div className="flex flex-col bg-accent/30 border-2 border-accent h-full w-full rounded-lg shadow-sm">
            <header className="flex h-16 items-center gap-4 px-6">
              {user && <SidebarToggle />}
            </header>
            <main className="flex-1 p-6">
              <div className="space-y-6">
                <div className="max-w-3xl mx-auto">{children}</div>
              </div>
            </main>
            <LowProfileFooter />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
