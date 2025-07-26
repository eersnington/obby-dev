import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Obby',
  description:
    'Frequently Asked Questions about Obby. Find answers to common queries and learn more about our features.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
