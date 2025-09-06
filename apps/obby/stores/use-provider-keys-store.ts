import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createIndexedDbStorage } from '@/lib/use-index-db-storage';

const storeName = 'provider-keys';

export type ProviderKeyValue =
  | string
  | {
      region: string;
      accessKeyId: string;
      secretAccessKey: string;
      sessionToken?: string;
    };

type ProviderKeysState = {
  keys: Record<string, ProviderKeyValue | undefined>;
  setKey: (provider: string, value: ProviderKeyValue | null) => void;
  getKey: (provider: string) => ProviderKeyValue | undefined;
  clearKeys: () => void;
};

export const useProviderKeysStore = create<ProviderKeysState>()(
  persist(
    (set, get) => ({
      keys: {},
      setKey: (provider, value) =>
        set((state) => ({
          keys: {
            ...state.keys,
            [provider]: value ?? undefined,
          },
        })),
      getKey: (provider) => get().keys[provider],
      clearKeys: () => set({ keys: {} }),
    }),
    {
      name: storeName,
      storage: createJSONStorage(() => createIndexedDbStorage(storeName)),
    }
  )
);
