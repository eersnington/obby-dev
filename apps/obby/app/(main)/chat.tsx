'use client';

import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@repo/design-system/components/ai-elements/conversation';
import {
  PromptInput,
  PromptInputTextarea,
} from '@repo/design-system/components/ai-elements/prompt-input';
import { Button } from '@repo/design-system/components/ui/button';
import { toast } from '@repo/design-system/sonner';
import { Effect } from 'effect';
import { MessageCircleIcon, SendIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { mutate } from 'swr';
import { DEFAULT_MODEL, TEST_PROMPTS } from '@/ai/constants';
import { Message } from '@/components/chat/message';
import type { ChatUIMessage } from '@/components/chat/types';
import { ModelSelector } from '@/components/model-selector/model-selector';
import { ModelSelectorModal } from '@/components/model-selector/model-selector-cmdk';
import { Panel, PanelHeader } from '@/components/panels/panels';
import { ToolOptionsPopover } from '@/components/tool-options/tool-options-popover';
import { useLocalStorageValue } from '@/lib/use-local-storage-value';
import { useModelStore } from '@/stores/use-model-store';
import { useProviderKeysStore } from '@/stores/use-provider-store';
import { useToolOptionsStore } from '@/stores/use-tool-options-store';
import { useDataStateMapper } from './state';

type Props = {
  className: string;
  modelId?: string;
};

export function Chat({ className }: Props) {
  const selectedModelId = useModelStore((s) => s.selectedModelId);
  const selectedProvider = useModelStore((s) => s.selectedProvider);
  const hasHydrated = useModelStore((s) => s._hasHydrated);
  const setModel = useModelStore((s) => s.setModel);
  const { getKey } = useProviderKeysStore();

  const toolsPayload = useToolOptionsStore((s) => s.getRequestTools());

  // Only use fallback after hydration to avoid mismatches
  const modelId = hasHydrated
    ? selectedModelId || DEFAULT_MODEL
    : DEFAULT_MODEL;
  const provider = selectedProvider;

  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [input, setInput] = useLocalStorageValue('prompt-input');
  const mapDataToState = useDataStateMapper();
  const _messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat<ChatUIMessage>({
    onToolCall: () => mutate('/api/auth/info'),
    onData: mapDataToState,
    onError: (error) => {
      toast.error(`Communication error with the AI: ${error.message}`);
      Effect.log('Error sending message:', error);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  // if (messages.length > 0) {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }

  const validateAndSubmitMessage = (text: string) => {
    if (!text.trim()) {
      return;
    }
    const providerApiKey = provider ? getKey(provider) : null;

    sendMessage(
      { text },
      {
        body: {
          modelId,
          // provider may be undefined; backend handles optional
          provider,
          providerApiKey,
          tools: toolsPayload, // only true flags included
        },
      }
    );
    setInput('');
  };

  return (
    <Panel className={className}>
      <PanelHeader>
        <div className="flex items-center font-mono font-semibold uppercase">
          <MessageCircleIcon className="mr-2 w-4" />
          Chat
        </div>
        <div className="ml-auto font-mono text-xs opacity-50">[{status}]</div>
      </PanelHeader>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center font-mono text-muted-foreground text-sm">
            <p className="flex items-center font-semibold">
              Click and try one of these prompts:
            </p>
            <ul className="space-y-1 p-4 text-center">
              {TEST_PROMPTS.map((p) => (
                <li key={p}>
                  <button
                    className="w-full cursor-pointer rounded-sm border border-border border-dashed px-4 py-2 text-left shadow-sm hover:bg-secondary/50 hover:text-primary"
                    onClick={() => validateAndSubmitMessage(p)}
                    type="button"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Conversation>
            <ConversationContent>
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {/*<div ref={messagesEndRef} />*/}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        )}
      </div>

      <div className="flex flex-col gap-y-1 border-primary/18 border-t bg-background p-2">
        <PromptInput
          className="relative rounded-none"
          onSubmit={(event) => {
            event.preventDefault();
            validateAndSubmitMessage(input);
          }}
        >
          <PromptInputTextarea
            className="w-full bg-background font-mono text-sm"
            disabled={status === 'streaming' || status === 'submitted'}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            value={input}
          />
        </PromptInput>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setModelModalOpen(true)}
              type="button"
              variant="outline"
            >
              Models
            </Button>
            <ModelSelector modelId={modelId} onModelChange={setModel} />
            <ToolOptionsPopover />
          </div>

          <Button disabled={status !== 'ready' || !input.trim()} type="submit">
            {status === 'streaming' || status === 'submitted' ? (
              <MoonLoader color="currentColor" size={16} />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <ModelSelectorModal
        onChange={setModel}
        onOpenChange={setModelModalOpen}
        open={modelModalOpen}
        value={modelId}
      />
    </Panel>
  );
}
