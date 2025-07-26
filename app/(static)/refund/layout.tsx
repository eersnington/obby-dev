import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy - Obby',
  description:
    'Refund Policy for Obby. Learn about our refund conditions, free trial period, and cancellation process for our AI development platform.',
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
