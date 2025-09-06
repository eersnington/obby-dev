import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { EyeIcon, EyeOffIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import type { ModelProvider } from '@/ai/constants';
import { useProviderKey } from './use-provider-key';

type Props = {
  provider: ModelProvider;
};

const VISIBLE_PREFIX_LENGTH = 3;
const MAX_MASKED_LENGTH = 10;

export function TokenKeyForm({ provider }: Props) {
  const { key, setKey, saving } = useProviderKey(provider);
  const [value, setValue] = useState(() =>
    typeof key === 'string' ? key : ''
  );
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKey(value.trim() || null);
  };

  const maskValue = (val: string) => {
    if (!val || showKey) {
      return val;
    }
    if (val.length <= VISIBLE_PREFIX_LENGTH) {
      return val;
    }
    const prefix = val.slice(0, VISIBLE_PREFIX_LENGTH);
    const maskedLength = Math.min(
      MAX_MASKED_LENGTH,
      val.length - VISIBLE_PREFIX_LENGTH
    );
    return prefix + '*'.repeat(maskedLength);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showKey) {
      setValue(e.target.value);
    } else {
      const inputValue = e.target.value;
      const currentMasked = maskValue(value);

      if (inputValue.length > currentMasked.length) {
        const newChars = inputValue.slice(currentMasked.length);
        setValue(value + newChars);
      } else if (inputValue.length < currentMasked.length) {
        const deleteCount = currentMasked.length - inputValue.length;
        setValue(value.slice(0, value.length - deleteCount));
      }
    }
  };

  const handleClear = () => {
    setValue('');
    setKey(null);
  };

  const hasValue = Boolean(key && typeof key === 'string' && key.trim());

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <Input
          autoComplete="new-password"
          className="pr-10"
          data-form-type="other"
          onChange={handleInputChange}
          placeholder={`Enter ${provider} API key`}
          type="text"
          value={maskValue(value)}
        />
        <Button
          className="-translate-y-1/2 absolute top-1/2 right-1 h-8 w-8 p-0"
          onClick={() => setShowKey(!showKey)}
          type="button"
          variant="ghost"
        >
          {showKey ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex gap-2">
        {hasValue && (
          <Button onClick={handleClear} type="button" variant="outline">
            <TrashIcon className="size-4" />
          </Button>
        )}
        <Button
          disabled={!value.trim() || saving}
          type="submit"
          variant="outline"
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
