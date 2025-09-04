import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const OPTIONAL_TOOL_KEYS = ['webScrape', 'webSearch'] as const;
export type OptionalToolKey = (typeof OPTIONAL_TOOL_KEYS)[number];
export const DEFAULT_TOOL_OPTIONS: Record<OptionalToolKey, boolean> = {
  webScrape: true,
  webSearch: true,
};

export type ToolOptionsState = {
  webScrape: boolean;
  webSearch: boolean;
  _hasHydrated: boolean;
  setOption: (key: OptionalToolKey, value: boolean) => void;
  setOptions: (partial: Partial<Record<OptionalToolKey, boolean>>) => void;
  resetOptions: () => void;
  _setHasHydrated: (value: boolean) => void;
  getRequestTools: () => Record<OptionalToolKey, boolean>;
};

const sanitize = (partial: Partial<Record<string, unknown>>) => {
  const cleaned: Partial<Record<OptionalToolKey, boolean>> = {};
  for (const k of OPTIONAL_TOOL_KEYS) {
    const v = partial[k];
    if (typeof v === 'boolean') {
      cleaned[k] = v;
    }
  }
  return cleaned;
};

const STORE_NAME = 'tool-options';

export const useToolOptionsStore = create<ToolOptionsState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_TOOL_OPTIONS,
      _hasHydrated: false,
      setOption: (key, value) => {
        set({ [key]: value });
      },
      setOptions: (partial) => {
        const cleaned = sanitize(partial);
        if (Object.keys(cleaned).length === 0) {
          return;
        }
        set(cleaned);
      },
      resetOptions: () => {
        set({ ...DEFAULT_TOOL_OPTIONS });
      },
      _setHasHydrated: (value) => {
        set({ _hasHydrated: value });
      },
      getRequestTools: () => {
        const { webScrape, webSearch } = get();
        const out: Record<OptionalToolKey, boolean> = {} as Record<
          OptionalToolKey,
          boolean
        >;
        if (webScrape) {
          out.webScrape = true;
        }
        if (webSearch) {
          out.webSearch = true;
        }
        return out;
      },
    }),
    {
      name: STORE_NAME,

      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
      version: 1,
      migrate: (persisted) => {
        const base: Partial<Record<OptionalToolKey, boolean>> = {
          ...DEFAULT_TOOL_OPTIONS,
          ...(persisted ?? {}),
        };
        for (const k of OPTIONAL_TOOL_KEYS) {
          if (typeof base[k] !== 'boolean') {
            base[k] = DEFAULT_TOOL_OPTIONS[k];
          }
        }
        return base as ToolOptionsState;
      },
      partialize: (state) => ({
        webScrape: state.webScrape,
        webSearch: state.webSearch,
      }),
    }
  )
);
