'use client';

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
import { CheckIcon, KeyIcon, LayersIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  type ModelProvider,
  PROVIDER_KEY_SCHEMAS,
  PROVIDER_LOGOS,
  PROVIDERS,
} from '@/ai/constants';
import { useModelStore } from './models-store';
import { getProviderKey, setProviderKey } from './provider-keys';
import { useAvailableModels } from './use-available-models';

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  value?: string;
  onChange(modelId: string): void;
}

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
      { id: string; name: string; provider?: string }[]
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
      list.push({ id: m.id, name: m.label, provider: m.provider });
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
      contentClassName="sm:max-w-[940px]"
      description="Pick a provider and model, and optionally set your own API key."
      onOpenChange={onOpenChange}
      open={open}
      title="Model Selector"
    >
      <div className="grid h-[60vh] min-h-[420px] w-[980px] max-w-[min(95vw,1100px)] grid-cols-[220px_1fr]">
        {/* Providers List */}
        <aside className="min-w-[220px] overflow-y-auto border-r p-2">
          <div className="mb-2 flex items-center gap-2 px-1 text-muted-foreground text-xs">
            <LayersIcon className="size-4" /> Providers
          </div>
          <div className="flex flex-col gap-1">
            {providers.map((p) => (
              <Button
                className={cn(
                  'justify-start px-8',
                  provider === p && 'bg-primary/40 text-primary-foreground'
                )}
                key={p}
                onClick={() => setProvider(p)}
                variant="ghost"
              >
                <span
                  aria-hidden
                  className="inline-block size-[14px] text-primary"
                  style={{
                    backgroundColor: 'currentColor',
                    WebkitMaskImage: `url(${iconFor(p)})`,
                    maskImage: `url(${iconFor(p)})`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                />
                <span className="truncate">{p}</span>
              </Button>
            ))}
          </div>
        </aside>

        {/* Models and API Key */}
        <section className="flex min-w-0 flex-1 flex-col">
          <div className="px-3 py-2">
            <CommandInput
              placeholder={isLoading ? 'Loading models...' : 'Search models...'}
            />
          </div>
          {/* <CommandSeparator /> */}
          <CommandList className="flex-1 overflow-y-auto" key={provider}>
            <CommandEmpty>No models found.</CommandEmpty>
            <CommandGroup heading={`${provider} models`}>
              {currentModels.map((m) => (
                <CommandItem
                  key={`${m.provider ?? 'unknown'}:${m.id}`}
                  onSelect={() => {
                    // Update model id and also remember the provider choice
                    onChange(m.id);
                    setProvider((m.provider as ModelProvider) ?? provider);
                    onOpenChange(false);
                  }}
                  value={`${m.name} ${m.id}`}
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
            <form className="flex w-full items-center gap-2" onSubmit={onSave}>
              <input hidden name="provider" readOnly value={provider} />
              {schema.type === 'token' ? (
                <>
                  <Input
                    autoComplete="off"
                    name="apiKey"
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Set ${provider} API key`}
                    type="password"
                    value={apiKey}
                  />
                  <Button
                    disabled={!apiKey.trim() || saving}
                    type="submit"
                    variant="outline"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <div className="grid w-full grid-cols-2 gap-2">
                  {schema.fields.map((f) => (
                    <div className="flex items-center gap-2" key={f.name}>
                      <Label className="w-28 text-xs">{f.label}</Label>
                      <Input
                        autoComplete="off"
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
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button disabled={saving} type="submit" variant="outline">
                      Save
                    </Button>
                  </div>
                </div>
              )}
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
        </section>
      </div>
    </CommandDialog>
  );
}
