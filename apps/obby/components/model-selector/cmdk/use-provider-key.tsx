import { toast } from '@repo/design-system/sonner';
import { useState } from 'react';
import type { ModelProvider } from '@/ai/constants';
import type { ProviderKeyValue } from '@/stores/use-provider-store';
import { useProviderKeysStore } from '@/stores/use-provider-store';

export function useProviderKey(provider: ModelProvider) {
  const getKey = useProviderKeysStore((s) => s.getKey);
  const setKey = useProviderKeysStore((s) => s.setKey);
  const [saving, setSaving] = useState(false);

  const storedKey = getKey(provider);

  const saveKey = (value: ProviderKeyValue | null) => {
    try {
      setSaving(true);
      setKey(provider, value);
      toast.success('Saved', {
        description: `Your API key for ${provider} has been saved.`,
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    key: storedKey,
    setKey: saveKey,
    saving,
  };
}
