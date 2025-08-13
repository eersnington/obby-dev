import { idbGet, idbPut } from './idb';

const STORE = 'model-selection';

export async function setSelectedModelId(modelId: string | null) {
  await idbPut(STORE, 'selected', modelId);
}

export async function getSelectedModelId(): Promise<string | undefined> {
  return await idbGet<string>(STORE, 'selected');
}
