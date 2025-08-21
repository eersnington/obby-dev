import { useQuery } from '@tanstack/react-query';
import type { ModelProvider } from '@/ai/constants';

type DisplayModel = {
  id: string;
  label: string;
  provider?: ModelProvider;
  byokOnly?: boolean;
};

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000; // 5 seconds
const STALE_TIME_MS = 30_000; // 5 minutes

async function fetchModels(): Promise<DisplayModel[]> {
  const response = await fetch('/api/models');
  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }
  const data = await response.json();

  return (
    data.models as Array<{
      id: string;
      name: string;
      provider?: ModelProvider;
      byokOnly?: boolean;
    }>
  ).map((model) => ({
    id: model.id,
    label: model.name,
    provider: model.provider,
    byokOnly: model.byokOnly,
  }));
}

export function useAvailableModels() {
  const {
    data: models = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['models'],
    queryFn: fetchModels,
    retry: MAX_RETRIES,
    retryDelay: RETRY_DELAY_MS,
    staleTime: STALE_TIME_MS,
  });

  return { models, isLoading, error };
}
