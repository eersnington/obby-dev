import {
  ReasoningContent,
  ReasoningTrigger,
  Reasoning as ReasoningWrapper,
} from '@repo/design-system/components/ai-elements/reasoning';
import type { ReasoningUIPart } from 'ai';

export function Reasoning({ part }: { part: ReasoningUIPart }) {
  if (part.state === 'done' && !part.text) {
    return null;
  }

  return (
    <ReasoningWrapper
      className="w-full"
      isStreaming={part.state === 'streaming'}
    >
      <ReasoningTrigger />
      <ReasoningContent>{part.text || '_Thinking_'}</ReasoningContent>
    </ReasoningWrapper>
  );
}
