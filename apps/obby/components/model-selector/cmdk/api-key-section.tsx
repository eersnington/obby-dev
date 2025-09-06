import { Label } from '@repo/design-system/components/ui/label';
import { KeyIcon } from 'lucide-react';
import { type ModelProvider, PROVIDER_KEY_SCHEMAS } from '@/ai/constants';
import { AwsKeyForm } from './aws-key-form';
import { TokenKeyForm } from './token-key-form';

type Props = {
  provider: ModelProvider;
};

export function ApiKeySection({ provider }: Props) {
  if (!provider) {
    return null;
  }

  const schema = PROVIDER_KEY_SCHEMAS[provider];

  return (
    <div className="border-t p-4">
      <div className="mb-3 flex items-center gap-2">
        <KeyIcon className="size-4" />
        <Label className="font-medium text-sm">API Configuration</Label>
      </div>

      {schema.type === 'token' ? (
        <TokenKeyForm provider={provider} />
      ) : (
        <AwsKeyForm provider={provider} />
      )}
    </div>
  );
}
