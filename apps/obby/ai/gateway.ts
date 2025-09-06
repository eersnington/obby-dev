import type { OpenAIResponsesProviderOptions } from '@ai-sdk/openai';
import type { JSONValue } from 'ai';
import { logger } from '@/lib/logger';

type ModelOptions = {
  model: string;
  providerOptions?: Record<string, Record<string, JSONValue>>;
  headers?: Record<string, string>;
};

export function getModelOptions(modelId: string): ModelOptions {
  logger.info('getModelOptions', { modelId });

  if (modelId === 'gemini-2.5-flash') {
    return {
      model: modelId,
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 2048,
            includeThoughts: true,
          },
        },
      },
    };
  }

  if (modelId === 'gemini-2.5-pro') {
    return {
      model: modelId,
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 2048,
            includeThoughts: true,
          },
        },
      },
    };
  }

  if (modelId === 'openai/o4-mini' || modelId === 'o4-mini') {
    return {
      model: modelId,
      providerOptions: {
        openai: {
          reasoningEffort: 'low',
          reasoningSummary: 'detailed',
        } satisfies OpenAIResponsesProviderOptions,
      },
    };
  }

  if (modelId === 'openai/gpt-5' || modelId === 'gpt-5') {
    return {
      model: modelId,
      providerOptions: {
        openai: {
          include: ['reasoning.encrypted_content'],
          reasoningEffort: 'low',
          reasoningSummary: 'detailed',
        } satisfies OpenAIResponsesProviderOptions,
      },
    };
  }

  if (
    modelId === 'anthropic/claude-4-sonnet' ||
    modelId === 'claude-sonnet-4-20250514' ||
    modelId === 'us.anthropic.claude-sonnet-4-20250514-v1:0'
  ) {
    return {
      model: modelId,
      headers: { 'anthropic-beta': 'fine-grained-tool-streaming-2025-05-14' },
      providerOptions: {
        // gateway: { order: ["bedrock", "vertex"] },
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
    };
  }

  if (
    modelId === 'anthropic/claude-3.7-sonnet' ||
    modelId === 'claude-3-7-sonnet-20250219' ||
    modelId === 'us.anthropic.claude-3-7-sonnet-20250219-v1:0'
  ) {
    return {
      model: modelId,
      headers: { 'anthropic-beta': 'fine-grained-tool-streaming-2025-05-14' },
      providerOptions: {
        // gateway: { order: ["bedrock", "vertex"] },
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
    };
  }

  return {
    model: modelId,
  };
}
