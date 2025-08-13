import { idbGet, idbPut } from './idb';

const STORE = 'provider-keys';

export type ProviderKeyValue =
  | string
  | {
      region: string;
      accessKeyId: string;
      secretAccessKey: string;
      sessionToken?: string;
    };

export async function setProviderKey(
  provider: string,
  value: ProviderKeyValue | null
) {
  await idbPut(STORE, provider, value);
}

export async function getProviderKey<
  T extends ProviderKeyValue = ProviderKeyValue,
>(provider: string) {
  return await idbGet<T>(STORE, provider);
}
