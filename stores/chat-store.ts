import { create } from 'zustand';

interface ChatState {
  isChatActive: boolean;
  currentChatId: string | null;
  startChat: (chatId: string) => void;
  resetChat: () => void;
  initializeFromUrl: (chatId?: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isChatActive: false,
  currentChatId: null,

  startChat: (chatId: string) => {
    set({
      isChatActive: true,
      currentChatId: chatId,
    });
  },

  resetChat: () => {
    set({
      isChatActive: false,
      currentChatId: null,
    });
  },

  initializeFromUrl: (chatId?: string) => {
    if (chatId) {
      set({
        isChatActive: true,
        currentChatId: chatId,
      });
    } else {
      set({
        isChatActive: false,
        currentChatId: null,
      });
    }
  },
}));
