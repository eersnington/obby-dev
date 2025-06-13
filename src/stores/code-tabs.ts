import { create } from "zustand";

export enum Show {
  CODE = "code",
  PREVIEW = "preview",
  TERMINAL = "terminal",
  NONE = "none",
}

interface ShowTab {
  showTab: Show;
  setShowCode: () => void;
  setShowTerminal: () => void;
  setShowPreview: () => void;
  setShowNone: () => void;
  showWorkspace: boolean;
  setShowWorkspace: (showWorkspace: boolean) => void;
}

export const useShowTab = create<ShowTab>((set) => ({
  showTab: Show.PREVIEW,
  showWorkspace: false,
  setShowWorkspace: (showWorkspace: boolean) => set({ showWorkspace }),
  setShowCode: () => set({ showTab: Show.CODE }),
  setShowTerminal: () => set({ showTab: Show.TERMINAL }),
  setShowPreview: () => set({ showTab: Show.PREVIEW }),
  setShowNone: () => set({ showTab: Show.NONE }),
}));

interface FullPreview {
  fullPreview: boolean;
  setFullPreview: (fullPreview: boolean) => void;
}

export const useFullPreview = create<FullPreview>((set) => ({
  fullPreview: false,
  setFullPreview: (fullPreview: boolean) => set({ fullPreview }),
}));
