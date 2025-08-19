import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ModelState = {
  selectedProvider?: string;
  selectedModelId?: string;
  setProvider: (p: string) => void;
  setModel: (id: string) => void;
};

export const useModelStore = create<ModelState>()(
  persist(
    (set) => ({
      selectedProvider: undefined,
      selectedModelId: undefined,
      setProvider: (p) => set({ selectedProvider: p }),
      setModel: (id) => set({ selectedModelId: id }),
    }),
    {
      name: 'model-selection',
    }
  )
);
