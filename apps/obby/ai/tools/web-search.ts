import Firecrawl, {
  type SearchData,
  type SearchRequest,
  type SearchResultImages,
  type SearchResultWeb,
} from '@mendable/firecrawl-js';
import type { UIMessage, UIMessageStreamWriter } from 'ai';
import { tool } from 'ai';
import z from 'zod/v3';
import { env } from '@/env';
import { logger } from '@/lib/logger';
import type { DataPart } from '../messages/data-parts';
import description from './web-search.md';

type Params = {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

function handleSearchError(
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>,
  toolCallId: string,
  query: string,
  error: string
): string {
  logger.error('Web search failed', { query, error });

  writer.write({
    id: toolCallId,
    type: 'data-web-search',
    data: { query, status: 'error', error },
  });

  return `Failed to search for "${query}": ${error}`;
}

function handleSearchSuccess(
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>,
  toolCallId: string,
  query: string,
  results: SearchData | undefined
): string {
  if (!results) {
    return `No search results found for "${query}".`;
  }

  const webResults = results.web as SearchResultWeb[];
  const imagesResults = results.images as SearchResultImages[];

  logger.info('Web search successful', {
    query,
    webResults,
    imagesResults,
  });

  writer.write({
    id: toolCallId,
    type: 'data-web-search',
    data: {
      query,
      status: 'done',
      results: webResults,
      resultsCount: webResults?.length || 0,
    },
  });

  if (!webResults || webResults.length === 0) {
    return `No search results found for "${query}".`;
  }

  return `Found ${webResults.length} search results for "${query}":\n\n${webResults} \n\n${imagesResults}`;
}

export const webSearch = ({ writer }: Params) =>
  tool({
    description,
    inputSchema: z.object({
      query: z
        .string()
        .describe('The search query to find relevant web content'),
      categories: z
        .array(z.enum(['github']))
        .optional()
        .describe(
          'Search categories: "github" for GitHub repositories/code/issues or none for standard web search'
        ),
      sources: z
        .array(z.enum(['web', 'images']))
        .optional()
        .describe(
          'Result sources: "web" for standard web results, "images" for image search results'
        ),
    }),
    execute: async ({ query, categories, sources }, { toolCallId }) => {
      writer.write({
        id: toolCallId,
        type: 'data-web-search',
        data: { query, status: 'loading' },
      });

      logger.info('Starting web search', {
        query,
        toolCallId,
        categories,
        sources,
      });

      if (!env.FIRECRAWL_API_KEY) {
        const error =
          'FIRECRAWL_API_KEY is not configured. Please configure FIRECRAWL_API_KEY environment variable.';
        return handleSearchError(writer, toolCallId, query, error);
      }

      const firecrawl = new Firecrawl({ apiKey: env.FIRECRAWL_API_KEY });

      try {
        const searchOptions: SearchRequest = {
          query,
          categories,
          sources,
        };

        const results = await firecrawl.search(query, searchOptions);

        return handleSearchSuccess(writer, toolCallId, query, results);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        return handleSearchError(writer, toolCallId, query, errorMessage);
      }
    },
  });
