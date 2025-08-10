import { withAuth } from '@repo/auth/server';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import { cn } from '@repo/design-system/lib/utils';
import Link from 'next/link';
import { Suspense } from 'react';
import { ObbyLogo } from '@/components/icons/obby-logo';
import FeedbackModal from '@/components/layout/feedback-dialog';
import { SignInButton } from '@/components/layout/sign-in-button';
import { SignUpButton } from '@/components/layout/sign-up-button';
import { UserNav } from '@/components/layout/user-nav';

interface Props {
  className?: string;
}

export async function Header({ className }: Props) {
  const { user, role } = await withAuth();

  return (
    <header className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center">
        <ObbyLogo className="mr-1.5 ml-1 md:ml-2.5" />
        <span className="hidden font-bold font-mono text-md tracking-tight md:inline">
          0bby
        </span>
      </div>
      <div className="ml-auto flex items-center space-x-1.5">
        {!user && (
          <>
            <Link className="text-sm hover:underline" href="/pricing" prefetch>
              Pricing
            </Link>
            <SignUpButton />
            <SignInButton />
          </>
        )}
        {user && (
          <>
            {!role && (
              <Link
                className="text-sm hover:underline"
                href="/pricing"
                prefetch
              >
                Pricing
              </Link>
            )}
            <FeedbackModal />
            <Suspense fallback={<Skeleton className="size-7 rounded-full" />}>
              <UserNav user={user} />
            </Suspense>
          </>
        )}
      </div>
    </header>
  );
}
