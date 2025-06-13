import { create } from "zustand";
import type { projectFiles } from "@/types/webcontainer-files";

export interface Message {
  role: "user" | "assistant";
  content: string | AIResponse;
}

export interface AIResponse {
  startingContent?: string;
  projectFiles: projectFiles;
  endingContent?: string;
  updatedFiles?: Array<{ action: string; filePath: string }>;
}

interface ChatStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  addChunk: (chunk: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  addAIbeforeMsg: (chunk: string) => void;
  addAIafterMsg: (chunk: string) => void;
  setUpdatedFilesChat: (
    updatedFiles: Array<{ action: string; filePath: string }>,
  ) => void;
  updatingFiles: Array<{ action: string; filePath: string }>;
  setUpdatingFiles: (
    files: Array<{ action: string; filePath: string }>,
  ) => void;
  aiThinking: boolean;
  setAiThinking: (aiThinking: boolean) => void;
  addUpdatingFiles: (
    files: Array<{ action: string; filePath: string }>,
  ) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  aiThinking: false,
  updatingFiles: [],
  setAiThinking: (aiThinking: boolean) => set({ aiThinking }),
  setUpdatingFiles: (files) => set({ updatingFiles: files }),
  addUpdatingFiles: (files: Array<{ action: string; filePath: string }>) =>
    set((state) => {
      // Filter out any files that already exist with same path and action
      const newFiles = files.filter(
        (newFile) =>
          !state.updatingFiles.some(
            (existingFile) =>
              existingFile.filePath === newFile.filePath &&
              existingFile.action === newFile.action,
          ),
      );
      return { updatingFiles: [...state.updatingFiles, ...newFiles] };
    }),
  setMessages: (messages) => set({ messages }),
  setUpdatedFilesChat: (
    updatedFiles: Array<{ action: string; filePath: string }>,
  ) =>
    set((state) => {
      const messages = [...state.messages];
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        if (typeof lastMessage.content === "object") {
          lastMessage.content = {
            ...lastMessage.content,
            updatedFiles: [...updatedFiles],
          };
        }
      }
      return { messages };
    }),
  addAIbeforeMsg: (chunk: string) =>
    set((state) => {
      const messages = [...state.messages];
      const lastMessage = messages[messages.length - 1];
      // console.log(lastMessage);
      if (lastMessage && lastMessage.role === "assistant") {
        if (typeof lastMessage.content !== "string") {
          lastMessage.content.startingContent += chunk;
        }
      }
      return { messages };
    }),
  addAIafterMsg: (chunk: string) =>
    set((state) => {
      const messages = [...state.messages];
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        if (typeof lastMessage.content !== "string") {
          lastMessage.content.endingContent += chunk;
        }
      }
      return { messages };
    }),
  addChunk: (chunk) =>
    set((state) => {
      const messages = [...state.messages];
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        lastMessage.content += chunk;
      } else {
        messages.push({
          role: "assistant",
          content: chunk,
        });
      }
      return { messages };
    }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () => set({ messages: [] }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
