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
import { useEffect, useMemo, useState } from 'react';
import {
  type ModelProvider,
  PROVIDER_KEY_SCHEMAS,
  PROVIDER_LOGOS,
  PROVIDERS,
} from '@/ai/constants';
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
  const [apiKey, setApiKey] = useState('');
  const [awsFields, setAwsFields] = useState({
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setApiKey('');
      setAwsFields({
        region: '',
        accessKeyId: '',
        secretAccessKey: '',
        sessionToken: '',
      });
    }
  }, [open]);

  useEffect(() => {
    // Load stored key for current provider
    (async () => {
      try {
        if (provider === 'bedrock') {
          const val = await getProviderKey<{
            region: string;
            accessKeyId: string;
            secretAccessKey: string;
            sessionToken?: string;
          }>(provider);
          if (val) {
            setAwsFields({
              region: val.region ?? '',
              accessKeyId: val.accessKeyId ?? '',
              secretAccessKey: val.secretAccessKey ?? '',
              sessionToken: val.sessionToken ?? '',
            });
          } else {
            setAwsFields({
              region: '',
              accessKeyId: '',
              secretAccessKey: '',
              sessionToken: '',
            });
          }
          setApiKey('');
        } else {
          const token = await getProviderKey<string>(provider);
          setApiKey(token ?? '');
        }
      } catch {
        // ignore
      }
    })();
  }, [provider]);

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

  const providers = useMemo(() => PROVIDERS, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: incorrect suggestion
  useEffect(() => {
    const valid = providers.includes(provider);
    if (providers.length && !valid) {
      setProvider(providers[0] as ModelProvider);
    }
  }, [providers, provider]);

  const currentModels = grouped.get(provider) ?? [];

  const iconFor = (p: ModelProvider) =>
    PROVIDER_LOGOS[p] ?? '/providers/openai.svg';

  const schema = PROVIDER_KEY_SCHEMAS[provider];

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSaving(true);
      if (schema.type === 'token') {
        await setProviderKey(provider, apiKey.trim() || null);
      } else {
        const payload = {
          region: awsFields.region.trim(),
          accessKeyId: awsFields.accessKeyId.trim(),
          secretAccessKey: awsFields.secretAccessKey.trim(),
          sessionToken: awsFields.sessionToken.trim() || undefined,
        };
        await setProviderKey(provider, payload);
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
        {/* Providers List */}
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

        {/* Models and API Key */}
        <section className="flex min-w-0 flex-1 flex-col">
          <div className="border-b px-4 py-3">
            <CommandInput
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
