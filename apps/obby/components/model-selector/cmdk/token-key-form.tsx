import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { useState } from 'react';
import type { ModelProvider } from '@/ai/constants';
import { useProviderKey } from './use-provider-key';

type Props = {
  provider: ModelProvider;
};

export function TokenKeyForm({ provider }: Props) {
  const { key, setKey, saving } = useProviderKey(provider);
  const [value, setValue] = useState(() =>
    typeof key === 'string' ? key : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKey(value.trim() || null);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        autoComplete="off"
        className="flex-1"
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${provider} API key`}
        type="password"
        value={value}
      />
      <Button
        disabled={!value.trim() || saving}
        type="submit"
        variant="outline"
      >
        {saving ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}
