'use client';

import { UserNav } from '../layout/user-nav';
import { Logo } from '../logo';
import Link from 'next/link';
import FeedbackModal from '../app-layout/feedback-dialog';
import { ClientSignUpButton } from '../app-layout/client-sign-up-button';
import { ClientSignInButton } from '../app-layout/client-sign-in-button';
import { Skeleton } from '../ui/skeleton';
import type { User } from '@workos-inc/node';
import { useAuth } from '@workos-inc/authkit-nextjs/components';

interface ClientHeaderProps {
  user: User | null;
}

export function ClientHeader({ user: serverUser }: ClientHeaderProps) {
  const { user: clientUser, loading } = useAuth();
  const user = clientUser || serverUser;

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-none bg-background">
      <div className="flex w-full justify-between pt-2">
        <div className="flex items-center justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="pr-9">
          <div className="flex items-center gap-3">
            {loading ? (
              <Skeleton className="size-7 rounded-full" />
            ) : user ? (
              <>
                <Link
                  className="text-sm hover:underline"
                  href="/pricing"
                  prefetch
                >
                  Pricing
                </Link>
                <FeedbackModal />
                <UserNav user={user} />
              </>
            ) : (
              <>
                <Link
                  className="text-sm hover:underline"
                  href="/pricing"
                  prefetch
                >
                  Pricing
                </Link>
                <ClientSignUpButton />
                <ClientSignInButton />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
