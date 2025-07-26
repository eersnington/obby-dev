import type React from 'react';
import { ScrollArea } from 'components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = false,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-64px)]">
          <div className="h-[calc(100dvh-64px)] pt-4 pl-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="p-2">{children}</div>
      )}
    </>
  );
}
