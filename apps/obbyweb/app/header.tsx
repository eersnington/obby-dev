import { VercelDashed } from '@/components/icons/vercel-dashed';
import { ToggleWelcome } from '@/components/modals/welcome';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export async function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center">
        <VercelDashed className="mr-1.5 ml-1 md:ml-2.5" />
        <span className="hidden font-bold font-mono text-sm uppercase tracking-tight md:inline">
          OSS Vibe Coding Platform
        </span>
      </div>
      <div className="ml-auto flex items-center space-x-1.5">
        <ToggleWelcome />
      </div>
    </header>
  );
}
