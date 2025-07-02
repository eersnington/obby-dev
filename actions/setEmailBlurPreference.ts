'use server';

import { cookies } from 'next/headers';

export async function setEmailBlurPreference(blurred: boolean) {
  const cookieStore = await cookies();

  cookieStore.set('emailBlurred', blurred.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getEmailBlurPreference(): Promise<boolean> {
  const cookieStore = await cookies();
  const preference = cookieStore.get('emailBlurred');
  return preference?.value === 'true';
}
