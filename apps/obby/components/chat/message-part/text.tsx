import { Response } from '@repo/design-system/components/ai-elements/response';
import type { TextUIPart } from 'ai';

export function Text({ part }: { part: TextUIPart }) {
  return (
    <div className="rounded-md border border-border bg-secondary/90 px-3.5 py-3 font-mono text-secondary-foreground text-sm">
      <Response>{part.text}</Response>
    </div>
  );
}
