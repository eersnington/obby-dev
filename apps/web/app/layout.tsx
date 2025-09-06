import "@/app/global.css";
import { Databuddy } from "@databuddy/sdk/react";
import { RootProvider } from "fumadocs-ui/provider";
import { Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html className={geistMono.className} lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <Databuddy
            clientId={process.env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID ?? ""}
            enableBatching
            trackErrors
            trackWebVitals
          />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
