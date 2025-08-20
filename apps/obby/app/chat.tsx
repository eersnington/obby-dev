'use client';

import { useChat } from '@ai-sdk/react';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { toast } from '@repo/design-system/sonner';
import { log } from '@repo/observability/log';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import { useLocalStorageValue } from '@/lib/use-local-storage-value';
import { useModelStore } from '@/stores/use-model-store';
import { useProviderKeysStore } from '@/stores/use-provider-store';
import { useDataStateMapper } from './state';

type Props = {
  className: string;
  modelId?: string;
};

const STALE_TIME_MS = 60_000; // 1 minute
const GC_TIME_MS = 300_000; // 5 minutes

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      gcTime: GC_TIME_MS,
    },
  },
});

export function Chat({ className }: Props) {
  const { selectedModelId, selectedProvider, setModel } = useModelStore();
  const { getKey } = useProviderKeysStore();

  const modelId = selectedModelId || DEFAULT_MODEL;
  const provider = selectedProvider;

  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [input, setInput] = useLocalStorageValue('prompt-input');
  const mapDataToState = useDataStateMapper();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat<ChatUIMessage>({
    onToolCall: () => mutate('/api/auth/info'),
    onData: mapDataToState,
    onError: (error) => {
      toast.error(`Communication error with the AI: ${error.message}`);
      log.error('Error sending message:', error);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  if (messages.length > 0) {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const validateAndSubmitMessage = (text: string) => {
    if (text.trim()) {
      const providerApiKey = provider ? getKey(provider) : null;
      sendMessage({ text }, { body: { modelId, provider, providerApiKey } });
      setInput('');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Panel className={className}>
        <PanelHeader>
          <div className="flex items-center font-mono font-semibold uppercase">
            <MessageCircleIcon className="mr-2 w-4" />
            Chat
          </div>
          <div className="ml-auto font-mono text-xs opacity-50">[{status}]</div>
        </PanelHeader>

        {/* Messages Area */}
        <div className="min-h-0 flex-1">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center font-mono text-muted-foreground text-sm">
              <p className="flex items-center font-semibold">
                Click and try one of these prompts:
              </p>
              <ul className="space-y-1 p-4 text-center">
                {TEST_PROMPTS.map((prompt) => (
                  <li key={prompt}>
                    <button
                      className="w-full cursor-pointer rounded-sm border border-border border-dashed px-4 py-2 text-left shadow-sm hover:bg-secondary/50 hover:text-primary"
                      onClick={() => validateAndSubmitMessage(prompt)}
                      type="button"
                    >
                      {prompt}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="space-y-4 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Message key={message.id} message={message} />
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}
        </div>

        <form
          className="flex items-center space-x-1 border-primary/18 border-t bg-background p-2"
          onSubmit={(event) => {
            event.preventDefault();
            validateAndSubmitMessage(input);
          }}
        >
          <Button
            onClick={() => setModelModalOpen(true)}
            type="button"
            variant="outline"
          >
            Models
          </Button>
          <ModelSelector
            modelId={modelId}
            onModelChange={setModel}
          />
          <Input
            className="w-full rounded-sm border-0 bg-background font-mono text-sm"
            disabled={status === 'streaming' || status === 'submitted'}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            value={input}
          />
          <Button disabled={status !== 'ready' || !input.trim()} type="submit">
            {status === 'streaming' || status === 'submitted' ? (
              <MoonLoader color="currentColor" size={16} />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </form>
        <ModelSelectorModal
          onChange={setModel}
          onOpenChange={setModelModalOpen}
          open={modelModalOpen}
          value={modelId}
        />
      </Panel>
    </QueryClientProvider>
  );
}
