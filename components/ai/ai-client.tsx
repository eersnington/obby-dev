'use client';

import { AuthDialog } from './fragments/auth-dialog';
import { Chat } from './fragments/chat';
import { ChatInput } from './fragments/chat-input';
import { ChatPicker } from './fragments/chat-picker';
import { ChatSettings } from './fragments/chat-settings';
import { Preview } from './fragments/preview';
import { ChatManager, useChatContext } from './chat-manager';
import { useAIChat } from 'hooks/use-ai-chat';
import { type Message, toMessageImage } from 'lib/ai/messages';
import { AI_MODELS, type ModelInfo } from 'lib/ai/models';
import type { FragmentSchema } from 'lib/fragment';
import templates, { type TemplateId } from 'lib/templates';
import type { ExecutionResult } from 'lib/types';
import type { DeepPartial } from 'ai';
import type { Id } from '@/convex/_generated/dataModel';

import { type SetStateAction, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { generateTitleAction as generateTitleFromUserMessage } from '@/actions/generateTitle';

interface AIClientProps {
  chatId?: Id<'chats'>;
  initialChatData?: {
    _id: Id<'chats'>;
    _creationTime: number;
    userId: Id<'users'>;
    title: string;
    messages: Message[];
    fileData?: unknown;
    fragments?: DeepPartial<FragmentSchema>[];
    visibility: 'private' | 'public';
  };
  userID: string;
}

function AIClientInner({
  chatId,
  userID,
}: {
  chatId?: Id<'chats'>;
  userID: string;
}) {
  const [chatInput, setChatInput] = useLocalStorage('chat', '');
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<'auto' | TemplateId>(
    'auto',
  );
  const [languageModel, setLanguageModel] = useLocalStorage<ModelInfo>(
    'languageModel',
    {
      id: 'obbylabs:fast-chat',
    },
  );

  const [result, setResult] = useState<ExecutionResult>();
  const [fragment, setFragment] = useState<DeepPartial<FragmentSchema>>();
  const [currentTab, setCurrentTab] = useState<'code' | 'fragment'>('code');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isAuthDialogOpen, setAuthDialog] = useState(false);

  const { chatData, effectiveMessages, addMessageWithFragment } =
    useChatContext();
  const updateChatTitleMutation = useMutation(api.chats.updateChatTitle);

  // AI communication hook
  const {
    object,
    isLoading,
    error,
    isRateLimited,
    errorMessage,
    submitMessages,
    retry,
    stop,
    currentModel,
  } = useAIChat({
    languageModel,
    onFragmentGenerated: async (fragment) => {
      console.log('fragment', fragment);
      setIsPreviewLoading(true);

      // Create assistant message with fragment
      const assistantMessage: Message = {
        role: 'assistant' as const,
        content: [
          { type: 'text' as const, text: fragment.commentary || '' },
          { type: 'code' as const, text: fragment.code || '' },
        ],
        object: fragment,
      };

      // Save message and fragment to database atomically
      if (chatId) {
        try {
          await addMessageWithFragment(assistantMessage, fragment);
        } catch (error) {
          console.error('Failed to save message with fragment:', error);
        }
      }

      // Continue with sandbox creation
      try {
        const response = await fetch('/api/sandbox', {
          method: 'POST',
          body: JSON.stringify({
            fragment,
            userID,
          }),
        });

        if (!response.ok) {
          console.error('Sandbox creation failed:', response.status);
          setCurrentPreview({ fragment, result: undefined });
          setCurrentTab('fragment');
          setIsPreviewLoading(false);
          return;
        }

        const result = await response.json();
        console.log('result', result);

        setResult(result);
        setCurrentPreview({ fragment, result });
        setCurrentTab('fragment');
        setIsPreviewLoading(false);
      } catch (error) {
        console.error('Error creating sandbox:', error);
        setCurrentPreview({ fragment, result: undefined });
        setCurrentTab('fragment');
        setIsPreviewLoading(false);
      }
    },
  });

  // Update local fragment state when object changes (for UI display)
  useEffect(() => {
    if (object) {
      setFragment(object);
    }
  }, [object]);

  // Generate title when chat has "New Chat" as title and has messages
  useEffect(() => {
    if (
      chatId &&
      chatData?.title === 'New Chat' &&
      effectiveMessages.length > 0
    ) {
      const firstMessage = effectiveMessages[0];
      if (firstMessage.role === 'user' && firstMessage.content) {
        const textContent = firstMessage.content.find((c) => c.type === 'text');
        if (textContent?.text) {
          generateTitleFromUserMessage({ message: textContent.text })
            .then((title) => {
              updateChatTitleMutation({ id: chatId, title });
            })
            .catch((error) => {
              console.error('Failed to generate title:', error);
            });
        }
      }
    }
  }, [chatId, chatData?.title, effectiveMessages, updateChatTitleMutation]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (error) stop();
  }, [error]);

  async function handleSubmitAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userID) {
      return setAuthDialog(true);
    }

    if (isLoading) {
      stop();
    }

    const content: Message['content'] = [{ type: 'text', text: chatInput }];
    const images = await toMessageImage(files);

    if (images.length > 0) {
      for (const image of images) {
        content.push({ type: 'image', image });
      }
    }

    const newUserMessage: Message = {
      role: 'user' as const,
      content,
    };

    // Save user message to database if we have a chatId
    if (chatId) {
      try {
        await addMessageWithFragment(newUserMessage);
      } catch (error) {
        console.error('Failed to save user message:', error);
      }
    }

    // Submit to AI
    const updatedMessages = [...effectiveMessages, newUserMessage];
    if (userID) {
      submitMessages(updatedMessages, userID);
    }

    setChatInput('');
    setFiles([]);
    setCurrentTab('code');
  }

  function handleRetry() {
    if (userID) {
      retry(effectiveMessages, userID);
    }
  }

  function handleSaveInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setChatInput(e.target.value);
  }

  function handleFileChange(change: SetStateAction<File[]>) {
    setFiles(change);
  }

  function handleLanguageModelChange(e: ModelInfo) {
    setLanguageModel({ ...languageModel, ...e });
  }

  function setCurrentPreview(preview: {
    fragment: DeepPartial<FragmentSchema> | undefined;
    result: ExecutionResult | undefined;
  }) {
    setFragment(preview.fragment);
    setResult(preview.result);
  }

  return (
    <>
      <AuthDialog open={isAuthDialogOpen} setOpen={setAuthDialog} />
      <div className="grid h-full w-full md:grid-cols-2">
        <div
          className={`mx-auto flex max-h-full w-full max-w-[800px] flex-col overflow-auto px-4 ${fragment ? 'col-span-1' : 'col-span-2'}`}
        >
          <Chat
            isLoading={isLoading}
            messages={effectiveMessages}
            setCurrentPreview={setCurrentPreview}
          />
          <ChatInput
            errorMessage={errorMessage}
            files={files}
            handleFileChange={handleFileChange}
            handleInputChange={handleSaveInputChange}
            handleSubmit={handleSubmitAuth}
            input={chatInput}
            isErrored={error !== undefined}
            isLoading={isLoading}
            isMultiModal={currentModel?.capabilities?.image}
            isRateLimited={isRateLimited}
            retry={handleRetry}
            setInput={setChatInput}
            stop={stop}
          >
            <ChatPicker
              languageModel={languageModel}
              models={AI_MODELS}
              onLanguageModelChange={handleLanguageModelChange}
              onSelectedTemplateChange={setSelectedTemplate}
              selectedTemplate={selectedTemplate}
              templates={templates}
            />
            <ChatSettings
              apiKeyConfigurable={!process.env.NEXT_PUBLIC_NO_API_KEY_INPUT}
              baseURLConfigurable={!process.env.NEXT_PUBLIC_NO_BASE_URL_INPUT}
              languageModel={languageModel}
              onLanguageModelChange={handleLanguageModelChange}
            />
          </ChatInput>
        </div>
        <Preview
          accessToken={undefined}
          fragment={fragment}
          isChatLoading={isLoading}
          isPreviewLoading={isPreviewLoading}
          onClose={() => setFragment(undefined)}
          onSelectedTabChange={setCurrentTab}
          result={result as ExecutionResult}
          selectedTab={currentTab}
          teamID={undefined}
        />
      </div>
    </>
  );
}

export default function AIClient({
  chatId,
  initialChatData,
  userID,
}: AIClientProps) {
  return (
    <ChatManager chatId={chatId} initialChatData={initialChatData}>
      <AIClientInner chatId={chatId} userID={userID} />
    </ChatManager>
  );
}
