'use client';

import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center space-x-2 pl-4">
      <Image
        alt="Obby Logo"
        className="logo"
        height={28}
        src={'/logos/obby/obby-logo-min.webp'}
        width={28}
      />
      <span className="font-bold font-mono text-foreground text-xl md:text-2xl">
        Obby
      </span>
    </div>
  );
}
