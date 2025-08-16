import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';
import { createOpenAI } from '@ai-sdk/openai';
import { createVercel } from '@ai-sdk/vercel';
import {
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from 'ai';
import {
  ANTHROPIC_MODELS,
  BEDROCK_MODELS,
  GOOGLE_MODELS,
  GROQ_MODELS,
  type Model,
  type ModelProvider,
  OPENAI_MODELS,
  VERCEL_MODELS,
} from '@/ai/constants';
import { env } from '@/env';

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
  /** If true (default), prefer user-supplied keys over app keys when both are present. */
  preferUserKeys?: boolean;
  /** Fallback region for Bedrock if none is supplied. */
  defaultBedrockRegion?: string;
};

type ProviderClients = {
  openai: ReturnType<typeof createOpenAI>;
  anthropic: ReturnType<typeof createAnthropic>;
  google: ReturnType<typeof createGoogleGenerativeAI>;
  groq: ReturnType<typeof createGroq>;
  vercel: ReturnType<typeof createVercel>;
  bedrock: ReturnType<typeof createAmazonBedrock>;
};

// -----------------------------
// Model Registry
// -----------------------------

const ALL_MODELS: readonly Model[] = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...GOOGLE_MODELS,
  ...GROQ_MODELS,
  ...BEDROCK_MODELS,
  ...VERCEL_MODELS,
] as const;

function toKey(model: Model): string {
  return `${model.provider}/${model.id}`;
}

// -----------------------------
// Credentials resolution
// -----------------------------

function coalesce(
  userValue: string | undefined,
  appValue: string | undefined,
  preferUser: boolean
): string | undefined {
  return preferUser ? (userValue ?? appValue) : (appValue ?? userValue);
}

function getAppKeys() {
  return {
    openai: env.OPENAI_API_KEY ?? process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    google:
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GOOGLE_API_KEY,
    groq: process.env.GROQ_API_KEY,
    openrouter: process.env.OPENROUTER_API_KEY,
    vercel: process.env.VERCEL_API_KEY ?? process.env.VERCEL_AI_API_KEY,
    gateway: env.AI_GATEWAY_API_KEY ?? process.env.AI_GATEWAY_API_KEY,
    bedrock: {
      region: process.env.AMAZON_BEDROCK_REGION ?? process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    } as BedrockCredentials,
  } as const;
}

function createClients(options: CreateFactoryOptions): ProviderClients {
  const preferUser = options.preferUserKeys ?? true;
  const app = getAppKeys();
  const user = options.userKeys ?? {};

  const bedrockRegion =
    coalesce(user.bedrock?.region, app.bedrock.region, preferUser) ??
    options.defaultBedrockRegion ??
    'us-east-1';

  return {
    openai: createOpenAI({
      apiKey: coalesce(user.openai, app.openai, preferUser),
    }),
    anthropic: createAnthropic({
      apiKey: coalesce(user.anthropic, app.anthropic, preferUser),
    }),
    google: createGoogleGenerativeAI({
      apiKey: coalesce(user.google, app.google, preferUser),
    }),
    groq: createGroq({ apiKey: coalesce(user.groq, app.groq, preferUser) }),
    vercel: createVercel({
      apiKey: coalesce(user.vercel, app.vercel, preferUser),
    }),
    bedrock: createAmazonBedrock({
      region: bedrockRegion,
      accessKeyId: coalesce(
        user.bedrock?.accessKeyId,
        app.bedrock.accessKeyId,
        preferUser
      ),
      secretAccessKey: coalesce(
        user.bedrock?.secretAccessKey,
        app.bedrock.secretAccessKey,
        preferUser
      ),
      sessionToken: coalesce(
        user.bedrock?.sessionToken,
        app.bedrock.sessionToken,
        preferUser
      ),
    }),
  };
}

function hasUsableKey(
  provider: ModelProvider,
  byokOnly: boolean,
  userKeys: UserApiKeys | undefined,
  appKeys: ReturnType<typeof getAppKeys>
): boolean {
  const user = userKeys ?? {};
  if (provider === 'bedrock') {
    const creds = byokOnly ? user.bedrock : (user.bedrock ?? appKeys.bedrock);
    return Boolean(
      creds &&
        (creds.accessKeyId ?? appKeys.bedrock.accessKeyId) &&
        (creds.secretAccessKey ?? appKeys.bedrock.secretAccessKey)
    );
  }

  const key = (user as Record<string, unknown>)[provider];
  const app = (appKeys as Record<string, unknown>)[provider];
  return byokOnly ? Boolean(key) : Boolean(key ?? app);
}

function getLanguageModel(clients: ProviderClients, model: Model): unknown {
  const wrapLM = wrapLanguageModel as unknown as (arg: unknown) => unknown;
  const middleware = (
    defaultSettingsMiddleware as unknown as (arg: unknown) => unknown
  )({
    settings: {},
  });

  switch (model.provider) {
    case 'openai':
      return wrapLM({ model: clients.openai(model.id), middleware });
    case 'anthropic':
      return wrapLM({ model: clients.anthropic(model.id), middleware });
    case 'google':
      return wrapLM({ model: clients.google(model.id), middleware });
    case 'groq':
      return wrapLM({ model: clients.groq(model.id), middleware });
    case 'vercel':
      return wrapLM({ model: clients.vercel(model.id), middleware });
    case 'bedrock':
      return wrapLM({ model: clients.bedrock(model.id), middleware });
    default: {
      // openrouter/gateway are not part of the Model lists defined in constants
      throw new Error(`Unsupported provider: ${model.provider}`);
    }
  }
}

// -----------------------------
// Public Factory API
// -----------------------------

export function createModelFactory(options: CreateFactoryOptions = {}) {
  const clients = createClients(options);
  const appKeys = getAppKeys();

  function resolveModel(modelKeyValue: string): Model | undefined {
    return ALL_MODELS.find((m) => toKey(m) === modelKeyValue);
  }

  function isModelUsable(modelKeyId: string): boolean {
    const meta = resolveModel(modelKeyId);
    if (!meta) {
      return false;
    }
    return hasUsableKey(
      meta.provider as ModelProvider,
      meta.byokOnly,
      options.userKeys,
      appKeys
    );
  }

  function getWrappedModelInternal(targetModelKey: string): unknown {
    const modelResolved = resolveModel(targetModelKey);
    if (!modelResolved) {
      throw new Error(`Model ${targetModelKey} is not recognized.`);
    }
    if (
      !hasUsableKey(
        modelResolved.provider as ModelProvider,
        modelResolved.byokOnly,
        options.userKeys,
        appKeys
      )
    ) {
      const reason = modelResolved.byokOnly
        ? 'This model requires a user-provided API key.'
        : 'No usable API key found for this provider.';
      throw new Error(`Model ${targetModelKey} is not usable. ${reason}`);
    }
    return getLanguageModel(clients, modelResolved);
  }

  function listAvailableModels(): Array<{
    id: string;
    name: string;
    provider: ModelProvider;
    byokOnly: boolean;
  }> {
    return ALL_MODELS.filter((modelItem) =>
      hasUsableKey(
        modelItem.provider as ModelProvider,
        modelItem.byokOnly,
        options.userKeys,
        appKeys
      )
    ).map((modelItem) => ({
      id: toKey(modelItem),
      name: modelItem.name,
      provider: modelItem.provider as ModelProvider,
      byokOnly: modelItem.byokOnly,
    }));
  }

  function createCustomProviderInstance(): unknown {
    // Build languageModels map only for currently-usable models.
    const languageModels = Object.fromEntries(
      ALL_MODELS.filter((m) =>
        hasUsableKey(
          m.provider as ModelProvider,
          m.byokOnly,
          options.userKeys,
          appKeys
        )
      ).map((m) => [toKey(m), getLanguageModel(clients, m)])
    );

    // Note: We intentionally do not export the provider as a top-level constant to
    // avoid problematic type exposure. Consumers can call this function when needed.
    return (customProvider as unknown as (arg: unknown) => unknown)({
      languageModels: languageModels as unknown,
    });
  }

  return {
    // Function-level check for BYOK gating
    isModelUsable,
    // Returns a wrapped LanguageModelV1 for use with streamText
    getModel: getWrappedModelInternal,
    // Discovery helpers for UIs
    listAvailableModels,
    // Optional provider for areas that prefer provider("model") ergonomics
    createCustomProvider: createCustomProviderInstance,
  };
}

// Convenience helpers for simple scenarios
export function getWrappedModel(
  modelKey: string,
  options: CreateFactoryOptions = {}
) {
  return createModelFactory(options).getModel(modelKey);
}

export function getUsableModels(options: CreateFactoryOptions = {}) {
  return createModelFactory(options).listAvailableModels();
}
