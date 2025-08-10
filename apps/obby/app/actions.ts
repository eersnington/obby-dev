'use server';

import ms from 'ms';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function hideBanner() {
  const store = await cookies();

  store.set('banner-hidden', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + ms('30d')),
    path: '/',
  });

  revalidatePath('/', 'layout');
}
