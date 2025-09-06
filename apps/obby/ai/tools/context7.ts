import type { UIMessage, UIMessageStreamWriter } from 'ai';
import { experimental_createMCPClient as createMCPClient, tool } from 'ai';
import { Experimental_StdioMCPTransport as StdioMCPTransport } from 'ai/mcp-stdio';
import z from 'zod/v3';
import { logger } from '@/lib/logger';
import type { DataPart } from '../messages/data-parts';
import description from './context7.md';

type Params = {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

const MAX_TOKENS = 20_000;

const schemas = {
  'resolve-library-id': {
    inputSchema: z.object({
      libraryName: z
        .string()
        .describe('The library name to resolve, e.g. "next.js" or "supabase"'),
    }),
  },
  'get-library-docs': {
    inputSchema: z.object({
      context7CompatibleLibraryID: z
        .string()
        .describe(
          'Exact Context7-compatible library ID, e.g. "/vercel/next.js" or "/vercel/next.js/v14.3.0"'
        ),
      tokens: z
        .number()
        .int()
        .positive()
        .max(MAX_TOKENS)
        .optional()
        .describe(
          'Max documentation tokens to retrieve (default defined by server)'
        ),
      topic: z
        .string()
        .optional()
        .describe(
          'Focus topic, e.g. "routing", "app router", "server actions"'
        ),
    }),
  },
} as const;

export const context7 = ({ writer }: Params) =>
  tool({
    description,
    inputSchema: z
      .object({
        libraryId: z
          .string()
          .optional()
          .describe(
            'Exact Context7 ID like "/org/project[/version]" if you already know it'
          ),
        name: z
          .string()
          .optional()
          .describe(
            'Library name to resolve, e.g. "next.js", "react", "supabase"'
          ),
        topic: z
          .string()
          .optional()
          .describe('Optional topic to focus docs on'),
        tokens: z
          .number()
          .int()
          .positive()
          .max(MAX_TOKENS)
          .optional()
          .describe('Max number of tokens to fetch from Context7'),
        command: z
          .string()
          .optional()
          .default('npx')
          .describe('Command used to spawn the MCP server (default: npx)'),
        args: z
          .array(z.string())
          .optional()
          .describe(
            'Arguments to pass to the command. Defaults to ["-y","@upstash/context7-mcp"]. If provided, used as-is.'
          ),
        apiKey: z
          .string()
          .optional()
          .describe(
            'Optional API key forwarded to the MCP server. If provided, it is appended as "--api-key <KEY>". Not required.'
          ),
      })
      .refine((v) => Boolean(v.libraryId) || Boolean(v.name), {
        message: 'Provide either "libraryId" or "name".',
        path: ['libraryId'],
      }),
    execute: async (input, { toolCallId }) => {
      const {
        libraryId: providedId,
        name,
        topic,
        tokens,
        command = 'npx',
        args: providedArgs,
        apiKey,
      } = input;

      writer.write({
        id: toolCallId,
        type: 'data-context7',
        data: {
          status: 'loading',
          query: name ?? providedId,
          libraryId: providedId,
          topic,
          tokens,
        },
      });

      const baseArgs = providedArgs ?? ['-y', '@upstash/context7-mcp'];
      const args =
        apiKey && !providedArgs ? [...baseArgs, '--api-key', apiKey] : baseArgs;

      logger.info('[context7] Spawning MCP server', { command, args });

      const transport = new StdioMCPTransport({
        command,
        args,
      });

      let mcpClient: Awaited<ReturnType<typeof createMCPClient>> | undefined;

      try {
        mcpClient = await createMCPClient({
          transport,
        });

        const mcpTools = await mcpClient.tools({
          schemas: {
            'resolve-library-id': schemas['resolve-library-id'],
            'get-library-docs': schemas['get-library-docs'],
          },
        });

        // Resolve library ID if needed
        let resolvedId = providedId;
        if (!resolvedId && name) {
          logger.info('[context7] Resolving library ID', { name });
          const resolver = mcpTools['resolve-library-id'];
          const resolution = await resolver.execute({ libraryName: name });

          // Accept a variety of potential return shapes
          if (typeof resolution === 'string') {
            // Try to extract an ID that looks like "/org/project" or "/org/project/version"
            const match =
              resolution.match(
                /\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)?/
              ) || [];
            resolvedId = match[0];
          } else if (resolution && typeof resolution === 'object') {
            const resObj = resolution as Record<string, unknown>;
            const maybeId =
              (typeof resObj.id === 'string' && resObj.id) ||
              (typeof resObj.libraryId === 'string' && resObj.libraryId) ||
              (typeof resObj.context7CompatibleLibraryID === 'string' &&
                resObj.context7CompatibleLibraryID);
            if (maybeId) {
              resolvedId = maybeId;
            }
          }

          if (!resolvedId) {
            const message = `Failed to resolve library ID from name "${name}".`;
            logger.error('[context7] Resolution failed', { name, resolution });
            writer.write({
              id: toolCallId,
              type: 'data-context7',
              data: {
                status: 'error',
                query: name,
                error: message,
              },
            });
            return message;
          }
        }

        logger.info('[context7] Fetching docs', {
          libraryId: resolvedId,
          topic,
          tokens,
        });
        const getDocs = mcpTools['get-library-docs'];
        const result = await getDocs.execute({
          context7CompatibleLibraryID: resolvedId as string,
          tokens,
          topic,
        });

        const resultString =
          typeof result === 'string' ? result : JSON.stringify(result, null, 2);

        writer.write({
          id: toolCallId,
          type: 'data-context7',
          data: {
            status: 'done',
            libraryId: resolvedId,
            topic,
            tokens,
            result: resultString,
          },
        });

        const length = resultString.length;
        return `Fetched Context7 docs for ${resolvedId}${
          topic ? ` (topic: ${topic})` : ''
        }. Content length: ${length}`;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error occurred';

        logger.error('[context7] Error', { error: message });

        writer.write({
          id: toolCallId,
          type: 'data-context7',
          data: {
            status: 'error',
            query: name ?? providedId,
            error: message,
          },
        });

        return `Failed to fetch Context7 documentation: ${message}`;
      } finally {
        try {
          await mcpClient?.close();
        } catch {
          // best-effort close
        }
      }
    },
  });
