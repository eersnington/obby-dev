import type { UIMessage } from 'ai';
import { z } from 'zod';
import { type ModelProvider, PROVIDERS } from './constants';

export const ModelProviderSchema = z.enum(
  PROVIDERS as [ModelProvider, ...ModelProvider[]]
);

export const ProviderKeyValueSchema = z.union([
  z.string(),
  z.object({
    region: z.string(),
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
    sessionToken: z.string().optional(),
  }),
]);

export const UIMessageSchema = z.custom<UIMessage>();

export const ChatBodySchema = z.object({
  messages: z.array(UIMessageSchema),
  modelId: z.string().optional(),
  provider: ModelProviderSchema.optional(),
  providerApiKey: ProviderKeyValueSchema.optional(),
});

export type ValidatedChatBody = z.infer<typeof ChatBodySchema>;
