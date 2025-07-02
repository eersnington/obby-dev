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
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-none">
      <div className="flex w-full justify-between pt-2">
        <div className="justify-center flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="pr-9">
          <div className="flex gap-3 items-center">
            {loading ? (
              <Skeleton className="size-7 rounded-full" />
            ) : !user ? (
              <>
                <Link
                  prefetch
                  href="/pricing"
                  className="text-sm hover:underline"
                >
                  Pricing
                </Link>
                <ClientSignUpButton />
                <ClientSignInButton />
              </>
            ) : (
              <>
                <Link
                  prefetch
                  href="/pricing"
                  className="text-sm hover:underline"
                >
                  Pricing
                </Link>
                <FeedbackModal />
                <UserNav user={user} />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
