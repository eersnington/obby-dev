'use server';

import { signOut } from '@repo/auth/server';

export default async function signOutAction() {
  await signOut();
}
