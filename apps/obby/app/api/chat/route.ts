import { log } from '@repo/observability/log';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai';
import { checkBotId } from 'botid/server';
import { NextResponse } from 'next/server';
import { DEFAULT_MODEL } from '@/ai/constants';
import { getAvailableModels, getModelOptions } from '@/ai/gateway';
import { tools } from '@/ai/tools';
import prompt from './prompt.md';

type BodyData = {
  messages: UIMessage[];
  modelId?: string;
};

const STEP_COUNT = 20;

export async function POST(req: Request) {
  const checkResult = await checkBotId();
  if (checkResult.isBot) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 403 });
  }

  const [models, { messages, modelId = DEFAULT_MODEL }] = await Promise.all([
    getAvailableModels(),
    req.json() as Promise<BodyData>,
  ]);

  const model = models.find((m) => m.id === modelId);
  if (!model) {
    return NextResponse.json(
      { error: `Model ${modelId} not found.` },
      { status: 400 }
    );
  }

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      originalMessages: messages,
      execute: ({ writer }) => {
        const result = streamText({
          ...getModelOptions(modelId),
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
}
