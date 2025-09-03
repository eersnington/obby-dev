import Firecrawl from '@mendable/firecrawl-js';
import type { UIMessage, UIMessageStreamWriter } from 'ai';
import { tool } from 'ai';
import { Effect } from 'effect';
import z from 'zod/v3';
import { env } from '@/env';
import type { DataPart } from '../messages/data-parts';
import description from './web-scrape.md';

type Params = {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

export const webScrape = ({ writer }: Params) =>
  tool({
    description,
    inputSchema: z.object({
      url: z
        .string()
        .url()
        .describe('The URL of the website to crawl and extract content from'),

      formats: z
        .array(z.enum(['markdown', 'screenshot', 'summary']))
        .describe(
          'Output formats: "markdown" for complete text content, "screenshot" for a visual image, and "summary" for a brief summary of the content. At minimum, one format must be selected.'
        ),
    }),
    execute: async ({ url, formats }, { toolCallId }) => {
      writer.write({
        id: toolCallId,
        type: 'data-web-scrape',
        data: { url, status: 'loading' },
      });

      Effect.log('Starting web scrape', { url, toolCallId });

      if (!env.FIRECRAWL_API_KEY) {
        const error = 'FIRECRAWL_API_KEY is not configured';
        Effect.log('Web crawl failed: missing API key', { url });

        writer.write({
          id: toolCallId,
          type: 'data-web-scrape',
          data: { url, status: 'error', error },
        });

        return `Failed to crawl ${url}: ${error}. Please configure FIRECRAWL_API_KEY environment variable.`;
      }

      const firecrawl = new Firecrawl({ apiKey: env.FIRECRAWL_API_KEY });

      try {
        const result = await firecrawl.scrape(url, {
          formats,
        });

        Effect.log('Web crawl successful', {
          url,
          content: result,
        });

        writer.write({
          id: toolCallId,
          type: 'data-web-scrape',
          data: { url, status: 'done', result },
        });

        return `Successfully scraped content from ${url}. Content length: ${result.markdown?.length ?? 0}`;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        Effect.log('Web crawl failed', { url, error: errorMessage });

        writer.write({
          id: toolCallId,
          type: 'data-web-scrape',
          data: { url, status: 'error', error: errorMessage },
        });

        return `Failed to crawl ${url}: ${errorMessage}`;
      }
    },
  });
