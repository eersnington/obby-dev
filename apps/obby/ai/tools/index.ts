import type { InferUITools, UIMessage, UIMessageStreamWriter } from 'ai';
import type { ModelProvider } from '../constants';
import type { DataPart } from '../messages/data-parts';
import type { ToolOptions } from '../validation';
import { createSandbox } from './create-sandbox';
import { generateFiles } from './generate-files';
import { getSandboxURL } from './get-sandbox-url';
import { runCommand } from './run-command';
import { waitCommand } from './wait-command';
import { webScrape } from './web-scrape';
import { webSearch } from './web-search';

type BaseParams = {
  provider: ModelProvider | undefined;
  modelId: string;
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

export type ToolsBuilderParams = BaseParams & {
  options?: {
    tools?: ToolOptions;
  };
};

export function tools(params: ToolsBuilderParams) {
  const { provider, modelId, writer, options } = params;
  const enabled = options?.tools ?? {};

  const base = {
    createSandbox: createSandbox({ writer }),
    generateFiles: generateFiles({ writer, modelId, provider }),
    getSandboxURL: getSandboxURL({ writer }),
    runCommand: runCommand({ writer }),
    waitCommand: waitCommand({ writer }),
  };

  const optional = {
    ...(enabled.webScrape ? { webScrape: webScrape({ writer }) } : {}),
    ...(enabled.webSearch ? { webSearch: webSearch({ writer }) } : {}),
  };

  return {
    ...base,
    ...optional,
  };
}

export type ToolSet = InferUITools<ReturnType<typeof tools>>;

export const AVAILABLE_OPTIONAL_TOOLS = ['webScrape', 'webSearch'] as const;

export type OptionalToolName = (typeof AVAILABLE_OPTIONAL_TOOLS)[number];
