import { cn } from '@repo/design-system/lib/utils';
import Link from 'next/link';
import { ObbyLogo } from '@/components/icons/obby-logo';

type Props = {
  className?: string;
};

export function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center">
        <Link className="flex items-center" href="/" prefetch>
          <ObbyLogo className="mr-1.5 ml-1 md:ml-2.5" />
          <span className="hidden font-bold font-mono text-md tracking-tight md:inline">
            0bby
          </span>
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-1.5" />
    </header>
  );
}
