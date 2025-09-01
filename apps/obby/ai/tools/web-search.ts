import type { UIMessage, UIMessageStreamWriter } from 'ai';
import { tool } from 'ai';
import { Effect } from 'effect';
import z from 'zod/v3';
import { env } from '@/env';
import type { DataPart } from '../messages/data-parts';
import description from './web-search.md';

const MAX_RESULTS = 20;
const RESULT_ITEM_REGEX = /^\[(\d+)\]\s+(\w+.*?):\s*(.+)$/;
const TITLE_MAX_LENGTH = 50;
const SUMMARY_MAX_RESULTS = 5;

type SearchResult = {
  title: string;
  url: string;
  description: string;
  date?: string;
  rank: number;
};

type Params = {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

function addResultToArray(
  results: SearchResult[],
  currentResult: Partial<SearchResult>,
  rank: number
): void {
  if (currentResult.title && currentResult.url) {
    results.push({
      title: currentResult.title,
      url: currentResult.url,
      description: currentResult.description || '',
      date: currentResult.date,
      rank,
    });
  }
}

function processResultField(
  currentResult: Partial<SearchResult>,
  field: string,
  value: string
): void {
  const fieldLower = field.toLowerCase();
  if (fieldLower === 'title') {
    currentResult.title = value;
  } else if (fieldLower === 'url source') {
    currentResult.url = value;
  } else if (fieldLower === 'description') {
    currentResult.description = value;
  } else if (fieldLower === 'date') {
    currentResult.date = value;
  }
}

function parseSearchResults(text: string): SearchResult[] {
  const results: SearchResult[] = [];
  const lines = text.split('\n');
  let currentResult: Partial<SearchResult> = {};
  let currentRank = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const match = trimmed.match(RESULT_ITEM_REGEX);
    if (match) {
      const [, rank, field, value] = match;
      const rankNum = Number.parseInt(rank, 10);

      if (rankNum !== currentRank && currentResult.title && currentResult.url) {
        addResultToArray(results, currentResult, currentRank);
        currentResult = {};
      }

      currentRank = rankNum;
      processResultField(currentResult, field, value);
    }
  }

  addResultToArray(results, currentResult, currentRank);

  return results;
}

function handleSearchError(
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>,
  toolCallId: string,
  query: string,
  error: string
): string {
  Effect.log('Web search failed', { query, error });

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
  results: SearchResult[]
): string {
  const limitedResults = results.slice(0, MAX_RESULTS);

  Effect.log('Web search successful', {
    query,
    resultsCount: limitedResults.length,
    firstResultTitle: limitedResults[0]?.title?.substring(0, TITLE_MAX_LENGTH),
  });

  writer.write({
    id: toolCallId,
    type: 'data-web-search',
    data: {
      query,
      status: 'done',
      results: limitedResults,
      resultsCount: limitedResults.length,
    },
  });

  const resultSummary = limitedResults
    .slice(0, SUMMARY_MAX_RESULTS)
    .map((r, i) => `${i + 1}. **${r.title}** - ${r.description}`)
    .join('\n');

  return `Found ${limitedResults.length} search results for "${query}":\n\n${resultSummary}\n\n${limitedResults.length > SUMMARY_MAX_RESULTS ? `... and ${limitedResults.length - SUMMARY_MAX_RESULTS} more results` : ''}`;
}

export const webSearch = ({ writer }: Params) =>
  tool({
    description,
    inputSchema: z.object({
      query: z
        .string()
        .describe('The search query to find relevant web content'),
    }),
    execute: async ({ query }, { toolCallId }) => {
      writer.write({
        id: toolCallId,
        type: 'data-web-search',
        data: { query, status: 'loading' },
      });

      Effect.log('Starting web search', { query, toolCallId });

      if (!env.JINA_API_KEY) {
        const error =
          'JINA_API_KEY is not configured. Please configure JINA_API_KEY environment variable.';
        return handleSearchError(writer, toolCallId, query, error);
      }

      try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(`https://s.jina.ai/?q=${encodedQuery}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${env.JINA_API_KEY}`,
            'X-Respond-With': 'no-content',
            'User-Agent': 'Obby-AI-Web-Search/1.0',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const content = await response.text();

        if (!content || content.trim().length === 0) {
          throw new Error('No search results found');
        }

        const results = parseSearchResults(content);

        if (results.length === 0) {
          throw new Error('Could not parse search results');
        }

        return handleSearchSuccess(writer, toolCallId, query, results);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        return handleSearchError(writer, toolCallId, query, errorMessage);
      }
    },
  });
