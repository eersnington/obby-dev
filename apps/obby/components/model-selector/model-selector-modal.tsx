'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@repo/design-system/components/ui/command';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { cn } from '@repo/design-system/lib/utils';
import { CheckIcon, KeyIcon, LayersIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { setProviderApiKey } from '@/app/actions/model/set-api-key';
import { useAvailableModels } from './use-available-models';

type ProviderKey =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'groq'
  | 'openrouter'
  | 'vercel'
  | 'gateway'
  | 'bedrock';

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  value?: string; // current selected model id
  onChange(modelId: string): void;
}

export function ModelSelectorModal({
  open,
  onOpenChange,
  value,
  onChange,
}: Props) {
  const { models, isLoading } = useAvailableModels();
  const [provider, setProvider] = useState<ProviderKey>('openai');
  const [apiKey, setApiKey] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) {
      setApiKey('');
    }
  }, [open]);

  const grouped = useMemo(() => {
    const map = new Map<string, { id: string; name: string }[]>();
    for (const m of models) {
      const [prov] = m.id.split('/');
      if (!map.has(prov)) {
        map.set(prov, []);
      }
      const list = map.get(prov);
      if (list) {
        list.push({ id: m.id, name: m.label });
      }
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return map;
  }, [models]);

  const providers = useMemo(() => Array.from(grouped.keys()).sort(), [grouped]);
  useEffect(() => {
    if (providers.length && !providers.includes(provider)) {
      setProvider(providers[0] as ProviderKey);
    }
  }, [providers, provider]);

  const currentModels = grouped.get(provider) ?? [];

  return (
    <CommandDialog
      description="Pick a provider and model, and optionally set your own API key."
      onOpenChange={onOpenChange}
      open={open}
      title="Model Selector"
    >
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <LayersIcon className="size-4" />
          Provider
        </div>
        <div className="flex max-w-[60%] flex-wrap gap-1">
          {providers.map((p) => (
            <button
              className={cn(
                'rounded-full border border-input px-2 py-1 text-muted-foreground text-xs transition-colors hover:text-foreground',
                provider === p &&
                  'border-transparent bg-primary text-primary-foreground hover:text-primary-foreground'
              )}
              key={p}
              onClick={() => setProvider(p as ProviderKey)}
              type="button"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <CommandSeparator />
      <CommandInput
        placeholder={isLoading ? 'Loading models...' : 'Search models...'}
      />
      <CommandList>
        <CommandEmpty>No models found.</CommandEmpty>
        <CommandGroup heading={`${provider} models`}>
          {currentModels.map((m) => (
            <CommandItem
              key={m.id}
              onSelect={() => {
                onChange(m.id);
                onOpenChange(false);
              }}
              value={m.name}
            >
              <span className="truncate">{m.name}</span>
              {value === m.id && <CheckIcon className="ml-auto size-4" />}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="flex items-center gap-2 border-t p-3">
        <Label className="shrink-0 text-xs">
          <span className="inline-flex items-center gap-1">
            <KeyIcon className="size-3" /> API key
          </span>
        </Label>
        <form
          action={(fd: FormData) => {
            startTransition(async () => {
              await setProviderApiKey(fd);
              setApiKey('');
            });
          }}
          className="flex w-full items-center gap-2"
        >
          <input hidden name="provider" readOnly value={provider} />
          <Input
            autoComplete="off"
            name="apiKey"
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={`Set ${provider} API key (stored in cookie)`}
            type="password"
            value={apiKey}
          />
          <Button
            disabled={!apiKey.trim() || isPending}
            type="submit"
            variant="outline"
          >
            Save
          </Button>
          <Button
            className="text-muted-foreground"
            onClick={() => onOpenChange(false)}
            size="icon"
            type="button"
            variant="ghost"
          >
            <XIcon className="size-4" />
          </Button>
        </form>
      </div>
    </CommandDialog>
  );
}
