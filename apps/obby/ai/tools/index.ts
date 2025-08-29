import type { InferUITools, UIMessage, UIMessageStreamWriter } from 'ai';
import type { ModelProvider } from '../constants';
import type { DataPart } from '../messages/data-parts';
import { createSandbox } from './create-sandbox';
import { generateFiles } from './generate-files';
import { getSandboxURL } from './get-sandbox-url';
import { runCommand } from './run-command';
import { waitCommand } from './wait-command';
import { webCrawl } from './web-crawl';
import { webSearch } from './web-search';

type Params = {
  provider: ModelProvider | undefined;
  modelId: string;
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

export function tools({ provider, modelId, writer }: Params) {
  return {
    createSandbox: createSandbox({ writer }),
    generateFiles: generateFiles({ writer, modelId, provider }),
    getSandboxURL: getSandboxURL({ writer }),
    runCommand: runCommand({ writer }),
    waitCommand: waitCommand({ writer }),
    webCrawl: webCrawl({ writer }),
    webSearch: webSearch({ writer }),
  };
}

export type ToolSet = InferUITools<ReturnType<typeof tools>>;
