// For client side usage
export interface ModelInfo {
  id: string;
  image?: string;
  name?: string;
  provider?: string;
  description?: string;
  baseURL?: string;
  capabilities?: {
    text: boolean;
    image: boolean;
    tools: boolean;
    reasoning: boolean;
  };
}

export const AI_MODELS: ModelInfo[] = [
  // ObbyLabs Models
  // {
  //   id: "obbylabs:agent-chat",
  //   image: "obbylabs.webp",
  //   name: "Agent Chat",
  //   provider: "obbylabs",
  //   description: "Advanced agent for complex conversations",
  //   capabilities: {
  //     text: true,
  //     image: true,
  //     tools: true,
  //     reasoning: true,
  //   },
  // },
  {
    id: 'obbylabs:fast-chat',
    image: 'obbylabs.webp',
    name: 'Fast Chat',
    provider: 'obbylabs',
    description: 'Quick responses for simple tasks',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: false,
    },
  },

  // OpenAI Models
  {
    id: 'openai:gpt-4.1',
    image: 'openai.svg',
    name: 'GPT-4.1',
    provider: 'openai',
    description: 'Latest GPT-4.1 model',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: true,
    },
  },
  {
    id: 'openai:gpt-4.1-mini',
    image: 'openai.svg',
    name: 'GPT-4.1 Mini',
    provider: 'openai',
    description: 'Smaller version of GPT-4.1',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: false,
    },
  },
  {
    id: 'openai:gpt-4o',
    image: 'openai.svg',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'Multimodal GPT-4o model',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: true,
    },
  },
  {
    id: 'openai:gpt-4o-mini',
    image: 'openai.svg',
    name: 'GPT-4o Mini',
    provider: 'openai',
    description: 'Fast and efficient GPT-4o',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: false,
    },
  },
  {
    id: 'openai:o3',
    image: 'openai.svg',
    name: 'o3',
    provider: 'openai',
    description: 'Advanced reasoning model',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: true,
    },
  },
  {
    id: 'openai:o4-mini',
    image: 'openai.svg',
    name: 'o4 Mini',
    provider: 'openai',
    description: 'Compact reasoning model',
    capabilities: {
      text: true,
      image: false,
      tools: true,
      reasoning: true,
    },
  },

  // Anthropic Models
  {
    id: 'anthropic:claude-sonnet-4',
    image: 'anthropic.svg',
    name: 'Claude Sonnet 4',
    provider: 'anthropic',
    description: 'Most capable Claude model',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: true,
    },
  },
  {
    id: 'anthropic:claude-3.7-sonnet',
    image: 'anthropic.svg',
    name: 'Claude 3.7 Sonnet',
    provider: 'anthropic',
    description: 'Advanced Claude 3.7 model',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: true,
    },
  },

  // Google Models
  {
    id: 'google:gemini-2.5-pro',
    image: 'google.svg',
    name: 'Gemini 2.5 Pro',
    provider: 'google',
    description: 'Advanced Gemini model',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: true,
    },
  },
  {
    id: 'google:gemini-2.5-flash',
    image: 'google.svg',
    name: 'Gemini 2.5 Flash',
    provider: 'google',
    description: 'Fast Gemini model',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: false,
    },
  },
  {
    id: 'google:gemini-2.0-flash',
    image: 'google.svg',
    name: 'Gemini 2.0 Flash',
    provider: 'google',
    description: 'Stable Gemini 2.0 model',
    capabilities: {
      text: true,
      image: true,
      tools: true,
      reasoning: true,
    },
  },
];

export function getModelInfo(modelId: string): ModelInfo | null {
  return AI_MODELS.find((model) => model.id === modelId) || null;
}

export function getAllModels(): ModelInfo[] {
  return AI_MODELS;
}

export function getModelsByProvider(provider: string): ModelInfo[] {
  return AI_MODELS.filter((model) => model.provider === provider);
}

export function isValidModelId(modelId: string): boolean {
  return AI_MODELS.some((model) => model.id === modelId);
}

export function getProviderFromModelId(modelId: string): string | null {
  const [provider] = modelId.split(':');

  if (!(provider && isValidModelId(modelId))) {
    return null;
  }

  return provider;
}

export function validateModelIdFormat(modelId: string): {
  isValid: boolean;
  provider: string | null;
  model: string | null;
  resolvedId: string;
} {
  const [provider, model] = modelId.split(':');

  const isValid = provider && model && isValidModelId(modelId);

  return {
    isValid: Boolean(isValid),
    provider: provider || null,
    model: model || null,
    resolvedId: modelId,
  };
}
