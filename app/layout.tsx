import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';

import { ThemeProvider } from 'components/providers/theme-provider';
import { ConvexClientProvider } from 'components/providers/convex-provider';
import { AuthKitProviderWrapper } from 'components/providers/authkit-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Obby – The AI Editor for the Web',
  description:
    'Obby is a developer-first web editor powered by AI. It helps you design, build, and ship real web apps from scratch.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthKitProviderWrapper>
            <ConvexClientProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
                enableSystem
              >
                {children}
              </ThemeProvider>
            </ConvexClientProvider>
          </AuthKitProviderWrapper>
        </body>
      </html>
    </>
  );
}
