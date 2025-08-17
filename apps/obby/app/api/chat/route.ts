import { log } from '@repo/observability/log';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type LanguageModel,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai';
import { checkBotId } from 'botid/server';
import { NextResponse } from 'next/server';
import { DEFAULT_MODEL } from '@/ai/constants';
import { createModelFactory, type UserApiKeys } from '@/ai/factory';
import { getModelOptions } from '@/ai/gateway';
import { tools } from '@/ai/tools';
import prompt from './prompt.md';

type BodyData = {
  messages: UIMessage[];
  modelId?: string;
  userApiKeys?: UserApiKeys;
};

const STEP_COUNT = 20;

export async function POST(req: Request) {
  const checkResult = await checkBotId();
  if (checkResult.isBot) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 403 });
  }

  const {
    messages,
    modelId = DEFAULT_MODEL,
    userApiKeys,
  } = (await req.json()) as BodyData;

  try {
    const factory = createModelFactory({
      userKeys: userApiKeys,
      preferUserKeys: true,
    });

    const availableModels = factory.listAvailableModels();
    const model = availableModels.find((m) => m.id === modelId);

    if (!model) {
      return NextResponse.json(
        {
          error: `Model ${modelId} not found or not available with current API keys.`,
        },
        { status: 400 }
      );
    }

    const wrappedModel = factory.getModel(modelId) as LanguageModel;

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
            tools: tools({ modelId, writer }),
            onError: (error) => {
              log.error('Error communicating with AI');
              log.error(JSON.stringify(error, null, 2));
            },
          });
          result.consumeStream();
          writer.merge(
            result.toUIMessageStream({
              sendStart: false,
              messageMetadata: () => ({
                model: model.name,
              }),
            })
          );
        },
      }),
    });
  } catch (error) {
    log.error(
      'Error creating model factory or getting model:',
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
