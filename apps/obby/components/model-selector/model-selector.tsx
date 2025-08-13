'use client';

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
import { useModelStore } from './models-store';
import { useAvailableModels } from './use-available-models';

interface Props {
  modelId: string;
  onModelChange: (modelId: string) => void;
}

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
  const setProvider = useModelStore((s) => s.setProvider);
  const isDisabled = isLoading || !!error || !models?.length;
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

  const makeComposite = useMemo(
    () => (provider: string | undefined, id: string) =>
      `${provider ?? 'unknown'}:${id}`,
    []
  );

  const currentValue = useMemo(() => {
    const candidates = models.filter((m) => m.id === modelId);
    const chosen =
      candidates.find((m) => m.provider === (selectedProvider as string)) ||
      candidates[0];
    return chosen ? makeComposite(chosen.provider, chosen.id) : modelId;
  }, [models, modelId, selectedProvider, makeComposite]);

  return (
    <Select
      disabled={isDisabled}
      onValueChange={(val) => {
        const idx = val.indexOf(':');
        const provider = idx >= 0 ? val.slice(0, idx) : undefined;
        const idOnly = idx >= 0 ? val.slice(idx + 1) : val;
        if (provider) {
          setProvider(provider);
        }
        onModelChange(idOnly);
      }}
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
                value={makeComposite(model.provider, model.id)}
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
                </span>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
