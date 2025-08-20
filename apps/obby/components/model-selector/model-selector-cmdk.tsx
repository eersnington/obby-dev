/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: will refactor later */
'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/design-system/components/ui/command';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { cn } from '@repo/design-system/lib/utils';
import { toast } from '@repo/design-system/sonner';
import { CheckIcon, KeyIcon, LayersIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  type ModelProvider,
  PROVIDER_KEY_SCHEMAS,
  PROVIDER_LOGOS,
  PROVIDERS,
} from '@/ai/constants';
import { useModelStore } from '@/stores/use-model-store';
import { useProviderKeysStore } from '@/stores/use-provider-store';
import { useAvailableModels } from './use-available-models';

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
  const { models, isLoading } = useAvailableModels();
  const provider = useModelStore((s) => s.selectedProvider) as ModelProvider;
  const setProviderStore = useModelStore((s) => s.setProvider);
  const setProvider = (p: ModelProvider) => setProviderStore(p);
  const getKey = useProviderKeysStore((s) => s.getKey);
  const setKey = useProviderKeysStore((s) => s.setKey);

  const providers = useMemo(() => PROVIDERS, []);

  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== 'undefined' && provider && provider !== 'bedrock') {
      const stored = useProviderKeysStore.getState().getKey(provider);
      return typeof stored === 'string' ? stored : '';
    }
    return '';
  });

  const [awsFields, setAwsFields] = useState(() => {
    if (typeof window !== 'undefined' && provider === 'bedrock') {
      const stored = useProviderKeysStore.getState().getKey(provider);
      if (stored && typeof stored === 'object') {
        return {
          region: stored.region || '',
          accessKeyId: stored.accessKeyId || '',
          secretAccessKey: stored.secretAccessKey || '',
          sessionToken: stored.sessionToken || '',
        };
      }
    }
    return {
      region: '',
      accessKeyId: '',
      secretAccessKey: '',
      sessionToken: '',
    };
  });

  const [saving, setSaving] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<
      string,
      { id: string; name: string; provider?: string; byokOnly?: boolean }[]
    >();
    // initialize all known providers to keep the left list stable
    for (const p of PROVIDERS) {
      map.set(p, []);
    }

    for (const m of models) {
      const providerForGroup =
        (m.provider as string | undefined) ?? m.id.split('/')?.[0] ?? '';
      const list = map.get(providerForGroup);
      if (!list) {
        continue;
      }
      list.push({
        id: m.id,
        name: m.label,
        provider: m.provider,
        byokOnly: m.byokOnly,
      });
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return map;
  }, [models]);

  if (!provider) {
    return (
      <CommandDialog
        contentClassName="sm:max-w-4xl"
        description="Pick a provider and model, and optionally set your own API key."
        onOpenChange={onOpenChange}
        open={open}
        title="Model Selector"
      >
        <div className="flex h-[60vh] min-h-[420px] w-full items-center justify-center">
          <div className="text-muted-foreground">Loading providers...</div>
        </div>
      </CommandDialog>
    );
  }

  // Ensure valid provider is selected
  if (providers.length && !providers.includes(provider)) {
    setProvider(providers[0] as ModelProvider);
    return null; // Re-render with valid provider
  }

  // Reset form when modal closes
  if (!open && (apiKey || awsFields.region || awsFields.accessKeyId)) {
    setApiKey('');
    setAwsFields({
      region: '',
      accessKeyId: '',
      secretAccessKey: '',
      sessionToken: '',
    });
  }

  // Load stored key when provider changes
  if (typeof window !== 'undefined' && provider) {
    const storedKey = getKey(provider);
    if (provider === 'bedrock') {
      if (storedKey && typeof storedKey === 'object') {
        const currentFields = {
          region: storedKey.region || '',
          accessKeyId: storedKey.accessKeyId || '',
          secretAccessKey: storedKey.secretAccessKey || '',
          sessionToken: storedKey.sessionToken || '',
        };
        if (JSON.stringify(currentFields) !== JSON.stringify(awsFields)) {
          setAwsFields(currentFields);
        }
      }
      if (apiKey) {
        setApiKey('');
      }
    } else {
      const tokenValue = typeof storedKey === 'string' ? storedKey : '';
      if (apiKey !== tokenValue) {
        setApiKey(tokenValue);
      }
      if (awsFields.region || awsFields.accessKeyId) {
        setAwsFields({
          region: '',
          accessKeyId: '',
          secretAccessKey: '',
          sessionToken: '',
        });
      }
    }
  }

  const currentModels = grouped.get(provider) ?? [];

  const iconFor = (p: ModelProvider) =>
    PROVIDER_LOGOS[p] ?? '/providers/openai.svg';

  const schema = PROVIDER_KEY_SCHEMAS[provider];

  function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSaving(true);
      if (schema.type === 'token') {
        setKey(provider, apiKey.trim() || null);
      } else {
        const payload = {
          region: awsFields.region.trim(),
          accessKeyId: awsFields.accessKeyId.trim(),
          secretAccessKey: awsFields.secretAccessKey.trim(),
          sessionToken: awsFields.sessionToken.trim() || undefined,
        };
        setKey(provider, payload);
      }
      toast.success('Saved', {
        description: `Your API key for ${provider} has been saved.`,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <CommandDialog
      contentClassName="sm:max-w-4xl"
      description="Pick a provider and model, and optionally set your own API key."
      onOpenChange={onOpenChange}
      open={open}
      title="Model Selector"
    >
      <div className="flex h-[60vh] min-h-[420px] w-full flex-col md:flex-row">
        <aside className="w-full border-b p-4 md:w-56 md:border-r md:border-b-0">
          <div className="mb-3 flex items-center gap-2 text-muted-foreground text-xs">
            <LayersIcon className="size-4" />
            Providers
          </div>
          <div className="grid grid-cols-2 gap-1 md:flex md:flex-col">
            {providers.map((p) => (
              <Button
                className={cn(
                  'justify-start gap-2 px-3 py-2',
                  provider === p && 'bg-primary/10 text-primary'
                )}
                key={p}
                onClick={() => setProvider(p)}
                size="sm"
                variant="ghost"
              >
                <div
                  aria-hidden="true"
                  className="size-4 shrink-0 bg-current"
                  style={{
                    maskImage: `url(${iconFor(p)})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                />
                <span className="truncate text-sm">{p}</span>
              </Button>
            ))}
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <div className="border-b px-4 py-3">
            <CommandInput
              className="border-none"
              placeholder={isLoading ? 'Loading models...' : 'Search models...'}
            />
          </div>

          <div className="flex-1 overflow-hidden">
            <CommandList className="h-full overflow-y-auto" key={provider}>
              <CommandEmpty>No models found.</CommandEmpty>
              <CommandGroup className="p-2" heading={`${provider} models`}>
                {currentModels.map((m) => (
                  <CommandItem
                    className="flex items-center gap-2 px-3 py-2"
                    key={`${m.provider ?? 'unknown'}:${m.id}`}
                    onSelect={() => {
                      onChange(m.id);
                      setProvider((m.provider as ModelProvider) ?? provider);
                      onOpenChange(false);
                    }}
                    value={`${m.name} ${m.id}`}
                  >
                    <span className="flex-1 truncate">{m.name}</span>
                    {m.byokOnly && (
                      <Badge className="text-xs" variant="secondary">
                        BYOK
                      </Badge>
                    )}
                    {value === m.id && (
                      <CheckIcon className="size-4 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>

          <div className="border-t p-4">
            <div className="mb-3 flex items-center gap-2">
              <KeyIcon className="size-4" />
              <Label className="font-medium text-sm">API Configuration</Label>
            </div>

            <form className="space-y-4" onSubmit={onSave}>
              <input name="provider" type="hidden" value={provider} />

              {schema.type === 'token' ? (
                <div className="flex gap-2">
                  <Input
                    autoComplete="off"
                    className="flex-1"
                    name="apiKey"
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Enter ${provider} API key`}
                    type="password"
                    value={apiKey}
                  />
                  <Button
                    disabled={!apiKey.trim() || saving}
                    type="submit"
                    variant="outline"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {schema.fields.map((f) => (
                      <div className="space-y-1" key={f.name}>
                        <Label className="text-xs" htmlFor={f.name}>
                          {f.label}
                        </Label>
                        <Input
                          autoComplete="off"
                          id={f.name}
                          name={f.name}
                          onChange={(e) =>
                            setAwsFields((prev) => ({
                              ...prev,
                              [f.name]: e.target.value,
                            }))
                          }
                          placeholder={f.label}
                          type={
                            f.name.toLowerCase().includes('key')
                              ? 'password'
                              : 'text'
                          }
                          value={
                            (awsFields as Record<string, string>)[f.name] ?? ''
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button disabled={saving} type="submit" variant="outline">
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </CommandDialog>
  );
}
