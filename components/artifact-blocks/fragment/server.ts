import { streamObject } from 'ai';
import { obbylabs as myProvider } from '@/lib/ai/providers';
import { fragmentPrompt, updateFragmentPrompt } from '@/lib/ai/prompt';
import { createDocumentHandler } from '@/lib/artifacts/server';
import { fragmentSchema } from '@/lib/fragment';

export const fragmentDocumentHandler = createDocumentHandler<'fragment'>({
  kind: 'fragment',
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = '';

    const { fullStream } = streamObject({
      model: myProvider.languageModel('fragment-model'),
      system: fragmentPrompt,
      prompt: title,
      schema: fragmentSchema,
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'object') {
        const { object } = delta;

        // Stream the fragment data as it's being generated
        dataStream.writeData({
          type: 'fragment-delta',
          content: JSON.stringify(object),
        });

        // The final content will be the complete JSON of the fragment
        draftContent = JSON.stringify(object);
      }
    }

    return draftContent;
  },
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = '';

    const { fullStream } = streamObject({
      model: myProvider.languageModel('fragment-model'),
      system: updateFragmentPrompt(document.content, 'fragment'), // A new prompt for updates
      prompt: description,
      schema: fragmentSchema,
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'object') {
        const { object } = delta;

        dataStream.writeData({
          type: 'fragment-delta',
          content: JSON.stringify(object),
        });

        draftContent = JSON.stringify(object);
      }
    }

    return draftContent;
  },
});
