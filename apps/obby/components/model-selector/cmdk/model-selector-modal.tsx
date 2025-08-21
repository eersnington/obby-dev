'use client';

import { CommandDialog } from '@repo/design-system/components/ui/command';
import { type ModelProvider, PROVIDERS } from '@/ai/constants';
import { useModelStore } from '@/stores/use-model-store';
import { useAvailableModels } from '../use-available-models';
import { ModelSection } from './model-section';
import { ProviderSidebar } from './provider-sidebar';

type Props = {
  open: boolean;
  onOpenChange(open: boolean): void;
  value?: string;
  onChange(modelId: string): void;
};

export function ModelSelectorModal({
  open,
  onOpenChange,
  value,
  onChange,
}: Props) {
  const { isLoading } = useAvailableModels();
  const selectedProvider = useModelStore((s) => s.selectedProvider);
  const selectModel = useModelStore((s) => s.selectModel);
  const setProvider = useModelStore((s) => s.setProvider);

  // Ensure we have a provider selected, default to first one if none
  const currentProvider = selectedProvider || PROVIDERS[0];

  const handleProviderSelect = (provider: ModelProvider) => {
    setProvider(provider);
  };

  const handleModelSelect = (modelId: string, provider: ModelProvider) => {
    selectModel(provider, modelId);
    onChange(modelId);
    onOpenChange(false);
  };


  return (
    <CommandDialog
      contentClassName="sm:max-w-4xl"
      description="Pick a provider and model, and optionally set your own API key."
      onOpenChange={onOpenChange}
      open={open}
      title="Model Selector"
    >
      <div className="flex h-[60vh] min-h-[420px] w-full flex-col md:flex-row">
        <ProviderSidebar
          onSelect={handleProviderSelect}
          selected={currentProvider}
        />

        <ModelSection
          isLoading={isLoading}
          onModelSelect={handleModelSelect}
          provider={currentProvider}
          selectedModelId={value}
        />
      </div>
    </CommandDialog>
  );
}
