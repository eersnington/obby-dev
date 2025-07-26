'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function DashboardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgColor = mounted
    ? resolvedTheme === 'light'
      ? 'bg-white'
      : 'bg-transparent'
    : 'bg-transparent';

  return (
    <div
      className={`flex flex-1 flex-col items-stretch rounded-md border border-border p-4 ${bgColor}`}
    >
      {children}
    </div>
  );
}
