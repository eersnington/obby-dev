import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
      AI_GATEWAY_API_KEY: z.string().optional(),
      ANTHROPIC_API_KEY: z.string().optional(),
      GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),
      GROQ_API_KEY: z.string().optional(),
      OPENROUTER_API_KEY: z.string().optional(),
      VERCEL_API_KEY: z.string().optional(),
      AWS_ACCESS_KEY_ID: z.string().optional(),
      AWS_SECRET_ACCESS_KEY: z.string().optional(),
      AWS_REGION: z.string().optional(),
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
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      GROQ_API_KEY: process.env.GROQ_API_KEY,
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION,
      VERCEL_API_KEY: process.env.VERCEL_API_KEY,
      VERCEL_TEAM_ID: process.env.VERCEL_TEAM_ID,
      VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
      VERCEL_TOKEN: process.env.VERCEL_TOKEN,
    },
  });
