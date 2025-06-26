import { z } from 'zod';
import { type DataStreamWriter, streamObject, tool } from 'ai';
import { generateUUID } from '@/lib/utils';
import { obbyRegistry } from '../providers';
import { fetchQuery, fetchMutation } from 'convex/nextjs';
import type { User } from '@workos-inc/node';
import { api } from '@/convex/_generated/api';

type Suggestion = {
  originalText: string;
  suggestedText: string;
  description: string;
  isResolved: boolean;
  userId: User;
  documentId: string;
  suggestionId: string;
};

interface RequestSuggestionsProps {
  user: User;
  dataStream: DataStreamWriter;
}

export const requestSuggestions = ({
  user,
  dataStream,
}: RequestSuggestionsProps) =>
  tool({
    description: 'Request suggestions for a document',
    parameters: z.object({
      documentId: z
        .string()
        .describe('The ID of the document to request edits'),
    }),
    execute: async ({ documentId }) => {
      const document = await fetchQuery(api.documents.getDocumentById, {
        documentId: documentId,
      });

      if (!document || !document.content) {
        return {
          error: 'Document not found',
        };
      }

      const suggestions: Array<Omit<Suggestion, 'userId' | 'createdAt'>> = [];

      const { elementStream } = streamObject({
        model: obbyRegistry.languageModel('obbylabs:fast-chat'),
        system:
          'You are a help writing assistant. Given a piece of writing, please offer suggestions to improve the piece of writing and describe the change. It is very important for the edits to contain full sentences instead of just words. Max 5 suggestions.',
        prompt: document.content,
        output: 'array',
        schema: z.object({
          originalSentence: z.string().describe('The original sentence'),
          suggestedSentence: z.string().describe('The suggested sentence'),
          description: z.string().describe('The description of the suggestion'),
        }),
      });

      for await (const element of elementStream) {
        const suggestion = {
          originalText: element.originalSentence,
          suggestedText: element.suggestedSentence,
          description: element.description,
          isResolved: false,
          userId: user.id,
          documentId: documentId,
          suggestionId: generateUUID(),
        };

        dataStream.writeData({
          type: 'suggestion',
          content: suggestion,
        });

        suggestions.push(suggestion);
      }

      if (user) {
        await fetchMutation(api.suggestions.saveSuggestions, {
          suggestions: suggestions.map((suggestion) => ({
            ...suggestion,
            userId: user.id,
          })),
        });
      }

      return {
        documentId: documentId,
        title: document.title,
        kind: document.kind,
        message: 'Suggestions have been added to the document',
      };
    },
  });
