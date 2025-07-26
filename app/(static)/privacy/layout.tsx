import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Obby',
  description:
    'Privacy Policy for Obby. Learn how we collect, use, and protect your personal information when using our AI-powered development platform.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
