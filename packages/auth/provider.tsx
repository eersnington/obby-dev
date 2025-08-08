import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';
import type { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthKitProvider>{children}</AuthKitProvider>;
}
