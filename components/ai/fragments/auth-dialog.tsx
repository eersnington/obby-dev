'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'components/ui/dialog';
import { ClientSignInButton } from '@/components/app-layout/client-sign-in-button';
import { ClientSignUpButton } from '@/components/app-layout/client-sign-up-button';
import Image from 'next/image';

export function AuthDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen(open: boolean): void;
}) {
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogTitle className="flex flex-col items-center justify-center gap-x-2 rounded-md p-2 text-2xl shadow-md">
          <Image
            alt={'Obby Logo'}
            height={64}
            src="/logos/obby/obby-logo-min.webp"
            width={64}
          />
          Sign in to Obby
        </DialogTitle>
        <DialogDescription className="flex items-center justify-center p-2 text-md">
          To use Obby, create an account or log into an existing one.
        </DialogDescription>
        <ClientSignUpButton large />
        <ClientSignInButton large />
      </DialogContent>
    </Dialog>
  );
}
