import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createIndexedDbStorage } from '@/lib/use-index-db-storage';

type ModelState = {
  selectedProvider?: string;
  selectedModelId?: string;
  
  setProvider: (provider: string) => void;
  setModel: (modelId: string) => void;
  selectModel: (provider: string, modelId: string) => void;
};

export const useModelStore = create<ModelState>()(
  persist(
    (set) => ({
      selectedProvider: undefined,
      selectedModelId: undefined,
      
      setProvider: (provider) => {
        set({ selectedProvider: provider });
      },
      
      setModel: (modelId) => {
        set({ selectedModelId: modelId });
      },
      
      selectModel: (provider, modelId) => {
        set({
          selectedProvider: provider,
          selectedModelId: modelId
        });
      },
    }),
    {
      name: 'model-selection',
      storage: createJSONStorage(() => createIndexedDbStorage('model-selection')),
    }
  )
);
