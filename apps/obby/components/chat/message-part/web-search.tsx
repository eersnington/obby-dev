import { cn } from '@repo/design-system/lib/utils';
import { AlertTriangleIcon, ExternalLinkIcon, SearchIcon } from 'lucide-react';
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
          <div className="font-mono text-sm">
            <span className="text-muted-foreground">query:</span>{' '}
            <span className="text-foreground">{props.message.query}</span>
          </div>
        )}

        {props.message.status === 'loading' && <MessageSpinner />}

        {props.message.status === 'error' && props.message.error && (
          <div className="border-destructive border-l-2 py-2 pl-3">
            <div className="font-mono text-destructive text-sm">
              {props.message.error}
            </div>
          </div>
        )}

        {props.message.status === 'done' && props.message.results && (
          <div className="space-y-1">
            {props.message.results.map((result, index) => (
              <div
                className="group border-muted border-l-2 py-2 pl-3 transition-colors hover:border-primary"
                key={`${result.url}-${index}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 shrink-0 text-right font-mono text-muted-foreground text-xs">
                    {result.category}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono text-muted-foreground text-xs">
                        {result.url}
                      </span>
                    </div>
                    <div className="mb-1">
                      <a
                        className="line-clamp-2 font-mono text-foreground text-sm leading-tight transition-colors hover:text-primary"
                        href={result.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        title={result.title}
                      >
                        {result.title}
                        <ExternalLinkIcon className="ml-1 inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </div>
                    <p className="line-clamp-2 text-muted-foreground text-xs">
                      {result.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}{' '}
          </div>
        )}
      </div>
    </ToolMessage>
  );
}
