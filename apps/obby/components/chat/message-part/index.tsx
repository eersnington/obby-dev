import type { UIMessage } from 'ai';
import type { DataPart } from '@/ai/messages/data-parts';
import type { Metadata } from '@/ai/messages/metadata';
import type { ToolSet } from '@/ai/tools';
import { CreateSandbox } from './create-sandbox';
import { GenerateFiles } from './generate-files';
import { GetSandboxURL } from './get-sandbox-url';
import { Reasoning } from './reasoning';
import { RunCommand } from './run-command';
import { Text } from './text';
import { WaitCommand } from './wait-command';
import { WebScrape } from './web-scrape';
import { WebSearch } from './web-search';

type Props = {
  part: UIMessage<Metadata, DataPart, ToolSet>['parts'][number];
};

export function MessagePart({ part }: Props) {
  if (part.type === 'data-generating-files') {
    return <GenerateFiles message={part.data} />;
  }
  if (part.type === 'data-create-sandbox') {
    return <CreateSandbox message={part.data} />;
  }
  if (part.type === 'data-get-sandbox-url') {
    return <GetSandboxURL message={part.data} />;
  }
  if (part.type === 'data-run-command') {
    return <RunCommand message={part.data} />;
  }
  if (part.type === 'data-wait-command') {
    return <WaitCommand message={part.data} />;
  }
  if (part.type === 'data-web-scrape') {
    return <WebScrape message={part.data} />;
  }
  if (part.type === 'data-web-search') {
    return <WebSearch message={part.data} />;
  }
  if (part.type === 'reasoning') {
    return <Reasoning part={part} />;
  }
  if (part.type === 'text') {
    return <Text part={part} />;
  }
  if (part.type) {
    // console.log(JSON.stringify(part, undefined, 4));
  }
}
