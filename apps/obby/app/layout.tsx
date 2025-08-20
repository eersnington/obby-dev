import { DesignSystemProvider } from '@repo/design-system';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';
import { SandboxState } from '@/components/modals/sandbox-state';

import './styles.css';


export const metadata: Metadata = {
  title: 'Obby - OSS v0',
  description: 'Open Source v0 alternative. Prompt to build your Next.js app.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <DesignSystemProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
          <SandboxState />
        </DesignSystemProvider>
        <Toolbar />
      </body>
    </html>
  );
}
