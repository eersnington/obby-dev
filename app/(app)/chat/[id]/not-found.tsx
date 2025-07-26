import { LowProfileFooter } from '@/components/landing/low-profile-footer';

export default function Page() {
  return (
    <div className="h-full w-full bg-background p-3">
      <div className="flex h-full w-full flex-col rounded-lg border-2 border-accent bg-accent/30 shadow-sm">
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 space-y-6 px-4 text-center">
                <div className="space-y-4">
                  <h1 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                    <span className="block sm:inline">Chat not found</span>
                  </h1>
                  <p className="mx-auto max-w-2xl px-4 text-lg text-muted-foreground leading-relaxed sm:text-lg lg:text-xl">
                    This chat doesn't exist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <LowProfileFooter />
      </div>
    </div>
  );
}
