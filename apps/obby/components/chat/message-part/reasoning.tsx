import type { ReasoningUIPart } from 'ai';
import { MarkdownRenderer } from '@/components/markdown-renderer/markdown-renderer';
import { MessageSpinner } from '../message-spinner';

export function Reasoning({ part }: { part: ReasoningUIPart }) {
  if (part.state === 'done' && !part.text) {
    return null;
  }

  return (
    <div className="rounded-md border border-border bg-background px-3.5 py-3 text-sm">
      <div className="mb-1 font-mono text-secondary-foreground leading-normal">
        <MarkdownRenderer content={part.text || '_Thinking_'} />
        {part.state === 'streaming' && <MessageSpinner />}
      </div>
    </div>
  );
}
