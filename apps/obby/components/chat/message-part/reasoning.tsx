import {
  ReasoningContent,
  ReasoningTrigger,
  Reasoning as ReasoningWrapper,
} from '@repo/design-system/components/ai-elements/reasoning';
import type { ReasoningUIPart } from 'ai';
import { MessageSpinner } from '../message-spinner';

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
      <ReasoningContent>
        {part.text || '_Thinking_'}
        {part.state === 'streaming' && <MessageSpinner />}
      </ReasoningContent>
    </ReasoningWrapper>
  );
}
