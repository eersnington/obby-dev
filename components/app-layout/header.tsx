import { UserNav } from '../layout/user-nav';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { SignInButton } from 'components/app-layout/sign-in-button';
import { Logo } from '../logo';
import Link from 'next/link';
import FeedbackModal from './feedback-dialog';
import { SignUpButton } from './sign-up-button';
import { Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';

export async function Header() {
  const { user, role } = await withAuth();

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
            {!user && (
              <>
                <Link
                  className="text-sm hover:underline"
                  href="/pricing"
                  prefetch
                >
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
                <Suspense
                  fallback={<Skeleton className="size-7 rounded-full" />}
                >
                  <UserNav user={user} />
                </Suspense>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
