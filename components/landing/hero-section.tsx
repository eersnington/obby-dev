import Image from 'next/image';
import { AnnouncementBadge } from './announcement-badge';

export function HeroSection() {
  return (
    <div className="mb-12 space-y-6 px-4 text-center">
      <AnnouncementBadge />
      <div className="space-y-4">
        <h1 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="block sm:inline">Build something with</span>
          <span className="mt-2 inline-flex items-center justify-center gap-1 sm:mt-0 sm:ml-3 sm:gap-2">
            <Image
              alt="Obby Logo"
              className="inline-block"
              height={40}
              sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
              src="/logos/obby/obby-logo-min.webp"
              style={{
                width: 'clamp(40px, 8vw, 64px)',
                height: 'clamp(40px, 8vw, 64px)',
              }}
              width={40}
            />
            <span>Obby</span>
          </span>
        </h1>
        <p className="mx-auto max-w-2xl px-4 text-lg text-muted-foreground leading-relaxed sm:text-lg lg:text-xl">
          Open source v0 alternative. Create beautiful React components by
          simply describing what you want to build.
        </p>
      </div>
    </div>
  );
}
