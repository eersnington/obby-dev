import { Button } from '@repo/design-system/components/ui/button';
import { cn } from '@repo/design-system/lib/utils';
import { LayersIcon } from 'lucide-react';
import { type ModelProvider, PROVIDER_LOGOS, PROVIDERS } from '@/ai/constants';

type Props = {
  selected?: ModelProvider;
  onSelect: (provider: ModelProvider) => void;
};

export function ProviderSidebar({ selected, onSelect }: Props) {
  const iconFor = (provider: ModelProvider) =>
    PROVIDER_LOGOS[provider] ?? '/providers/openai.svg';

  const handleSelect = (p: ModelProvider) => {
    if (p !== selected) {
      onSelect(p);
    }
  };

  return (
    <aside className="w-full border-b p-4 md:w-56 md:border-r md:border-b-0">
      <div className="mb-3 flex items-center gap-2 text-muted-foreground text-xs">
        <LayersIcon className="size-4" />
        Providers
      </div>
      <div className="grid grid-cols-2 gap-1 md:flex md:flex-col">
        {PROVIDERS.map((provider) => (
          <Button
            className={cn(
              'justify-start gap-2 px-3 py-2',
              selected === provider && 'bg-primary/10 text-primary'
            )}
            key={provider}
            onClick={() => handleSelect(provider)}
            onFocus={() => handleSelect(provider)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSelect(provider);
              }
            }}
            onMouseOver={() => handleSelect(provider)}
            size="sm"
            variant="ghost"
          >
            <div
              aria-hidden="true"
              className="size-4 shrink-0 bg-current"
              style={{
                maskImage: `url(${iconFor(provider)})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
            <span className="truncate text-sm">{provider}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
