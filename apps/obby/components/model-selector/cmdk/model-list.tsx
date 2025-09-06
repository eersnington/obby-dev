import { Badge } from '@repo/design-system/components/ui/badge';
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@repo/design-system/components/ui/command';
import { CheckIcon } from 'lucide-react';
import type { ModelProvider } from '@/ai/constants';
import { useModelStore } from '@/stores/use-model-store';
import { useAvailableModels } from '../use-available-models';

type Props = {
  provider?: ModelProvider;
  selectedModelId?: string;
  onModelSelect: (modelId: string, provider: ModelProvider) => void;
};

export function ModelList({ provider, onModelSelect }: Props) {
  const { models, isLoading } = useAvailableModels();
  const selectedProvider = useModelStore((s) => s.selectedProvider);
  const selectedModelIdFromStore = useModelStore((s) => s.selectedModelId);

  if (!provider) {
    return (
      <CommandList className="h-full overflow-y-auto">
        <CommandEmpty>Select a provider to view models.</CommandEmpty>
      </CommandList>
    );
  }

  const providerModels = models.filter((m) => m.provider === provider);

  return (
    <CommandList className="h-full overflow-y-auto" key={provider}>
      <CommandEmpty>
        {isLoading ? 'Loading models...' : 'No models found.'}
      </CommandEmpty>
      <CommandGroup className="p-2" heading={`${provider} models`}>
        {providerModels.map((model) => (
          <CommandItem
            className="flex items-center gap-2 px-3 py-2"
            key={`${model.provider ?? 'unknown'}:${model.id}`}
            onSelect={() => {
              onModelSelect(model.id, model.provider as ModelProvider);
            }}
            value={`${model.label} ${model.id}`}
          >
            <span className="flex-1 truncate">{model.label}</span>
            {model.byokOnly && (
              <Badge className="text-xs" variant="secondary">
                BYOK
              </Badge>
            )}
            {selectedModelIdFromStore === model.id &&
              selectedProvider === model.provider && (
                <CheckIcon className="size-4 text-primary" />
              )}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
}
