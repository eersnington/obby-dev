import { useMemo } from 'react';
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

type DisplayModel = {
  id: string;
  label: string;
  provider?: ModelProvider;
  byokOnly?: boolean;
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

export function useAvailableModels() {
  const models = useMemo((): DisplayModel[] => {
    return ALL_MODELS.map((model) => ({
      id: model.id,
      label: model.name,
      provider: model.provider,
      byokOnly: model.byokOnly,
    }));
  }, []);

  return {
    models,
    isLoading: false,
    error: null,
  };
}
