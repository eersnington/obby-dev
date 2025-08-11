import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
      AI_GATEWAY_API_KEY: z.string().optional(),
      // teamId: env.VERCEL_TEAM_ID,
      // projectId: env.VERCEL_PROJECT_ID,
      // token: env.VERCEL_TOKEN,
      VERCEL_TEAM_ID: z.string().optional(),
      VERCEL_PROJECT_ID: z.string().optional(),
      VERCEL_TOKEN: z.string().optional(),
    },
    runtimeEnv: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      AI_GATEWAY_API_KEY: process.env.AI_GATEWAY_API_KEY,
      VERCEL_TEAM_ID: process.env.VERCEL_TEAM_ID,
      VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
      VERCEL_TOKEN: process.env.VERCEL_TOKEN,
    },
  });
