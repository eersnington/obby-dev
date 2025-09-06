import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type LanguageModel,
  stepCountIs,
  streamText,
} from 'ai';
import { checkBotId } from 'botid/server';
import { NextResponse } from 'next/server';
import { DEFAULT_MODEL } from '@/ai/constants';
import { convertProviderKeyToUserKeys, createModelFactory } from '@/ai/factory';
import { getModelOptions } from '@/ai/gateway';
import { tools } from '@/ai/tools';
import { ChatBodySchema } from '@/ai/validation';
import { logger } from '@/lib/logger';
import prompt from './prompt.md';

const STEP_COUNT = 10;

export async function POST(req: Request) {
  const checkResult = await checkBotId();
  if (checkResult.isBot) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 403 });
  }

  const body = await req.json();

  const validation = ChatBodySchema.safeParse(body);
  if (!validation.success) {
    logger.info('[Chat] Invalid request body:', validation.error.format());
    return NextResponse.json(
      {
        error: 'Invalid request format',
        details: validation.error.format(),
      },
      { status: 400 }
    );
  }

  const {
    messages,
    modelId = DEFAULT_MODEL,
    provider,
    providerApiKey,
    tools: toolOptions,
  } = validation.data;

  try {
    const userApiKeys = convertProviderKeyToUserKeys(provider, providerApiKey);

    const factory = createModelFactory({
      userKeys: userApiKeys,
      preferUserKeys: true,
    });

    logger.info('[Chat] Checking model availability:', {
      modelId,
      provider,
    });

    if (!factory.isModelAvailable(modelId, provider)) {
      const availableModels = factory.listAvailableModels();
      logger.error(
        '[Chat] Available models:',
        availableModels.map((m) => m.id)
      );

      return NextResponse.json(
        {
          error: `Model ${modelId} not found or not available with current API keys.`,
        },
        { status: 400 }
      );
    }

    const availableModels = factory.listAvailableModels();
    const modelMeta = availableModels.find((m) => m.id === modelId);

    logger.info('[Chat] Using model:', modelMeta);
    logger.info('[Chat] Tool options provided:', toolOptions);

    const wrappedModel = factory.getModel(modelId, provider) as LanguageModel;

    return createUIMessageStreamResponse({
      stream: createUIMessageStream({
        originalMessages: messages,
        execute: ({ writer }) => {
          const result = streamText({
            ...getModelOptions(modelId),
            model: wrappedModel,
            system: prompt,
            messages: convertToModelMessages(messages),
            stopWhen: stepCountIs(STEP_COUNT),
            tools: tools({
              provider,
              modelId,
              writer,
              options: { tools: toolOptions },
            }),
            onError: (error) => {
              logger.error('[Chat] Error communicating with AI');
              logger.error(
                '[Chat] Error details:',
                JSON.stringify(error, null, 2)
              );
            },
          });
          result.consumeStream();
          writer.merge(
            result.toUIMessageStream({
              sendStart: false,
              sendReasoning: true,
              messageMetadata: () => ({
                model: modelMeta?.name || modelId,
              }),
            })
          );
        },
      }),
    });
  } catch (error) {
    logger.error(
      '[Chat] Error creating model factory or getting model:',
      error instanceof Error
        ? { error: error.message, stack: error.stack }
        : { error }
    );
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to initialize model',
      },
      { status: 500 }
    );
  }
}
