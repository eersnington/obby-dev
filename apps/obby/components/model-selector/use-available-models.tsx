import { useCallback, useEffect, useState } from 'react';
import type { ModelProvider } from '@/ai/constants';

interface DisplayModel {
  id: string;
  label: string;
  provider?: ModelProvider;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MILLIS = 5000;

export function useAvailableModels() {
  const [models, setModels] = useState<DisplayModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchModels = useCallback(
    async (isRetry = false) => {
      if (!isRetry) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await fetch('/api/models');
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const data = await response.json();
        // Use the models exactly as returned by the API without altering ids or providers
        const newModels: DisplayModel[] = (
          data.models as Array<{
            id: string;
            name: string;
            provider?: ModelProvider;
          }>
        ).map((model) => ({
          id: model.id,
          label: model.name,
          provider: model.provider,
        }));
        setModels(newModels);
        setError(null);
        setRetryCount(0);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch models')
        );
        if (retryCount < MAX_RETRIES) {
          setRetryCount((prev) => prev + 1);
          // keep loading true while retrying
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }
      }
    },
    [retryCount]
  );

  useEffect(() => {
    if (retryCount === 0) {
      fetchModels(false);
    } else if (retryCount > 0 && retryCount <= MAX_RETRIES) {
      const timerId = setTimeout(() => {
        fetchModels(true);
      }, RETRY_DELAY_MILLIS);
      return () => clearTimeout(timerId);
    }
  }, [retryCount, fetchModels]);

  return { models, isLoading, error };
}
