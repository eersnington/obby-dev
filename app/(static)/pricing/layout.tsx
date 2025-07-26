import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Obby',
  description:
    'Choose the perfect plan for your needs. Get started for free or upgrade for more features.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
