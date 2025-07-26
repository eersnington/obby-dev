'use client';

import type { UIMessage } from 'ai';
import cx from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { memo, useState } from 'react';
import { DocumentToolCall, DocumentToolResult } from './document';
import { Markdown } from './markdown';
import { MessageActions } from './message-actions';
import { PreviewAttachment } from './preview-attachment';
import equal from 'fast-deep-equal';
import { cn, sanitizeText } from '@/lib/utils';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { MessageEditor } from './message-editor';
import { DocumentPreview } from './document-preview';
import { MessageReasoning } from './message-reasoning';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { Doc } from '@/convex/_generated/dataModel';
import { PencilLine, Sparkles } from 'lucide-react';

type Vote = Doc<'votes'>;

const PurePreviewMessage = ({
  chatId,
  message,
  vote,
  isLoading,
  setMessages,
  reload,
  isReadonly,
  requiresScrollPadding,
}: {
  chatId: string;
  message: UIMessage;
  vote: Vote | undefined;
  isLoading: boolean;
  setMessages: UseChatHelpers['setMessages'];
  reload: UseChatHelpers['reload'];
  isReadonly: boolean;
  requiresScrollPadding: boolean;
}) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  return (
    <AnimatePresence>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="group/message mx-auto w-full max-w-3xl px-4"
        data-role={message.role}
        data-testid={`message-${message.role}`}
        initial={{ y: 5, opacity: 0 }}
      >
        <div
          className={cn(
            'flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl',
            {
              'w-full': mode === 'edit',
              'group-data-[role=user]/message:w-fit': mode !== 'edit',
            },
          )}
        >
          {message.role === 'assistant' && (
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
              <div className="translate-y-px">
                <Sparkles size={14} />
              </div>
            </div>
          )}

          <div
            className={cn('flex w-full flex-col gap-4', {
              'min-h-96': message.role === 'assistant' && requiresScrollPadding,
            })}
          >
            {message.experimental_attachments &&
              message.experimental_attachments.length > 0 && (
                <div
                  className="flex flex-row justify-end gap-2"
                  data-testid={`message-attachments`}
                >
                  {message.experimental_attachments.map((attachment) => (
                    <PreviewAttachment
                      attachment={attachment}
                      key={attachment.url}
                    />
                  ))}
                </div>
              )}

            {message.parts?.map((part, index) => {
              const { type } = part;
              const key = `message-${message.id}-part-${index}`;

              console.log('Reasoning part:', part);

              if (type === 'reasoning') {
                return (
                  <MessageReasoning
                    isLoading={isLoading}
                    key={key}
                    reasoning={part.reasoning}
                  />
                );
              }

              if (type === 'text') {
                if (mode === 'view') {
                  return (
                    <div className="flex flex-row items-start gap-2" key={key}>
                      {message.role === 'user' && !isReadonly && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="h-fit rounded-full px-2 text-muted-foreground opacity-0 group-hover/message:opacity-100"
                              data-testid="message-edit-button"
                              onClick={() => {
                                setMode('edit');
                              }}
                              variant="ghost"
                            >
                              <PencilLine />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit message</TooltipContent>
                        </Tooltip>
                      )}

                      <div
                        className={cn('flex flex-col gap-4', {
                          'rounded-xl bg-primary px-3 py-2 text-primary-foreground':
                            message.role === 'user',
                        })}
                        data-testid="message-content"
                      >
                        <Markdown>{sanitizeText(part.text)}</Markdown>
                      </div>
                    </div>
                  );
                }

                if (mode === 'edit') {
                  return (
                    <div className="flex flex-row items-start gap-2" key={key}>
                      <div className="size-8" />

                      <MessageEditor
                        key={message.id}
                        message={message}
                        reload={reload}
                        setMessages={setMessages}
                        setMode={setMode}
                      />
                    </div>
                  );
                }
              }

              if (type === 'tool-invocation') {
                const { toolInvocation } = part;
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === 'call') {
                  const { args } = toolInvocation;

                  return (
                    <div
                      className={cx({
                        skeleton: ['getWeather'].includes(toolName),
                      })}
                      key={toolCallId}
                    >
                      {toolName === 'createDocument' ? (
                        <DocumentPreview args={args} isReadonly={isReadonly} />
                      ) : toolName === 'updateDocument' ? (
                        <DocumentToolCall
                          args={args}
                          isReadonly={isReadonly}
                          type="update"
                        />
                      ) : toolName === 'requestSuggestions' ? (
                        <DocumentToolCall
                          args={args}
                          isReadonly={isReadonly}
                          type="request-suggestions"
                        />
                      ) : null}
                    </div>
                  );
                }

                if (state === 'result') {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === 'createDocument' ? (
                        <DocumentPreview
                          isReadonly={isReadonly}
                          result={result}
                        />
                      ) : toolName === 'updateDocument' ? (
                        <DocumentToolResult
                          isReadonly={isReadonly}
                          result={result}
                          type="update"
                        />
                      ) : toolName === 'requestSuggestions' ? (
                        <DocumentToolResult
                          isReadonly={isReadonly}
                          result={result}
                          type="request-suggestions"
                        />
                      ) : (
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                      )}
                    </div>
                  );
                }
              }
            })}

            {!isReadonly && (
              <MessageActions
                chatId={chatId}
                isLoading={isLoading}
                key={`action-${message.id}`}
                message={message}
                vote={vote}
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.message.id !== nextProps.message.id) return false;
    if (prevProps.requiresScrollPadding !== nextProps.requiresScrollPadding)
      return false;
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;
    if (!equal(prevProps.vote, nextProps.vote)) return false;

    return true;
  },
);

export const ThinkingMessage = () => {
  const role = 'assistant';

  return (
    <motion.div
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      className="group/message mx-auto min-h-96 w-full max-w-3xl px-4"
      data-role={role}
      data-testid="message-assistant-loading"
      initial={{ y: 5, opacity: 0 }}
    >
      <div
        className={cx(
          'flex w-full gap-4 rounded-xl group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-3 group-data-[role=user]/message:py-2',
          {
            'group-data-[role=user]/message:bg-muted': true,
          },
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-border">
          <Sparkles size={14} />
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Hmm...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
