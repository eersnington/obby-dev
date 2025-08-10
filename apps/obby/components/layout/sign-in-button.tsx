import { getSignInUrl, signOut, withAuth } from '@repo/auth/server';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import { cn } from '@repo/design-system/lib/utils';
import Link from 'next/link';

export async function SignInButton({ large }: { large?: boolean }) {
  const { user } = await withAuth();
  const authorizationUrl = await getSignInUrl();

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
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
      variant={'default'}
    >
      <Link href={authorizationUrl}>{'Sign In'}</Link>
    </Button>
  );
}
