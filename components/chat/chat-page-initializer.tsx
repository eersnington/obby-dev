'use client';

import { useEffect } from 'react';
import { useChatStore } from '@/stores/chat-store';

interface ChatPageInitializerProps {
  chatId: string;
}

export function ChatPageInitializer({ chatId }: ChatPageInitializerProps) {
  const { initializeFromUrl } = useChatStore();

  useEffect(() => {
    initializeFromUrl(chatId);
  }, [chatId, initializeFromUrl]);

  return null;
}
