import { cn } from '@repo/design-system/lib/utils';
import { PulseLoader } from 'react-spinners';

export function MessageSpinner({ className }: { className?: string }) {
  return <PulseLoader className={cn('opacity-60', className)} size={5} />;
}
