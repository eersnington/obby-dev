'use client';

import { Button } from 'components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import Link from 'next/link';
import { cn } from 'lib/utils';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import signOut from '@/actions/signOut';

export function ClientSignInButton({ large }: { large?: boolean }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Button
        className={cn(large ? 'h-10' : 'h-8', 'justify-center')}
        disabled
        variant="default"
      >
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <form action={signOut}>
          <Button className={cn(large ? 'h-10' : 'h-8')} type="submit">
            Sign Out
          </Button>
        </form>
        <a href="/dashboard">
          <Avatar className={large ? 'h-10 w-10' : 'h-8 w-8'}>
            <AvatarImage src={user.profilePictureUrl as string} />
            <AvatarFallback>{user.firstName?.[0] || ''}</AvatarFallback>
          </Avatar>
        </a>
      </div>
    );
  }

  return (
    <Button
      asChild
      className={cn(large ? 'h-10' : 'h-8', 'justify-center')}
      variant="default"
    >
      <Link href="/login">Sign In</Link>
    </Button>
  );
}
