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
  const { currentChatId } = useChatStore();
  const chatId = (params?.id as Id<'chats'>) || (currentChatId as Id<'chats'>);
  const { user, loading } = useAuth();

  // Load chat data if chatId is available
  const chatData = useQuery(
    api.chats.getChatById,
    chatId ? { id: chatId } : 'skip',
  );

  if (loading) {
    return (
      <header className="bg-background flex w-full items-center border-none">
        <div className="flex w-full justify-between pt-2">
          <div className="justify-center flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="pr-9">
            <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background flex w-full items-center border-none">
      <div className="flex w-full justify-between pt-2">
        <div className="justify-center flex items-center gap-4">
          <Link href="/">
            <Logo />
          </Link>
          {chatData && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">/</span>
              <motion.h1
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-medium text-foreground text-sm tracking-tight overflow-hidden whitespace-nowrap"
              >
                {chatData.title}
              </motion.h1>
            </div>
          )}
        </div>
        <div className="pr-9">
          <div className="flex gap-3 items-center">
            <FeedbackModal />
            {user && <UserNav user={user} />}
          </div>
        </div>
      </div>
    </header>
  );
}
