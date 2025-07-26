import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';
import type { ReactNode } from 'react';

interface AuthKitProviderProps {
  children: ReactNode;
}
export function AuthKitProviderWrapper({ children }: AuthKitProviderProps) {
  return <AuthKitProvider>{children}</AuthKitProvider>;
}
