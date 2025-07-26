'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { type Message, toAISDKMessages } from 'lib/ai/messages';
import { fragmentSchema as schema } from 'lib/fragment';
import { AI_MODELS, type ModelInfo } from 'lib/ai/models';
import type { DeepPartial } from 'ai';
import type { FragmentSchema } from 'lib/fragment';
import { useState, useCallback } from 'react';

interface UseAIChatProps {
  languageModel: ModelInfo;
  onFragmentGenerated?: (fragment: DeepPartial<FragmentSchema>) => void;
  onError?: (error: Error) => void;
}

export function useAIChat({
  languageModel,
  onFragmentGenerated,
  onError,
}: UseAIChatProps) {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentModel = AI_MODELS.find((model) => model.id === languageModel.id);

  const { object, submit, isLoading, stop, error } = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      console.error('Error submitting request:', error);
      if (error.message.includes('limit')) {
        setIsRateLimited(true);
      }
      setErrorMessage(error.message);
      onError?.(error);
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error && fragment) {
        console.log('fragment', fragment);
        onFragmentGenerated?.(fragment);
      }
    },
  });

  const submitMessages = useCallback(
    (messages: Message[], userID: string) => {
      if (!currentModel?.id) {
        console.error('No model selected');
        return;
      }

      setIsRateLimited(false);
      setErrorMessage('');

      submit({
        userID,
        teamID: 'none',
        messages: toAISDKMessages(messages),
        model: currentModel.id,
        config: languageModel,
      });
    },
    [submit, currentModel, languageModel],
  );

  const retry = useCallback(
    (messages: Message[], userID: string) => {
      submitMessages(messages, userID);
    },
    [submitMessages],
  );

  return {
    // AI state
    object,
    isLoading,
    error,
    isRateLimited,
    errorMessage,

    // Actions
    submitMessages,
    retry,
    stop,

    // Model info
    currentModel,
  };
}
