'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import { Loader2Icon } from 'lucide-react';
import { memo, useMemo } from 'react';
import { PROVIDER_LOGOS } from '@/ai/constants';
import { useModelStore } from '@/stores/use-model-store';
import { useAvailableModels } from '../use-available-models';

type Props = {
  modelId: string;
  onModelChange: (modelId: string) => void;
};

const providerIconSrc: Record<string, string> = PROVIDER_LOGOS as Record<
  string,
  string
>;

export const ModelSelector = memo(function UnMemoizedModelSelector({
  modelId,
  onModelChange,
}: Props) {
  const { models, isLoading, error } = useAvailableModels();
  const selectedProvider = useModelStore((s) => s.selectedProvider);
  const selectModel = useModelStore((s) => s.selectModel);

  const isDisabled = isLoading || Boolean(error) || !models?.length;

  const triggerContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-2">
          <Loader2Icon className="h-4 w-4 animate-spin" />
          <span>Loading</span>
        </div>
      );
    }
    if (error) {
      return <span className="text-red-500">Error</span>;
    }
    if (models?.length) {
      return <SelectValue placeholder="Select a model" />;
    }
    return <span>No models</span>;
  }, [error, isLoading, models?.length]);

  const sortedModels = useMemo(() => {
    if (!models) {
      return [];
    }
    const enriched = models.map((m) => {
      const [maybeVendor, maybeName] = m.id.includes('/')
        ? m.id.split('/')
        : [m.provider ?? '', m.id];
      const displayName = maybeName ?? m.label;
      const vendor = m.provider ?? maybeVendor ?? '';
      const source = m.provider ?? vendor;
      return { ...m, vendor, source, displayName } as typeof m & {
        vendor: string;
        source: string;
        displayName: string;
      };
    });
    return enriched.sort((a, b) => {
      if (a.vendor !== b.vendor) {
        return a.vendor.localeCompare(b.vendor);
      }
      const nameCmp = a.displayName.localeCompare(b.displayName);
      if (nameCmp !== 0) {
        return nameCmp;
      }
      return a.source.localeCompare(b.source);
    });
  }, [models]);

  const currentValue = useMemo(() => {
    const candidates = models.filter((m) => m.id === modelId);
    const chosen =
      candidates.find((m) => m.provider === selectedProvider) || candidates[0];
    return chosen ? `${chosen.provider ?? 'unknown'}>${chosen.id}` : modelId;
  }, [models, modelId, selectedProvider]);

  const handleValueChange = (compositeValue: string) => {
    const separatorIndex = compositeValue.indexOf('>');
    if (separatorIndex >= 0) {
      const provider = compositeValue.slice(0, separatorIndex);
      const modelOnlyId = compositeValue.slice(separatorIndex + 1);
      selectModel(provider, modelOnlyId);
      onModelChange(modelOnlyId);
    } else {
      onModelChange(compositeValue);
    }
  };

  return (
    <Select
      disabled={isDisabled}
      onValueChange={handleValueChange}
      value={currentValue}
    >
      <SelectTrigger className="w-[180px] bg-background">
        {triggerContent}
      </SelectTrigger>

      <SelectContent className="max-h-[320px]">
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>
          {sortedModels.map((model) => {
            const icon =
              providerIconSrc[model.vendor ?? ''] ?? providerIconSrc.openai;
            return (
              <SelectItem
                key={`${model.provider ?? 'unknown'}:${model.id}`}
                value={`${model.provider ?? 'unknown'}>${model.id}`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block size-[14px] text-primary"
                    style={{
                      backgroundColor: 'currentColor',
                      WebkitMaskImage: `url(${icon})`,
                      maskImage: `url(${icon})`,
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                    }}
                  />
                  <span>
                    {model.provider
                      ? `${model.provider} / ${model.displayName}`
                      : model.label}
                  </span>
                  {model.byokOnly && (
                    <Badge className="ml-auto text-xs" variant="secondary">
                      BYOK
                    </Badge>
                  )}
                </span>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
