import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { EyeIcon, EyeOffIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { type ModelProvider, PROVIDER_KEY_SCHEMAS } from '@/ai/constants';
import { useProviderKey } from './use-provider-key';

type Props = {
  provider: ModelProvider;
};

type AwsFields = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
};

export function AwsKeyForm({ provider }: Props) {
  const { key, setKey, saving } = useProviderKey(provider);
  const schema = PROVIDER_KEY_SCHEMAS[provider];
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const [fields, setFields] = useState<AwsFields>(() => {
    const storedKey = key;
    if (storedKey && typeof storedKey === 'object') {
      return {
        region: storedKey.region || '',
        accessKeyId: storedKey.accessKeyId || '',
        secretAccessKey: storedKey.secretAccessKey || '',
        sessionToken: storedKey.sessionToken || '',
      };
    }
    return {
      region: '',
      accessKeyId: '',
      secretAccessKey: '',
      sessionToken: '',
    };
  });

  const VISIBLE_PREFIX_LENGTH = 3;
  const MAX_MASKED_LENGTH = 10;

  const maskValue = (val: string, fieldName: string) => {
    const isKeyField = fieldName.toLowerCase().includes('key');
    if (!(val && isKeyField) || showKeys[fieldName]) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      region: fields.region.trim(),
      accessKeyId: fields.accessKeyId.trim(),
      secretAccessKey: fields.secretAccessKey.trim(),
      sessionToken: fields.sessionToken.trim() || undefined,
    };
    setKey(payload);
  };

  const updateField = (name: keyof AwsFields, value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowKey = (fieldName: string) => {
    setShowKeys((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const handleClear = () => {
    setFields({
      region: '',
      accessKeyId: '',
      secretAccessKey: '',
      sessionToken: '',
    });
    setKey(null);
  };

  const hasValue = Boolean(
    key &&
      typeof key === 'object' &&
      (key.accessKeyId || key.secretAccessKey || key.region)
  );

  if (schema.type !== 'aws') {
    return null;
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        {schema.fields.map((field) => {
          const isKeyField = field.name.toLowerCase().includes('key');
          const fieldValue = fields[field.name as keyof AwsFields];
          const displayValue = maskValue(fieldValue, field.name);

          return (
            <div className="space-y-1" key={field.name}>
              <Label className="text-xs" htmlFor={field.name}>
                {field.label}
              </Label>
              <div className="relative">
                <Input
                  autoComplete="new-password"
                  className={isKeyField ? 'pr-10' : ''}
                  data-form-type="other"
                  id={field.name}
                  onChange={(e) => {
                    if (showKeys[field.name] || !isKeyField) {
                      updateField(
                        field.name as keyof AwsFields,
                        e.target.value
                      );
                    } else {
                      const inputValue = e.target.value;
                      const currentMasked = displayValue;

                      if (inputValue.length > currentMasked.length) {
                        const newChars = inputValue.slice(currentMasked.length);
                        updateField(
                          field.name as keyof AwsFields,
                          fieldValue + newChars
                        );
                      } else if (inputValue.length < currentMasked.length) {
                        const deleteCount =
                          currentMasked.length - inputValue.length;
                        updateField(
                          field.name as keyof AwsFields,
                          fieldValue.slice(0, fieldValue.length - deleteCount)
                        );
                      }
                    }
                  }}
                  placeholder={field.label}
                  type="text"
                  value={displayValue}
                />
                {isKeyField && (
                  <Button
                    className="-translate-y-1/2 absolute top-1/2 right-1 h-8 w-8 p-0"
                    onClick={() => toggleShowKey(field.name)}
                    type="button"
                    variant="ghost"
                  >
                    {showKeys[field.name] ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end gap-2">
        {hasValue && (
          <Button onClick={handleClear} type="button" variant="outline">
            <TrashIcon className="size-4" />
          </Button>
        )}
        <Button disabled={saving} type="submit" variant="outline">
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
