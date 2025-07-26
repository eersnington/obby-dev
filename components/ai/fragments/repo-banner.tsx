import { GitHubIcon } from './icons';
import { Separator } from 'components/ui/separator';
import { cn } from 'lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';

const REPO_URL = 'https://github.com/eersnington/obby-dev';

export function RepoBanner({ className }: { className?: string }) {
  return (
    <a
      aria-label={'View Obby repository on GitHub'}
      className={cn(
        'overflow-hidden rounded-t-2xl bg-background px-3 py-1',
        'flex items-center gap-2 border border-b-0',
        'transform-y-1 group relative',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-t-2xl dark:before:bg-[radial-gradient(circle_at_10%_-50%,rgba(255,255,255,0.1),transparent_10%)]',
        className,
      )}
      href={REPO_URL}
      rel="noopener noreferrer"
      target="_blank"
    >
      <GitHubIcon aria-hidden="true" className="h-4 w-4" />
      <Separator
        aria-hidden="true"
        className="h-6 bg-[hsl(var(--border))]"
        orientation="vertical"
      />
      <p className="font-medium text-foreground text-sm tracking-wide">
        Star on GitHub
      </p>
      <div
        aria-live="polite"
        className="flex items-center gap-1 text-foreground/80"
      >
        <StarFilledIcon
          aria-label="GitHub stars"
          className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:text-[#e4b340]"
        />
      </div>
    </a>
  );
}
