import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      WORKOS_CLIENT_ID: z.string().startsWith('client_'),
      WORKOS_API_KEY: z.string().startsWith('sk_test_'),
      WORKOS_COOKIE_PASSWORD: z.string().min(32),
      WORKOS_WEBHOOK_SECRET: z.string().optional(),
    },
    client: {
      NEXT_PUBLIC_WORKOS_REDIRECT_URI: z.string().url(),
    },
    runtimeEnv: {
      WORKOS_CLIENT_ID: process.env.WORKOS_CLIENT_ID,
      WORKOS_API_KEY: process.env.WORKOS_API_KEY,
      WORKOS_COOKIE_PASSWORD: process.env.WORKOS_COOKIE_PASSWORD,
      WORKOS_WEBHOOK_SECRET: process.env.WORKOS_WEBHOOK_SECRET,
      NEXT_PUBLIC_WORKOS_REDIRECT_URI:
        process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
    },
  });
