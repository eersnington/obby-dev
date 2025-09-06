import type { Document, SearchResultWeb } from '@mendable/firecrawl-js';
import z from 'zod/v3';

export const dataPartSchema = z.object({
  'create-sandbox': z.object({
    sandboxId: z.string().optional(),
    status: z.enum(['loading', 'done']),
  }),
  'generating-files': z.object({
    paths: z.array(z.string()),
    status: z.enum(['generating', 'uploading', 'uploaded', 'done']),
  }),
  'run-command': z.object({
    command: z.string(),
    args: z.array(z.string()),
    status: z.enum(['loading', 'done']),
    commandId: z.string().optional(),
    sandboxId: z.string(),
  }),
  'wait-command': z.object({
    sandboxId: z.string(),
    commandId: z.string(),
    command: z.string(),
    args: z.array(z.string()),
    exitCode: z.number().optional(),
    status: z.enum(['loading', 'done']),
  }),
  'get-sandbox-url': z.object({
    url: z.string().optional(),
    status: z.enum(['loading', 'done']),
  }),
  'web-scrape': z.object({
    url: z.string().optional(),
    status: z.enum(['loading', 'done', 'error']),
    result: z.custom<Document>().optional(),
    error: z.string().optional(),
  }),
  'web-search': z.object({
    query: z.string().optional(),
    status: z.enum(['loading', 'done', 'error']),
    results: z.custom<SearchResultWeb[]>().optional(),
    resultsCount: z.number().optional(),
    error: z.string().optional(),
  }),
  context7: z.object({
    query: z.string().optional(),
    status: z.enum(['loading', 'done', 'error']),
    libraryId: z.string().optional(),
    topic: z.string().optional(),
    tokens: z.number().optional(),
    result: z.string().optional(),
    error: z.string().optional(),
  }),
});

export type DataPart = z.infer<typeof dataPartSchema>;
