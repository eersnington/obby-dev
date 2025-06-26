'use client';

import { useMemo } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { VisibilityType } from '@/components/artifact-blocks/visibility-selector';

export function useChatVisibility({
  chatId,
  initialVisibilityType,
}: {
  chatId: string;
  initialVisibilityType: VisibilityType;
}) {
  const chat = useQuery(api.chats.getChatById, { id: chatId });
  const updateVisibility = useMutation(api.chats.updateChatVisibilityById);

  const visibilityType = useMemo(() => {
    return chat?.visibility ?? initialVisibilityType;
  }, [chat, initialVisibilityType]);

  const setVisibilityType = async (updatedVisibilityType: VisibilityType) => {
    await updateVisibility({
      id: chatId,
      visibility: updatedVisibilityType,
    });
  };

  return { visibilityType, setVisibilityType };
}
