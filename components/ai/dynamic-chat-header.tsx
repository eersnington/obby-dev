'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { UserNav } from '../layout/user-nav';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import { Logo } from '../logo';
import Link from 'next/link';
import FeedbackModal from '../app-layout/feedback-dialog';
import { useChatStore } from '@/stores/chat-store';
import { motion } from 'motion/react';

export function DynamicChatHeader() {
  const params = useParams();
  const { currentChatId, resetChat } = useChatStore();
  const chatId = (params?.id as Id<'chats'>) || (currentChatId as Id<'chats'>);
  const { user, loading } = useAuth();

  const handleLogoClick = () => {
    // doing this to ensure that the chat state is reset when navigating back to the home page
    resetChat();
  };

  // load chat data if chatId is available
  const chatData = useQuery(
    api.chats.getChatById,
    chatId ? { id: chatId } : 'skip',
  );

  if (loading) {
    return (
      <header className="w-full flex-shrink-0 items-center bg-background px-4 py-3">
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="pr-9">
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full flex-shrink-0 items-center bg-background px-4 py-3">
      <div className="flex w-full justify-between">
        <div className="flex items-center justify-center gap-4">
          <Link href="/" onClick={handleLogoClick}>
            <Logo />
          </Link>
          {chatData && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">/</span>
              <motion.h1
                animate={{ width: 'auto' }}
                className="overflow-hidden whitespace-nowrap font-medium text-foreground text-sm tracking-tight"
                initial={{ width: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {chatData.title}
              </motion.h1>
            </div>
          )}
        </div>
        <div className="pr-9">
          <div className="flex items-center gap-3">
            <FeedbackModal />
            {user && <UserNav user={user} />}
          </div>
        </div>
      </div>
    </header>
  );
}
