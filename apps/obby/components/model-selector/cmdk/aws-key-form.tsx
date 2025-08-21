import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
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

  if (schema.type !== 'aws') {
    return null;
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        {schema.fields.map((field) => (
          <div className="space-y-1" key={field.name}>
            <Label className="text-xs" htmlFor={field.name}>
              {field.label}
            </Label>
            <Input
              autoComplete="off"
              id={field.name}
              onChange={(e) =>
                updateField(field.name as keyof AwsFields, e.target.value)
              }
              placeholder={field.label}
              type={
                field.name.toLowerCase().includes('key') ? 'password' : 'text'
              }
              value={fields[field.name as keyof AwsFields]}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button disabled={saving} type="submit" variant="outline">
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
