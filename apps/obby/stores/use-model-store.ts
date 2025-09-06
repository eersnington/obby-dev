import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ModelProvider } from '@/ai/constants';
import { createIndexedDbStorage } from '@/lib/use-index-db-storage';

type ModelState = {
  selectedProvider?: ModelProvider;
  selectedModelId?: string;
  _hasHydrated: boolean;

  setProvider: (provider: ModelProvider) => void;
  setModel: (modelId: string) => void;
  selectModel: (provider: ModelProvider, modelId: string) => void;
  _setHasHydrated: (hasHydrated: boolean) => void;
};

export const useModelStore = create<ModelState>()(
  persist(
    (set) => ({
      selectedProvider: undefined,
      selectedModelId: undefined,
      _hasHydrated: false,

      setProvider: (provider) => {
        set({ selectedProvider: provider });
      },

      setModel: (modelId) => {
        set({ selectedModelId: modelId });
      },

      selectModel: (provider, modelId) => {
        set({
          selectedProvider: provider,
          selectedModelId: modelId,
        });
      },

      _setHasHydrated: (hasHydrated) => {
        set({ _hasHydrated: hasHydrated });
      },
    }),
    {
      name: 'model-selection',
      storage: createJSONStorage(() =>
        createIndexedDbStorage('model-selection')
      ),
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    }
  )
);
