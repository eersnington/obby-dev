import { NextResponse } from 'next/server';
import {
  ANTHROPIC_MODELS,
  BEDROCK_MODELS,
  GOOGLE_MODELS,
  GROQ_MODELS,
  type Model,
  OPENAI_MODELS,
  SUPPORTED_MODELS_GATEWAY,
  SUPPORTED_MODELS_OPENROUTER,
  VERCEL_MODELS,
} from '@/ai/constants';
import { getAvailableModels } from '@/ai/gateway';

type OpenRouterRaw = Record<string, unknown>;

async function fetchOpenRouterModels(): Promise<Model[]> {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models');

    if (!res.ok) {
      return [];
    }

    const json = (await res.json()) as { data?: unknown };
    const data = Array.isArray(json?.data)
      ? (json.data as OpenRouterRaw[])
      : [];

    const mapped = data.map((m): Model | null => {
      const idCandidate = m?.id as string | undefined;

      if (!idCandidate) {
        return null;
      }

      const isSupported = SUPPORTED_MODELS_OPENROUTER.some(
        (id) => id === idCandidate
      );

      if (!isSupported) {
        return null;
      }

      return {
        id: idCandidate,
        name: (m?.name as string) ?? idCandidate,
        provider: 'openrouter',
        byokOnly: false,
        new: false,
      };
    });

    return mapped.filter((x): x is Model => x !== null);
  } catch {
    return [];
  }
}

async function fetchGatewayModels(): Promise<Model[]> {
  const response = await getAvailableModels();
  return response
    .filter((m) => SUPPORTED_MODELS_GATEWAY.some((id) => id === m.id))
    .map(({ id, name }) => ({
      id,
      name,
      provider: 'gateway',
      byokOnly: true,
      new: false,
    }));
}

export async function GET() {
  const [openrouterResult, gatewayResult] = await Promise.allSettled([
    fetchOpenRouterModels(),
    fetchGatewayModels(),
  ]);

  const openrouter =
    openrouterResult.status === 'fulfilled' ? openrouterResult.value : [];
  const gateway =
    gatewayResult.status === 'fulfilled' ? gatewayResult.value : [];

  const models: Model[] = [
    ...OPENAI_MODELS,
    ...ANTHROPIC_MODELS,
    ...GOOGLE_MODELS,
    ...GROQ_MODELS,
    ...BEDROCK_MODELS,
    ...VERCEL_MODELS,
    ...openrouter,
    ...gateway,
  ];

  return NextResponse.json({ models });
}
