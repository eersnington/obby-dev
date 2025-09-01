import { keys as ai } from '@repo/ai/keys';
import { keys as database } from '@repo/database/keys';
import { keys as email } from '@repo/email/keys';
import { keys as core } from '@repo/next-config/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [ai(), core(), database(), email()],
  server: {},
  client: {},
  runtimeEnv: {},
});
