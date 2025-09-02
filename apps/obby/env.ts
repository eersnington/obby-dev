import { keys as ai } from '@repo/ai/keys';
import { keys as database } from '@repo/database/keys';
import { keys as core } from '@repo/next-config/keys';
import { keys as storage } from '@repo/storage/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [ai(), core(), database(), storage()],
  server: {},
  client: {},
  runtimeEnv: {},
});
