// storage/indexedDbStorage.ts
import { idbGet, idbPut } from './indexed-db-adapter';

export const createIndexedDbStorage = (storeName: string) => ({
  getItem: async (name: string) => {
    const value = await idbGet<string>(storeName, name);
    return value ?? null;
  },
  setItem: async (name: string, value: string) => {
    await idbPut(storeName, name, value);
  },
  removeItem: async (name: string) => {
    await idbPut(storeName, name, null);
  },
});
