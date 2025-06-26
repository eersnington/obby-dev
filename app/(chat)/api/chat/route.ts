import {
  type UIMessage,
  appendResponseMessages,
  appendClientMessage,
  createDataStream,
  smoothStream,
  streamText,
} from 'ai';

import { generateTitleFromUserMessage } from '@/lib/ai/generate-title';
import { systemPrompt } from '@/lib/ai/prompt';
import { openai } from '@ai-sdk/openai';

import {
  generateUUID,
  getTrailingMessageId,
  convertToUIMessages,
} from '@/lib/utils';

import { createDocument } from '@/lib/ai/tools/create-document';
import { updateDocument } from '@/lib/ai/tools/update-document';
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions';

import { fetchQuery, fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from 'resumable-stream';
import { after } from 'next/server';
import { getModelFromRegistry, obbyRegistry } from '@/lib/ai/providers';
import { withAuth } from '@workos-inc/authkit-nextjs';

export const maxDuration = 90;

let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('REDIS_URL')) {
        console.log(
          ' > Resumable streams are disabled due to missing REDIS_URL',
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

export async function POST(request: Request) {
  console.log('[api/chat POST] Received request');
  const {
    id,
    message: userMessage,
    selectedChatModel,
    data,
  }: {
    id: string;
    message: UIMessage;
    selectedChatModel: string;
    data?: { useWebSearch?: boolean };
  } = await request.json();
  console.log(
    '[api/chat POST] Request body parsed.',
    'ChatId:',
    id,
    'UserMessage:',
    JSON.stringify(userMessage),
    'SelectedChatModel:',
    selectedChatModel,
    'Data object:',
    data,
    'useWebSearch value:',
    data?.useWebSearch,
  );

  const { user, sessionId } = await withAuth();

  console.log('[api/chat POST] User:', user);

  if (!user || !sessionId) {
    console.error('[api/chat POST] Unauthorized: No user found.');
    return new Response('Unauthorized', { status: 401 });
  }

  console.log('[api/chat POST] User authenticated:', user.id);

  if (!userMessage || !userMessage.content) {
    console.error(
      '[api/chat POST] Bad Request: User message or content missing.',
    );
    return new Response('User message or message content is missing', {
      status: 400,
    });
  }

  const chat = await fetchQuery(api.chats.getChatById, { id });
  if (!chat) {
    console.log(
      '[api/chat POST] No existing chat found. Generating title and saving new chat.',
    );
    const title = await generateTitleFromUserMessage({ message: userMessage });
    console.log('[api/chat POST] Title generated:', title);
    await fetchMutation(api.chats.saveChat, {
      title,
      chatId: id,
      userId: user.id,
      visibility: 'private',
    });

    console.log('[api/chat POST] New chat saved.');
  } else {
    console.log('[api/chat POST] Existing chat found.');
  }

  console.log('[api/chat POST] Saving user message to DB...');
  await fetchMutation(api.messages.saveMessages, {
    messages: [
      {
        messageId: userMessage.id,
        chatId: id,
        role: 'user',
        parts: userMessage.parts,
        attachments: userMessage.experimental_attachments
          ?.filter(
            (att) => att.name !== undefined && att.contentType !== undefined,
          )
          .map((att) => ({
            ...att,
            name: att.name ?? '',
            contentType: att.contentType ?? '',
          })),
      },
    ],
  });
  console.log(
    '[api/chat POST] User message saved. Fetching previous messages...',
  );

  const dbMessages = await fetchQuery(api.messages.getMessagesByChatId, {
    chatId: id,
  });

  const previousMessages = convertToUIMessages(dbMessages);
  console.log(
    '[api/chat POST] Previous messages fetched. Count:',
    previousMessages.length,
  );

  const allMessages = appendClientMessage({
    messages: previousMessages.filter((m) => m.id !== userMessage.id),
    message: userMessage,
  });

  console.log(
    '[api/chat POST] All messages for AI (excluding potential duplicate of current user message):',
    allMessages,
  );

  const streamId = generateUUID();
  await fetchMutation(api.streams.createStreamId, { streamId, chatId: id });
  console.log('[api/chat POST] Stream ID created and saved:', streamId);

  const stream = createDataStream({
    execute: (dataStream) => {
      console.log('[api/chat POST execute] Stream execution started.');
      const result = streamText({
        model: obbyRegistry.languageModel('obbylabs:agent-chat'),
        system: systemPrompt({ selectedChatModel }),
        messages: allMessages,
        maxSteps: 5,
        experimental_activeTools:
          selectedChatModel === 'chat-model-reasoning'
            ? []
            : [
                'createDocument',
                'updateDocument',
                'requestSuggestions',
                ...(data?.useWebSearch ? ['webSearch' as const] : []),
              ],
        experimental_transform: smoothStream({ chunking: 'word' }),
        experimental_generateMessageId: generateUUID,
        experimental_telemetry: { isEnabled: true, functionId: 'stream-text' },
        tools: {
          createDocument: createDocument({ user, dataStream, chatId: id }),
          updateDocument: updateDocument({ user, dataStream, chatId: id }),
          requestSuggestions: requestSuggestions({ user, dataStream }),
          ...(data?.useWebSearch
            ? { webSearch: openai.tools.webSearchPreview() }
            : {}),
        },
        onFinish: async ({ response }) => {
          console.log(
            '[api/chat POST onFinish] Stream finished. Response:',
            JSON.stringify(response),
          );

          if (user) {
            try {
              const assistantId = getTrailingMessageId({
                messages: response.messages.filter(
                  (message) => message.role === 'assistant',
                ),
              });

              if (!assistantId) {
                console.error(
                  '[api/chat POST onFinish] No assistant message found in response!',
                );
                throw new Error('No assistant message found!');
              }

              const [, assistantMessage] = appendResponseMessages({
                messages: [userMessage],
                responseMessages: response.messages,
              });
              console.log(
                '[api/chat POST onFinish] Saving assistant message to DB:',
                JSON.stringify(assistantMessage),
              );
              await fetchMutation(api.messages.saveMessages, {
                messages: [
                  {
                    messageId: assistantId,
                    chatId: id,
                    role: assistantMessage.role as 'user' | 'assistant',
                    parts: assistantMessage.parts as UIMessage['parts'],
                    attachments: assistantMessage.experimental_attachments
                      ?.filter(
                        (att) =>
                          att.name !== undefined &&
                          att.contentType !== undefined,
                      )
                      .map((att) => ({
                        ...att,
                        name: att.name ?? '',
                        contentType: att.contentType ?? '',
                      })),
                  },
                ],
              });
              console.log('[api/chat POST onFinish] Assistant message saved.');
            } catch (dbError) {
              console.error(
                '[api/chat POST onFinish] Error saving assistant message:',
                dbError,
              );
            }
          }
        },
      });
      console.log(
        '[api/chat POST execute] streamText configured. Consuming and merging stream...',
      );
      result.consumeStream();
      result.mergeIntoDataStream(dataStream, { sendReasoning: true });
      console.log(
        '[api/chat POST execute] Stream processing started via mergeIntoDataStream.',
      );
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error(
        '[api/chat POST createDataStream onError] Error occurred:',
        errorMessage,
        error,
      );
      return `Oops, an error occurred during streaming: ${errorMessage}`;
    },
  });

  const streamContext = getStreamContext();

  if (streamContext) {
    console.log('[api/chat POST] Returning resumable stream response.');
    return new Response(
      await streamContext.resumableStream(streamId, () => stream),
    );
  } else {
    console.log(
      '[api/chat POST] Returning direct stream response (resumable context not available).',
    );
    return new Response(stream);
  }
}

export async function GET(request: Request) {
  const streamContext = getStreamContext();

  if (!streamContext) {
    return new Response(null, { status: 204 });
  }

  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return new Response('id is required', { status: 400 });
  }

  const { user, sessionId } = await withAuth();

  if (!user || !sessionId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await fetchQuery(api.chats.getChatById, { id: chatId });

    if (!chat) {
      return new Response('Not found', { status: 404 });
    }

    if (chat.visibility === 'private' && chat.userId !== user.id) {
      return new Response('Forbidden', { status: 403 });
    }

    const streamIds = await fetchQuery(api.streams.getStreamIdsByChatId, {
      chatId,
    });

    if (!streamIds.length) {
      return new Response('No streams found', { status: 404 });
    }

    const recentStreamId = streamIds.at(-1);

    if (!recentStreamId) {
      return new Response('No recent stream found', { status: 404 });
    }

    const emptyDataStream = createDataStream({
      execute: () => {},
    });

    return new Response(
      await streamContext.resumableStream(
        recentStreamId,
        () => emptyDataStream,
      ),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('[api/chat GET] Error:', error);
    return new Response('An error occurred while processing your request', {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const { user, sessionId } = await withAuth();

  if (!user || !sessionId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await fetchQuery(api.chats.getChatById, { id });
    if (!chat || chat.userId !== user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    await fetchMutation(api.chats.deleteChatById, { id });
    return new Response('Chat deleted', { status: 200 });
  } catch {
    return new Response('An error occurred while processing your request', {
      status: 500,
    });
  }
}
