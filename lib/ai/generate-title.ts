import 'server-only';

import { generateText, type UIMessage } from 'ai';
import { obbyRegistry } from './providers';
import type { GoogleGenerativeAIProviderOptions } from '@ai-sdk/google';

export async function generateTitleFromUserMessage({
  message,
}: { message: UIMessage }) {
  const { text: title } = await generateText({
    model: obbyRegistry.languageModel('google:gemini-2.5-flash'),
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      } satisfies GoogleGenerativeAIProviderOptions,
    },
    system: `\n
      - You will generate a short title based on the first message a user begins a conversation with
      - Ensure it is not more than 80 characters long
      - The title should be a summary of the user's message
      - Do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}
