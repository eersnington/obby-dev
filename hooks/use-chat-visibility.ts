"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { VisibilityType } from "@/components/artifact-blocks/visibility-selector";

export function useChatVisibility({
  chatId,
  initialVisibility,
}: {
  chatId: string;
  initialVisibility: VisibilityType;
}) {
  const chat = useQuery(api.chats.getChatById, { id: chatId });
  const updateVisibility = useMutation(api.chats.updateChatVisibilityById);

  const visibilityType = useMemo(() => {
    return chat?.visibility ?? initialVisibility;
  }, [chat, initialVisibility]);

  const setVisibilityType = async (updatedVisibilityType: VisibilityType) => {
    await updateVisibility({
      id: chatId,
      visibility: updatedVisibilityType,
    });
  };

  return { visibilityType, setVisibilityType };
}
