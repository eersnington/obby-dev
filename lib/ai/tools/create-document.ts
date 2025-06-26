import { type DataStreamWriter, tool } from 'ai';
import { z } from 'zod';
import { generateUUID } from '@/lib/utils';
import {
  artifactKinds,
  documentHandlersByBlockKind,
} from '@/lib/artifacts/server';
import type { User } from '@workos-inc/node';

interface CreateDocumentProps {
  user: User;
  dataStream: DataStreamWriter;
  chatId: string;
}

export const createDocument = ({
  user,
  dataStream,
  chatId,
}: CreateDocumentProps) =>
  tool({
    description:
      'Create a document for a writing or content creation activities. This tool will call other functions that will generate the contents of the document based on the title and kind.',
    parameters: z.object({
      title: z.string(),
      kind: z.enum(artifactKinds),
    }),
    execute: async ({ title, kind }) => {
      const id = generateUUID();

      dataStream.writeData({
        type: 'kind',
        content: kind,
      });

      dataStream.writeData({
        type: 'id',
        content: id,
      });

      dataStream.writeData({
        type: 'title',
        content: title,
      });

      dataStream.writeData({
        type: 'clear',
        content: '',
      });

      const documentHandler = documentHandlersByBlockKind.find(
        (documentHandlerByBlockKind) =>
          documentHandlerByBlockKind.kind === kind,
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${kind}`);
      }

      await documentHandler.onCreateDocument({
        id,
        title,
        dataStream,
        user: user.id,
        chatId,
      });

      dataStream.writeData({ type: 'finish', content: '' });

      return {
        id,
        title,
        kind,
        content: 'A document was created and is now visible to the user.',
      };
    },
  });
