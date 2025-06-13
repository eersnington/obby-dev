import { create } from "zustand";

interface TerminalStore {
  terminal: string[];
  url: string;
  addCommand: (terminal: string) => void;
  clearTerminal: () => void;
  showTerminalInput: boolean;
  setShowTerminalInput: (showTerminalInput: boolean) => void;
  setUrl: (url: string) => void;
  isLoadingWebContainer: boolean;
  setIsLoadingWebContainer: (isLoadingWebContainer: boolean) => void;
  isLoadingWebContainerMessage: string;
  setIsLoadingWebContainerMessage: (
    isLoadingWebContainerMessage: string,
  ) => void;
  isSavingFiles: boolean;
  setIsSavingFiles: (isSavingFiles: boolean) => void;
}

export const useTerminalStore = create<TerminalStore>((set) => ({
  isSavingFiles: false,
  setIsSavingFiles: (isSavingFiles: boolean) => set({ isSavingFiles }),
  isLoadingWebContainer: true,
  isLoadingWebContainerMessage: "Building the Web Container...",
  setIsLoadingWebContainer: (isLoadingWebContainer) =>
    set({ isLoadingWebContainer }),
  setIsLoadingWebContainerMessage: (isLoadingWebContainerMessage) =>
    set({ isLoadingWebContainerMessage }),
  showTerminalInput: true,
  url: "", // url of the project which webcontainer is giving,  no use currently
  terminal: [],
  addCommand: (terminal) =>
    set((state) => ({ terminal: [...state.terminal, terminal] })),
  clearTerminal: () => set({ terminal: [] }),
  setShowTerminalInput: (showTerminalInput) => set({ showTerminalInput }),
  setUrl: (url: string) => set({ url }),
}));
