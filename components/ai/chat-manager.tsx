"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { Message } from "lib/ai/messages";
import type { DeepPartial } from "ai";
import type { FragmentSchema } from "lib/fragment";

interface ChatData {
  _id: Id<"chats">;
  _creationTime: number;
  userId: Id<"users">;
  title: string;
  messages: Message[];
  fileData?: unknown;
  fragments?: DeepPartial<FragmentSchema>[];
  visibility: "private" | "public";
  messageCount?: number;
  fragmentCount?: number;
  lastUpdated?: number;
  initialMessageProcessed?: boolean;
}

interface ChatContextValue {
  chatData: ChatData | null;
  effectiveMessages: Message[];
  updateChatMessages: (messages: Message[]) => Promise<void>;
  addMessageWithFragment: (
    message: Message,
    fragment?: DeepPartial<FragmentSchema>,
  ) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within ChatManager");
  }
  return context;
}

interface ChatManagerProps {
  chatId?: Id<"chats">;
  initialChatData?: ChatData;
  children: ReactNode;
}

export function ChatManager({
  chatId,
  initialChatData,
  children,
}: ChatManagerProps) {
  // Convex mutations for chat persistence
  const updateChatMessagesMutation = useMutation(api.chats.addMessageToChat);
  const addMessageWithFragmentMutation = useMutation(
    api.chats.addMessageWithFragment,
  );

  // Real-time chat data from Convex
  const chatData = useQuery(
    api.chats.watchChat,
    chatId ? { id: chatId } : "skip",
  );

  // Use real-time data from Convex, fallback to initial data
  const effectiveMessages: Message[] =
    (chatData?.messages as Message[]) || initialChatData?.messages || [];

  const updateChatMessages = async (messages: Message[]) => {
    if (!chatId) {
      console.warn("No chatId provided to updateChatMessages");
      return;
    }

    try {
      await updateChatMessagesMutation({
        id: chatId,
        messages,
      });
    } catch (error) {
      console.error("Failed to update chat messages:", error);
      throw error;
    }
  };

  const addMessageWithFragment = async (
    message: Message,
    fragment?: DeepPartial<FragmentSchema>,
  ) => {
    if (!chatId) {
      console.warn("No chatId provided to addMessageWithFragment");
      return;
    }

    try {
      await addMessageWithFragmentMutation({
        id: chatId,
        message,
        fragment,
      });
    } catch (error) {
      console.error("Failed to add message with fragment:", error);
      throw error;
    }
  };

  const contextValue: ChatContextValue = {
    chatData: (chatData as ChatData) || initialChatData || null,
    effectiveMessages,
    updateChatMessages,
    addMessageWithFragment,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}
