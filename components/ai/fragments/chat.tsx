import type { Message } from 'lib/ai/messages';
import type { FragmentSchema } from 'lib/fragment';
import type { ExecutionResult } from 'lib/types';
import type { DeepPartial } from 'ai';
import { LoaderIcon, Terminal } from 'lucide-react';
import { useEffect } from 'react';
import { generateArrayKey } from 'lib/utils/array-utils';

export function Chat({
  messages,
  isLoading,
  setCurrentPreview,
}: {
  messages: Message[];
  isLoading: boolean;
  setCurrentPreview: (preview: {
    fragment: DeepPartial<FragmentSchema> | undefined;
    result: ExecutionResult | undefined;
  }) => void;
}) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: change only when there's new msg
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [JSON.stringify(messages)]);

  return (
    <div
      className="my-4 flex max-h-full flex-col gap-2 overflow-y-auto pb-12"
      id="chat-container"
    >
      {messages.map((message: Message, index: number) => (
        <div
          className={`flex flex-col whitespace-pre-wrap px-4 shadow-sm ${message.role !== 'user' ? 'w-full gap-4 rounded-2xl border bg-accent py-4 text-accent-foreground dark:bg-white/5 dark:text-muted-foreground' : 'w-fit gap-2 rounded-xl bg-gradient-to-b from-black/5 to-black/10 py-2 dark:from-black/30 dark:to-black/50'} font-serif`}
          key={generateArrayKey(index)}
        >
          {message.content.map((content, id) => {
            if (content.type === 'text') {
              return content.text;
            }
            if (content.type === 'image') {
              return (
                <img
                  alt="fragment"
                  className="mr-2 mb-2 inline-block h-12 w-12 rounded-lg bg-white object-cover"
                  key={generateArrayKey(id)}
                  src={content.image}
                />
              );
            }
          })}
          {message.object && (
            <div
              className="flex w-full select-none items-center rounded-xl border py-2 pl-2 hover:cursor-pointer hover:bg-white md:w-max dark:hover:bg-white/5"
              onClick={() =>
                setCurrentPreview({
                  fragment: message.object,
                  result: message.result,
                })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setCurrentPreview({
                    fragment: message.object,
                    result: message.result,
                  });
                }
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center self-stretch rounded-[0.5rem] bg-black/5 dark:bg-white/5">
                <Terminal className="text-[#b300ff]" strokeWidth={2} />
              </div>
              <div className="flex flex-col pr-4 pl-2">
                <span className="font-bold font-sans text-primary text-sm">
                  {message.object.title}
                </span>
                <span className="font-sans text-muted-foreground text-sm">
                  Click to see fragment
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <LoaderIcon className="h-4 w-4 animate-spin" strokeWidth={2} />
          <span>Generating...</span>
        </div>
      )}
    </div>
  );
}
