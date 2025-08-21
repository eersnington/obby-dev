import { CommandInput } from '@repo/design-system/components/ui/command';
import type { ModelProvider } from '@/ai/constants';
import { ApiKeySection } from './api-key-section';
import { ModelList } from './model-list';

type Props = {
  provider?: ModelProvider;
  selectedModelId?: string;
  onModelSelect: (modelId: string, provider: ModelProvider) => void;
  isLoading: boolean;
};

export function ModelSection({
  provider,
  selectedModelId,
  onModelSelect,
  isLoading,
}: Props) {
  if (!provider) {
    return (
      <section className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-full items-center justify-center">
          <div className="text-muted-foreground">Loading providers...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <div className="border-b px-4 py-3">
        <CommandInput
          className="border-none"
          placeholder={isLoading ? 'Loading models...' : 'Search models...'}
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <ModelList
          onModelSelect={onModelSelect}
          provider={provider}
          selectedModelId={selectedModelId}
        />
      </div>

      <ApiKeySection provider={provider} />
    </section>
  );
}
