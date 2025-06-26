import { type DataStreamWriter, tool } from 'ai';
import { z } from 'zod';
import { documentHandlersByBlockKind } from '@/lib/artifacts/server';
import { fetchQuery } from 'convex/nextjs';
import type { User } from '@workos-inc/node';
import { api } from '@/convex/_generated/api';

interface UpdateDocumentProps {
  user: User;
  dataStream: DataStreamWriter;
  chatId: string;
}

export const updateDocument = ({
  user,
  dataStream,
  chatId,
}: UpdateDocumentProps) =>
  tool({
    description: 'Update a document with the given description.',
    parameters: z.object({
      id: z.string().describe('The ID of the document to update'),
      description: z
        .string()
        .describe('The description of changes that need to be made'),
    }),
    execute: async ({ id, description }) => {
      const document = await fetchQuery(api.documents.getDocumentById, {
        documentId: id,
      });

      if (!document) {
        return {
          error: 'Document not found',
        };
      }

      dataStream.writeData({
        type: 'clear',
        content: document.title,
      });

      const documentHandler = documentHandlersByBlockKind.find(
        (documentHandlerByBlockKind) =>
          documentHandlerByBlockKind.kind === document.kind,
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${document.kind}`);
      }

      await documentHandler.onUpdateDocument({
        document,
        description,
        dataStream,
        user: user.id,
        chatId,
      });

      dataStream.writeData({ type: 'finish', content: '' });

      return {
        id,
        title: document.title,
        kind: document.kind,
        content: 'The document has been updated successfully.',
      };
    },
  });
