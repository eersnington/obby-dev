'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from 'components/ui/button';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import { Skeleton } from '../ui/skeleton';

import Link from 'next/link';

export function AnnouncementBadge() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mb-8 flex justify-center">
        <Skeleton className="h-9 w-68 rounded-full" />
      </div>
    );
  }

  return (
    <div className="mb-8 flex justify-center">
      {user ? (
        // For authenticated users - no link, just the badge
        <Button
          className="h-auto overflow-hidden rounded-full border-0 bg-transparent p-0 hover:bg-accent"
          variant="outline"
        >
          <div className="flex items-center">
            {/* New badge with animated gradient border */}
            <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
              <span
                className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"
                style={{
                  background:
                    'conic-gradient(from 90deg at 50% 50%, var(--obby-purple) 0%, var(--obby-violet) 25%, var(--obby-pink) 50%, var(--obby-orange) 75%, var(--obby-purple) 100%)',
                }}
              />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-accent px-3 py-1 font-medium text-foreground text-xs backdrop-blur-3xl">
                New
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 text-foreground text-sm">
              New users get
              <span className="font-semibold text-emerald-500">
                10 messages a day
              </span>
            </div>
          </div>
        </Button>
      ) : (
        // For non-authenticated users - keep the original with link
        <Button
          asChild
          className="h-auto overflow-hidden rounded-full border-0 bg-transparent p-0 hover:bg-accent"
          variant="outline"
        >
          <Link href={'/login'}>
            <div className="flex items-center">
              {/* New badge with animated gradient border */}
              <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
                <span
                  className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"
                  style={{
                    background:
                      'conic-gradient(from 90deg at 50% 50%, var(--obby-purple) 0%, var(--obby-violet) 25%, var(--obby-pink) 50%, var(--obby-orange) 75%, var(--obby-purple) 100%)',
                  }}
                />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-accent px-3 py-1 font-medium text-foreground text-xs backdrop-blur-3xl">
                  New
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-foreground text-sm">
                Sign ups
                <span className="font-semibold text-emerald-500">
                  open now!
                </span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </Button>
      )}
    </div>
  );
}
