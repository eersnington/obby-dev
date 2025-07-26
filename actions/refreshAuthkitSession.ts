'use server';

import { refreshSession } from '@workos-inc/authkit-nextjs';

export async function refreshAuthkitSession() {
  const session = await refreshSession({ ensureSignedIn: true });
  return JSON.stringify(session);
}

export async function getEntitlements(accessToken?: string): Promise<string[]> {
  if (!accessToken) return [];

  try {
    const [, payload] = accessToken.split('.');
    const claims = JSON.parse(atob(payload));
    return claims.entitlements ? claims.entitlements : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
