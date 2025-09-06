import type { GatewayModelId } from '@ai-sdk/gateway';

export const DEFAULT_MODEL: GatewayModelId[number] = 'openai/gpt-5';

export const SUPPORTED_MODELS_GATEWAY: GatewayModelId[] = [
  'anthropic/claude-sonnet-4',
  'anthropic/claude-3.7-sonnet',
  'moonshotai/kimi-k2',
  'alibaba/qwen3-coder',
  'alibaba/qwen-3-235b',
  'openai/gpt-5',
  'openai/gpt-5-mini',
  'openai/gpt-5-nano',
  'openai/o4-mini',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'google/gemini-2.5-flash',
  'google/gemini-2.5-pro',
];

export const SUPPORTED_MODELS_OPENROUTER: GatewayModelId[] = [
  'anthropic/claude-sonnet-4',
  'anthropic/claude-3.7-sonnet',
  'moonshotai/kimi-k2',
  'qwen/qwen3-coder',
  'qwen/qwen3-235b-a22b-thinking-2507',
  'openai/gpt-5',
  'openai/gpt-5-mini',
  'openai/gpt-5-nano',
  'openai/o4-mini',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'google/gemini-2.5-flash',
  'google/gemini-2.5-pro',
];

export type ModelProvider =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'groq'
  | 'openrouter'
  | 'vercel'
  | 'gateway'
  | 'bedrock';

export type Model = {
  id: string;
  name: string;
  provider: ModelProvider;
  byokOnly: boolean;
  new: boolean;
};

// Provider metadata for UI and BYOK handling
export const PROVIDERS: ModelProvider[] = [
  'openai',
  'anthropic',
  'google',
  'groq',
  'openrouter',
  'vercel',
  'gateway',
  'bedrock',
];

export const PROVIDER_LOGOS: Record<ModelProvider, string> = {
  openai: '/providers/openai.svg',
  anthropic: '/providers/anthropic.svg',
  google: '/providers/gemini.svg',
  groq: '/providers/groq.svg',
  openrouter: '/providers/openrouter.svg',
  vercel: '/providers/v0.svg',
  gateway: '/providers/vercel.svg',
  bedrock: '/providers/aws.svg',
};

type PROVIDER_API_KEYS =
  | 'OPENAI_API_KEY'
  | 'ANTHROPIC_API_KEY'
  | 'GOOGLE_GENERATIVE_AI_API_KEY'
  | 'GROQ_API_KEY'
  | 'OPENROUTER_API_KEY'
  | 'VERCEL_API_KEY'
  | 'AI_GATEWAY_API_KEY';

type ProviderKeySchema =
  | { type: 'token'; placeholderEnv: PROVIDER_API_KEYS }
  | {
      type: 'aws';
      fields: [
        { name: 'region'; label: 'Region'; required: true },
        { name: 'accessKeyId'; label: 'Access Key ID'; required: true },
        { name: 'secretAccessKey'; label: 'Secret Access Key'; required: true },
        {
          name: 'sessionToken';
          label: 'Session Token (optional)';
          required: false;
        },
      ];
    };

export const PROVIDER_KEY_SCHEMAS: Record<ModelProvider, ProviderKeySchema> = {
  openai: { type: 'token', placeholderEnv: 'OPENAI_API_KEY' },
  anthropic: { type: 'token', placeholderEnv: 'ANTHROPIC_API_KEY' },
  google: { type: 'token', placeholderEnv: 'GOOGLE_GENERATIVE_AI_API_KEY' },
  groq: { type: 'token', placeholderEnv: 'GROQ_API_KEY' },
  openrouter: { type: 'token', placeholderEnv: 'OPENROUTER_API_KEY' },
  vercel: { type: 'token', placeholderEnv: 'VERCEL_API_KEY' },
  gateway: { type: 'token', placeholderEnv: 'AI_GATEWAY_API_KEY' },
  bedrock: {
    type: 'aws',
    fields: [
      { name: 'region', label: 'Region', required: true },
      { name: 'accessKeyId', label: 'Access Key ID', required: true },
      { name: 'secretAccessKey', label: 'Secret Access Key', required: true },
      {
        name: 'sessionToken',
        label: 'Session Token (optional)',
        required: false,
      },
    ],
  },
};

export const ANTHROPIC_MODELS: Model[] = [
  {
    id: 'claude-3-7-sonnet-20250219',
    name: 'Claude 3.7 Sonnet',
    provider: 'anthropic',
    byokOnly: true,
    new: false,
  },
  {
    id: 'claude-sonnet-4-20250514',
    name: 'Claude Sonnet 4',
    provider: 'anthropic',
    byokOnly: true,
    new: false,
  },
];

export const OPENAI_MODELS: Model[] = [
  {
    id: 'gpt-5',
    name: 'GPT-5',
    provider: 'openai',
    byokOnly: false,
    new: true,
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'openai',
    byokOnly: false,
    new: false,
  },
  {
    id: 'gpt-5-nano',
    name: 'GPT-5 Nano',
    provider: 'openai',
    byokOnly: false,
    new: false,
  },
  {
    id: 'o4-mini',
    name: 'O4 Mini',
    provider: 'openai',
    byokOnly: true,
    new: false,
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    provider: 'openai',
    byokOnly: true,
    new: false,
  },
];

export const GOOGLE_MODELS: Model[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'google',
    byokOnly: false,
    new: false,
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'google',
    byokOnly: false,
    new: false,
  },
];

export const GROQ_MODELS: Model[] = [
  {
    id: 'openai/gpt-oss-20b',
    name: 'GPT-OSS 20B',
    provider: 'groq',
    byokOnly: true,
    new: false,
  },
  {
    id: 'openai/gpt-oss-120b',
    name: 'GPT-OSS 120B',
    provider: 'groq',
    byokOnly: true,
    new: false,
  },
  {
    id: 'moonshotai/kimi-k2-instruct',
    name: 'Kimi K2 Instruct',
    provider: 'groq',
    byokOnly: true,
    new: false,
  },
  {
    id: 'deepseek-r1-distill-llama-70b',
    name: 'DeepSeek R1 Distill Llama 70B',
    provider: 'groq',
    byokOnly: true,
    new: false,
  },
  {
    id: 'meta-llama/llama-4-maverick-17b-128e-instruct',
    name: 'Llama 4 Maverick 17B 128E Instruct',
    provider: 'groq',
    byokOnly: true,
    new: false,
  },
  {
    id: 'meta-llama/llama-4-scout-17b-16e-instruct',
    name: 'Llama 4 Scout 17B 16E Instruct',
    provider: 'groq',
    byokOnly: true,
    new: false,
  },
];

export const BEDROCK_MODELS: Model[] = [
  {
    id: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    name: 'Claude 4 Sonnet',
    provider: 'bedrock',
    byokOnly: false,
    new: false,
  },
  {
    id: 'us.anthropic.claude-3-7-sonnet-20250219-v1:0',
    name: 'Claude 3.7 Sonnet',
    provider: 'bedrock',
    byokOnly: false,
    new: false,
  },
  {
    id: 'us.anthropic.claude-opus-4-1-20250805-v1:0',
    name: 'Claude Opus 4.1',
    provider: 'bedrock',
    byokOnly: true,
    new: false,
  },
];

export const VERCEL_MODELS: Model[] = [
  {
    id: 'v0-1.5-md',
    name: 'v0 1.5 md',
    provider: 'vercel',
    byokOnly: true,
    new: false,
  },
  {
    id: 'v0-1.5-lg',
    name: 'v0 1.5 lg',
    provider: 'vercel',
    byokOnly: true,
    new: false,
  },
];

export const GATEWAY_MODELS: Model[] = [
  {
    id: 'anthropic/claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
  {
    id: 'anthropic/claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
  {
    id: 'openai/gpt-5',
    name: 'GPT-5',
    provider: 'gateway',
    byokOnly: false,
    new: true,
  },
  {
    id: 'openai/gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
  {
    id: 'openai/gpt-5-nano',
    name: 'GPT-5 Nano',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
  {
    id: 'openai/o4-mini',
    name: 'O4 Mini',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
  {
    id: 'openai/gpt-oss-120b',
    name: 'GPT-OSS 120B',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
  {
    id: 'openai/gpt-oss-20b',
    name: 'GPT-OSS 20B',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
  {
    id: 'google/gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'gateway',
    byokOnly: false,
    new: false,
  },
];

export const OPENROUTER_MODELS: Model[] = [
  {
    id: 'anthropic/claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
  {
    id: 'anthropic/claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
  {
    id: 'openai/gpt-5',
    name: 'GPT-5',
    provider: 'openrouter',
    byokOnly: true,
    new: true,
  },
  {
    id: 'openai/gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
  {
    id: 'openai/gpt-5-nano',
    name: 'GPT-5 Nano',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
  {
    id: 'openai/o4-mini',
    name: 'O4 Mini',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
  {
    id: 'openai/gpt-oss-120b',
    name: 'GPT-OSS 120B',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
  {
    id: 'openai/gpt-oss-20b',
    name: 'GPT-OSS 20B',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
  {
    id: 'google/gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'openrouter',
    byokOnly: true,
    new: false,
  },
];

export const TEST_PROMPTS = [
  'Generate a Next.js app that allows to list and search Pokemons',
  'Create a `golang` server that responds with "Hello World" to any request',
];
