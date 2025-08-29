import { cn } from '@repo/design-system/lib/utils';
import { AlertTriangleIcon, ExternalLinkIcon, SearchIcon } from 'lucide-react';
import Markdown from 'react-markdown';
import type { DataPart } from '@/ai/messages/data-parts';
import { MessageSpinner } from '../message-spinner';
import { ToolHeader } from '../tool-header';
import { ToolMessage } from '../tool-message';

export function WebSearch(props: {
  className?: string;
  message: DataPart['web-search'];
}) {
  return (
    <ToolMessage className={cn(props.className)}>
      <ToolHeader>
        {props.message.status === 'error' ? (
          <AlertTriangleIcon className="h-3.5 w-3.5 text-destructive" />
        ) : (
          <SearchIcon className="h-3.5 w-3.5" />
        )}
        {props.message.status === 'loading' && <span>Searching Web</span>}
        {props.message.status === 'done' && (
          <span>Found {props.message.resultsCount || 0} Results</span>
        )}
        {props.message.status === 'error' && <span>Search Failed</span>}
      </ToolHeader>

      <div className="space-y-3">
        {props.message.query && (
          <div className="text-muted-foreground text-sm">
            <Markdown>{`Query: **${props.message.query}**`}</Markdown>
          </div>
        )}

        {props.message.status === 'loading' && <MessageSpinner />}

        {props.message.status === 'error' && props.message.error && (
          <div className="text-destructive text-sm">
            <Markdown>{`Error: ${props.message.error}`}</Markdown>
          </div>
        )}

        {props.message.status === 'done' && props.message.results && (
          <div className="space-y-2">
            {props.message.results.slice(0, 10).map((result, index) => (
              <div
                className="border-muted border-l-2 py-1 pl-3"
                key={`${result.url}-${index}`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono text-muted-foreground text-xs">
                    [{result.rank}]
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <a
                        className="truncate font-medium text-sm hover:underline"
                        href={result.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {result.title}
                      </a>
                      <ExternalLinkIcon className="h-3 w-3 shrink-0 text-muted-foreground" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
                      {result.description}
                    </p>
                    {result.date && (
                      <p className="mt-1 text-muted-foreground text-xs">
                        {result.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {props.message.results.length > 10 && (
              <div className="pt-2 text-center text-muted-foreground text-xs">
                ... and {props.message.results.length - 10} more results
              </div>
            )}
          </div>
        )}
      </div>
    </ToolMessage>
  );
}
