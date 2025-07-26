import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Obby',
  description:
    'Terms of Service for Obby. Read our terms and conditions for using our AI-powered development platform.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
