/** biome-ignore-all lint/correctness/noUnusedVariables: shuuush */
/** biome-ignore-all lint/correctness/noUnusedImports: shuuush */

import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGateway } from '@ai-sdk/gateway'; // vercel's openrouter competitor
import { createGoogleGenerativeAI } from '@ai-sdk/google'; // google generative ai (not vertex)
import { createGroq } from '@ai-sdk/groq';
import { createOpenAI } from '@ai-sdk/openai';
import { createVercel } from '@ai-sdk/vercel'; // v0 models
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const anthropic = createAnthropic({
  apiKey: '',
});

const bedrock = createAmazonBedrock({
  region: 'us-east-1',
  accessKeyId: 'xxxxxxxxx',
  secretAccessKey: 'xxxxxxxxx',
  sessionToken: 'xxxxxxxxx',
});

const google = createGoogleGenerativeAI({
  apiKey: '',
});

const gateway = createGateway({
  apiKey: '',
});

const groq = createGroq({
  apiKey: '',
});

const openai = createOpenAI({
  apiKey: '',
});

const openrouter = createOpenRouter({
  apiKey: '',
});

const vercel = createVercel({
  apiKey: '',
});
