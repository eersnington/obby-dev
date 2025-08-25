import { cn } from '@repo/design-system/lib/utils';
import { GlobeIcon, AlertTriangleIcon } from 'lucide-react';
import Markdown from 'react-markdown';
import type { DataPart } from '@/ai/messages/data-parts';
import { MessageSpinner } from '../message-spinner';
import { ToolHeader } from '../tool-header';
import { ToolMessage } from '../tool-message';

export function WebCrawl(props: {
  className?: string;
  message: DataPart['web-crawl'];
}) {
  return (
    <ToolMessage className={cn(props.className)}>
      <ToolHeader>
        {props.message.status === 'error' ? (
          <AlertTriangleIcon className="h-3.5 w-3.5 text-destructive" />
        ) : (
          <GlobeIcon className="h-3.5 w-3.5" />
        )}
        {props.message.status === 'loading' && <span>Crawling Website</span>}
        {props.message.status === 'done' && <span>Website Crawled</span>}
        {props.message.status === 'error' && <span>Crawl Failed</span>}
      </ToolHeader>
      
      <div className="space-y-2">
        {props.message.url && (
          <div className="text-muted-foreground text-sm">
            <Markdown>{`URL: \`${props.message.url}\``}</Markdown>
          </div>
        )}
        
        {props.message.status === 'loading' && <MessageSpinner />}
        
        {props.message.status === 'error' && props.message.error && (
          <div className="text-destructive text-sm">
            <Markdown>{`Error: ${props.message.error}`}</Markdown>
          </div>
        )}
        
        {props.message.status === 'done' && props.message.title && (
          <div className="text-sm">
            <Markdown>{`**Title:** ${props.message.title}`}</Markdown>
          </div>
        )}
        
        {props.message.status === 'done' && props.message.content && (
          <div className="text-sm">
            <Markdown>{`Content extracted (${props.message.content.length} characters)`}</Markdown>
          </div>
        )}
      </div>
    </ToolMessage>
  );
}