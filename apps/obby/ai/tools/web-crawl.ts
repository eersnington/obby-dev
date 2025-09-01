import type { UIMessage, UIMessageStreamWriter } from 'ai';
import { tool } from 'ai';
import { Effect } from 'effect';
import z from 'zod/v3';
import { env } from '@/env';
import type { DataPart } from '../messages/data-parts';
import description from './web-crawl.md';

const TITLE_HEADING_REGEX = /^#\s+(.+)$/m;
const TITLE_FIRST_LINE_REGEX = /^(.+)$/m;
const TITLE_MAX_LENGTH = 100;

type Params = {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

export const webCrawl = ({ writer }: Params) =>
  tool({
    description,
    inputSchema: z.object({
      url: z
        .string()
        .url()
        .describe('The URL of the website to crawl and extract content from'),
    }),
    execute: async ({ url }, { toolCallId }) => {
      writer.write({
        id: toolCallId,
        type: 'data-web-crawl',
        data: { url, status: 'loading' },
      });

      Effect.log('Starting web crawl', { url, toolCallId });

      if (!env.JINA_API_KEY) {
        const error = 'JINA_API_KEY is not configured';
        Effect.log('Web crawl failed: missing API key', { url });

        writer.write({
          id: toolCallId,
          type: 'data-web-crawl',
          data: { url, status: 'error', error },
        });

        return `Failed to crawl ${url}: ${error}. Please configure JINA_API_KEY environment variable.`;
      }

      try {
        const response = await fetch(`https://r.jina.ai/${url}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${env.JINA_API_KEY}`,
            Accept: 'text/plain',
            'User-Agent': 'Obby-AI-Web-Crawler/1.0',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const content = await response.text();

        if (!content || content.trim().length === 0) {
          throw new Error('No content could be extracted from the webpage');
        }

        const titleMatch =
          content.match(TITLE_HEADING_REGEX) ||
          content.match(TITLE_FIRST_LINE_REGEX);
        const title = titleMatch ? titleMatch[1].trim() : new URL(url).hostname;

        Effect.log('Web crawl successful', {
          url,
          contentLength: content.length,
          title: title.substring(0, TITLE_MAX_LENGTH),
        });

        writer.write({
          id: toolCallId,
          type: 'data-web-crawl',
          data: { url, status: 'done', content, title },
        });

        return `Successfully crawled content from ${url}. Title: "${title}". Content length: ${content.length} characters.\n\nContent:\n${content}`;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        Effect.log('Web crawl failed', { url, error: errorMessage });

        writer.write({
          id: toolCallId,
          type: 'data-web-crawl',
          data: { url, status: 'error', error: errorMessage },
        });

        return `Failed to crawl ${url}: ${errorMessage}`;
      }
    },
  });
