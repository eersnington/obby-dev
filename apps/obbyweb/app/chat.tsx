'use client';

import { useChat } from '@ai-sdk/react';
import { MessageCircleIcon, SendIcon } from 'lucide-react';
import { createParser, useQueryState } from 'nuqs';
import { useEffect, useRef } from 'react';
import { MoonLoader } from 'react-spinners';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { DEFAULT_MODEL, SUPPORTED_MODELS, TEST_PROMPTS } from '@/ai/constants';
import { Message } from '@/components/chat/message';
import type { ChatUIMessage } from '@/components/chat/types';
import { ModelSelector } from '@/components/model-selector/model-selector';
import { Panel, PanelHeader } from '@/components/panels/panels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocalStorageValue } from '@/lib/use-local-storage-value';
import { useDataStateMapper } from './state';

interface Props {
  className: string;
  modelId?: string;
}

export function Chat({ className }: Props) {
  const [modelId, setModelId] = useQueryState('modelId', modelParser);
  const [input, setInput] = useLocalStorageValue('prompt-input');
  const mapDataToState = useDataStateMapper();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat<ChatUIMessage>({
    onToolCall: () => mutate('/api/auth/info'),
    onData: mapDataToState,
    onError: (error) => {
      toast.error(`Communication error with the AI: ${error.message}`);
      console.error('Error sending message:', error);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const validateAndSubmitMessage = (text: string) => {
    if (text.trim()) {
      sendMessage({ text }, { body: { modelId } });
      setInput('');
    }
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

      {/* Messages Area */}
      <div className="min-h-0 flex-1">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center font-mono text-muted-foreground text-sm">
            <p className="flex items-center font-semibold">
              Click and try one of these prompts:
            </p>
            <ul className="space-y-1 p-4 text-center">
              {TEST_PROMPTS.map((prompt, idx) => (
                <li
                  className="cursor-pointer rounded-sm border border-border border-dashed px-4 py-2 shadow-sm hover:bg-secondary/50 hover:text-primary"
                  key={idx}
                  onClick={() => validateAndSubmitMessage(prompt)}
                >
                  {prompt}
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
        onSubmit={async (event) => {
          event.preventDefault();
          validateAndSubmitMessage(input);
        }}
      >
        <ModelSelector
          modelId={modelId}
          onModelChange={(newModelId: string) => {
            setModelId(newModelId);
          }}
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
    </Panel>
  );
}

const modelParser = createParser({
  parse: (value) => (SUPPORTED_MODELS.includes(value) ? value : DEFAULT_MODEL),
  serialize: (value) => value,
}).withDefault(DEFAULT_MODEL);
