import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGatewayProvider } from '@ai-sdk/gateway';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';
import { createOpenAI } from '@ai-sdk/openai';
import { createVercel } from '@ai-sdk/vercel';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import {
  customProvider,
  defaultSettingsMiddleware,
  type LanguageModel,
  wrapLanguageModel,
} from 'ai';
import {
  ANTHROPIC_MODELS,
  BEDROCK_MODELS,
  GATEWAY_MODELS,
  GOOGLE_MODELS,
  GROQ_MODELS,
  type Model,
  type ModelProvider,
  OPENAI_MODELS,
  OPENROUTER_MODELS,
  VERCEL_MODELS,
} from '@/ai/constants';
import { env } from '@/env';
import type { ProviderKeyValue } from '@/stores/use-provider-store';

export type BedrockCredentials = {
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
};

export type UserApiKeys = {
  openai?: string;
  anthropic?: string;
  google?: string;
  groq?: string;
  openrouter?: string;
  vercel?: string;
  gateway?: string;
  bedrock?: BedrockCredentials;
};

export type CreateFactoryOptions = {
  userKeys?: UserApiKeys;
  preferUserKeys?: boolean;
  defaultBedrockRegion?: string;
};

const ALL_MODELS: readonly Model[] = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...GOOGLE_MODELS,
  ...GROQ_MODELS,
  ...BEDROCK_MODELS,
  ...VERCEL_MODELS,
  ...GATEWAY_MODELS,
  ...OPENROUTER_MODELS,
] as const;

function toKey(model: Model): string {
  return `${model.provider}/${model.id}`;
}

function getAppKeys() {
  return {
    openai: env.OPENAI_API_KEY,
    anthropic: env.ANTHROPIC_API_KEY,
    google: env.GOOGLE_GENERATIVE_AI_API_KEY,
    groq: env.GROQ_API_KEY,
    openrouter: env.OPENROUTER_API_KEY,
    vercel: env.VERCEL_API_KEY,
    gateway: env.AI_GATEWAY_API_KEY,
    bedrock: {
      region: env.AWS_REGION,
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    } as BedrockCredentials,
  } as const;
}

function normalizeUserKeys(
  providerKeyValue: ProviderKeyValue | undefined,
  provider: ModelProvider
): string | BedrockCredentials | null {
  if (!providerKeyValue) {
    return null;
  }

  if (provider === 'bedrock') {
    if (typeof providerKeyValue === 'object' && 'region' in providerKeyValue) {
      return providerKeyValue as BedrockCredentials;
    }
    return null;
  }

  return typeof providerKeyValue === 'string' ? providerKeyValue : null;
}

function resolveModel(
  modelId: string,
  provider?: ModelProvider
): Model | undefined {
  if (provider) {
    const compositeKey = `${provider}/${modelId}`;
    return ALL_MODELS.find((m) => toKey(m) === compositeKey);
  }

  return ALL_MODELS.find((m) => m.id === modelId || toKey(m) === modelId);
}

function validateBedrockAccess(
  model: Model,
  userCreds: BedrockCredentials | undefined,
  appCreds: BedrockCredentials
): { accessible: boolean; reason?: string } {
  if (model.byokOnly) {
    const hasUserCreds = userCreds?.accessKeyId && userCreds?.secretAccessKey;
    if (!hasUserCreds) {
      return {
        accessible: false,
        reason: `Model ${model.name} requires your own AWS credentials`,
      };
    }
    return { accessible: true };
  }

  const hasUserCreds = userCreds?.accessKeyId && userCreds?.secretAccessKey;
  const hasAppCreds = appCreds?.accessKeyId && appCreds?.secretAccessKey;
  const hasValidCreds = hasUserCreds || hasAppCreds;

  if (!hasValidCreds) {
    return {
      accessible: false,
      reason: `No valid AWS credentials available for ${model.provider}`,
    };
  }

  return { accessible: true };
}

function validateModelAccess(
  model: Model,
  userKeys: UserApiKeys,
  appKeys: ReturnType<typeof getAppKeys>
): { accessible: boolean; reason?: string } {
  const userKey = userKeys[model.provider as keyof UserApiKeys];
  const appKey = appKeys[model.provider as keyof typeof appKeys];

  if (model.provider === 'bedrock') {
    const userCreds = userKey as BedrockCredentials | undefined;
    const appCreds = appKey as BedrockCredentials;
    return validateBedrockAccess(model, userCreds, appCreds);
  }

  if (model.byokOnly) {
    if (!userKey) {
      return {
        accessible: false,
        reason: `Model ${model.name} requires your own API key for ${model.provider}`,
      };
    }
    return { accessible: true };
  }

  const hasAnyKey = Boolean(userKey) || Boolean(appKey);
  if (!hasAnyKey) {
    return {
      accessible: false,
      reason: `No API key available for ${model.provider}`,
    };
  }

  return { accessible: true };
}

type ProviderClient =
  | ReturnType<typeof createOpenAI>
  | ReturnType<typeof createAnthropic>
  | ReturnType<typeof createGoogleGenerativeAI>
  | ReturnType<typeof createGroq>
  | ReturnType<typeof createVercel>
  | ReturnType<typeof createAmazonBedrock>
  | ReturnType<typeof createGatewayProvider>
  | ReturnType<typeof createOpenRouter>;

type ClientConfig = {
  provider: ModelProvider;
  userKeys: UserApiKeys;
  appKeys: ReturnType<typeof getAppKeys>;
  preferUserKeys: boolean;
  defaultBedrockRegion?: string;
};

function createProviderClient(config: ClientConfig): ProviderClient | null {
  const { provider, userKeys, appKeys, preferUserKeys, defaultBedrockRegion } =
    config;
  const userKey = userKeys[provider as keyof UserApiKeys];
  const appKey = appKeys[provider as keyof typeof appKeys];

  if (provider === 'bedrock') {
    const userCreds = userKey as BedrockCredentials | undefined;
    const appCreds = appKey as BedrockCredentials;

    const creds = preferUserKeys
      ? (userCreds ?? appCreds)
      : (appCreds ?? userCreds);

    const hasValidCreds = creds?.accessKeyId && creds?.secretAccessKey;
    if (!hasValidCreds) {
      return null;
    }

    return createAmazonBedrock({
      region: creds.region ?? defaultBedrockRegion ?? 'us-east-1',
      accessKeyId: creds.accessKeyId,
      secretAccessKey: creds.secretAccessKey,
      sessionToken: creds.sessionToken,
    });
  }

  const keyToUse = preferUserKeys ? (userKey ?? appKey) : (appKey ?? userKey);
  if (!keyToUse || typeof keyToUse !== 'string') {
    return null;
  }

  switch (provider) {
    case 'openai':
      return createOpenAI({ apiKey: keyToUse });
    case 'anthropic':
      return createAnthropic({ apiKey: keyToUse });
    case 'google':
      return createGoogleGenerativeAI({ apiKey: keyToUse });
    case 'groq':
      return createGroq({ apiKey: keyToUse });
    case 'vercel':
      return createVercel({ apiKey: keyToUse });
    case 'gateway':
      return createGatewayProvider({ apiKey: keyToUse });
    case 'openrouter':
      return createOpenRouter({ apiKey: keyToUse });
    default:
      return null;
  }
}

function getWrappedModel(client: ProviderClient, model: Model): LanguageModel {
  const rawModel = client(model.id);
  const middleware = defaultSettingsMiddleware({
    settings: {},
  });

  return wrapLanguageModel({
    // biome-ignore lint/suspicious/noExplicitAny: AI SDK version compatibility
    model: rawModel as any,
    middleware: [middleware],
  }) as LanguageModel;
}

export function createModelFactory(options: CreateFactoryOptions = {}): {
  isModelAvailable: (modelId: string, provider?: ModelProvider) => boolean;
  getModel: (modelId: string, provider?: ModelProvider) => LanguageModel;
  listAvailableModels: () => Array<{
    id: string;
    name: string;
    provider: ModelProvider;
    byokOnly: boolean;
  }>;
  createCustomProvider: () => ReturnType<typeof customProvider>;
} {
  const appKeys = getAppKeys();
  const userKeys = options.userKeys ?? {};
  const preferUserKeys = options.preferUserKeys ?? true;

  const clientCache = new Map<ModelProvider, ProviderClient>();

  function getClient(provider: ModelProvider): ProviderClient | null {
    if (!clientCache.has(provider)) {
      const client = createProviderClient({
        provider,
        userKeys,
        appKeys,
        preferUserKeys,
        defaultBedrockRegion: options.defaultBedrockRegion,
      });
      if (client) {
        clientCache.set(provider, client);
      }
    }
    return clientCache.get(provider) ?? null;
  }

  function isModelAvailable(
    modelId: string,
    provider?: ModelProvider
  ): boolean {
    const model = resolveModel(modelId, provider);
    if (!model) {
      return false;
    }

    return validateModelAccess(model, userKeys, appKeys).accessible;
  }

  function getModel(modelId: string, provider?: ModelProvider): LanguageModel {
    const model = resolveModel(modelId, provider);
    if (!model) {
      throw new Error(
        `Model not found: ${modelId}${provider ? ` (provider: ${provider})` : ''}`
      );
    }

    const validation = validateModelAccess(model, userKeys, appKeys);
    if (!validation.accessible) {
      throw new Error(
        validation.reason || `Model ${modelId} is not accessible`
      );
    }

    const client = getClient(model.provider as ModelProvider);
    if (!client) {
      throw new Error(`No client available for provider: ${model.provider}`);
    }

    return getWrappedModel(client, model);
  }

  function listAvailableModels(): Array<{
    id: string;
    name: string;
    provider: ModelProvider;
    byokOnly: boolean;
  }> {
    return ALL_MODELS.filter(
      (model) => validateModelAccess(model, userKeys, appKeys).accessible
    ).map((model) => ({
      id: toKey(model),
      name: model.name,
      provider: model.provider as ModelProvider,
      byokOnly: model.byokOnly,
    }));
  }

  function createCustomProvider() {
    const languageModels = Object.fromEntries(
      ALL_MODELS.filter(
        (model) => validateModelAccess(model, userKeys, appKeys).accessible
      )
        .map((model) => {
          const client = getClient(model.provider as ModelProvider);
          if (!client) {
            return null;
          }

          return [toKey(model), getWrappedModel(client, model)];
        })
        .filter((entry): entry is [string, LanguageModel] => entry !== null)
    );

    return customProvider({
      // biome-ignore lint/suspicious/noExplicitAny: AI SDK version compatibility
      languageModels: languageModels as any,
    });
  }

  return {
    isModelAvailable,
    getModel,
    listAvailableModels,
    createCustomProvider,
  };
}

export function getWrappedModelByKey(
  modelKey: string,
  options: CreateFactoryOptions = {}
) {
  return createModelFactory(options).getModel(modelKey);
}

export function getUsableModels(options: CreateFactoryOptions = {}) {
  return createModelFactory(options).listAvailableModels();
}

export function convertProviderKeyToUserKeys(
  provider: string | undefined,
  providerApiKey: ProviderKeyValue | undefined
): UserApiKeys {
  if (!provider) {
    return {};
  }

  if (!providerApiKey) {
    return {};
  }

  const normalizedKey = normalizeUserKeys(
    providerApiKey,
    provider as ModelProvider
  );
  if (!normalizedKey) {
    return {};
  }

  return { [provider]: normalizedKey } as UserApiKeys;
}
