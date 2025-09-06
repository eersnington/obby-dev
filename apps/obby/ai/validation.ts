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

// keeping them optional avoids forcing clients to send them every time.
export const ToolOptionsSchema = z
  .object({
    webScrape: z.boolean().optional(),
    webSearch: z.boolean().optional(),
    context7: z.boolean().optional(),
  })
  .partial()
  .default({});

export const ChatBodySchema = z.object({
  messages: z.array(UIMessageSchema),
  modelId: z.string().optional(),
  provider: ModelProviderSchema.optional(),
  providerApiKey: ProviderKeyValueSchema.optional(),
  tools: ToolOptionsSchema.optional(),
});

export type ToolOptions = z.infer<typeof ToolOptionsSchema>;
export type ValidatedChatBody = z.infer<typeof ChatBodySchema>;
