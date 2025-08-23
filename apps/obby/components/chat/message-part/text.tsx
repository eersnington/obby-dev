import type { TextUIPart } from 'ai';
import { MarkdownRenderer } from '@/components/markdown-renderer/markdown-renderer';

export function Text({ part }: { part: TextUIPart }) {
  return (
    <div className="rounded-md border border-border bg-secondary/90 px-3.5 py-3 font-mono text-secondary-foreground text-sm">
      <MarkdownRenderer content={part.text} />
    </div>
  );
}
