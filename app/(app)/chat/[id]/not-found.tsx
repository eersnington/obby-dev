import { LowProfileFooter } from "@/components/landing/low-profile-footer";

export default function Page() {
  return (
    <div className="bg-background h-full w-full p-3">
      <div className="flex flex-col bg-accent/30 border-2 border-accent h-full w-full rounded-lg shadow-sm">
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center space-y-6 mb-12 px-4">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                    <span className="block sm:inline">Chat not found</span>
                  </h1>
                  <p className="text-lg sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
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
