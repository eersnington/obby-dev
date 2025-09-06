import { cn } from '@repo/design-system/lib/utils';
import { AlertTriangleIcon, BookOpenIcon } from 'lucide-react';
import { useState } from 'react';
import { Streamdown } from 'streamdown';
import type { DataPart } from '@/ai/messages/data-parts';
import { MessageSpinner } from '../message-spinner';
import { ToolHeader } from '../tool-header';
import { ToolMessage } from '../tool-message';

export function Context7(props: {
  className?: string;
  message: DataPart['context7'];
}) {
  const { message } = props;
  const { status, query, libraryId, topic, tokens, result, error } = message;

  const [showContent, setShowContent] = useState(false);
  const resultLength = result?.length ?? 0;
  const hasResult = Boolean(result);

  return (
    <ToolMessage className={cn(props.className)}>
      <ToolHeader>
        {status === 'error' ? (
          <AlertTriangleIcon className="h-3.5 w-3.5 text-destructive" />
        ) : (
          <BookOpenIcon className="h-3.5 w-3.5" />
        )}
        <HeaderStatus
          hasResult={hasResult}
          libraryId={libraryId}
          resultLength={resultLength}
          status={status}
        />
      </ToolHeader>

      <div className="space-y-3">
        <MetaSection
          libraryId={libraryId}
          query={query}
          tokens={tokens}
          topic={topic}
        />

        {status === 'loading' && <MessageSpinner />}

        <ErrorSection error={error} status={status} />

        <ContentSection
          result={result}
          show={showContent}
          status={status}
          toggle={() => setShowContent((v) => !v)}
        />
      </div>
    </ToolMessage>
  );
}

function HeaderStatus(props: {
  status: DataPart['context7']['status'];
  libraryId?: string;
  resultLength: number;
  hasResult: boolean;
}) {
  const { status, libraryId, resultLength, hasResult } = props;

  if (status === 'loading') {
    return <span>Fetching Context7 Docs</span>;
  }
  if (status === 'error') {
    return <span>Fetch Failed</span>;
  }
  if (status === 'done') {
    return (
      <span>
        {libraryId ? `Docs for ${libraryId}` : 'Context7 Docs'}
        {hasResult && (
          <span className="ml-2 font-mono text-muted-foreground text-xs">
            ({resultLength} chars)
          </span>
        )}
      </span>
    );
  }
  return null;
}

function MetaSection(props: {
  query?: string;
  libraryId?: string;
  topic?: string;
  tokens?: number;
}) {
  const { query, libraryId, topic, tokens } = props;

  if (!(query || libraryId || topic || tokens)) {
    return null;
  }

  return (
    <div className="space-y-1">
      {query && (
        <div className="font-mono text-sm">
          <span className="text-muted-foreground">query:</span>{' '}
          <span className="text-foreground">{query}</span>
        </div>
      )}
      {libraryId && (
        <div className="font-mono text-sm">
          <span className="text-muted-foreground">library:</span>{' '}
          <span className="text-foreground">{libraryId}</span>
        </div>
      )}
      {topic && (
        <div className="font-mono text-sm">
          <span className="text-muted-foreground">topic:</span>{' '}
          <span className="text-foreground">{topic}</span>
        </div>
      )}
      {typeof tokens === 'number' && (
        <div className="font-mono text-sm">
          <span className="text-muted-foreground">tokens:</span>{' '}
          <span className="text-foreground">{tokens}</span>
        </div>
      )}
    </div>
  );
}

function ErrorSection(props: {
  status: DataPart['context7']['status'];
  error?: string;
}) {
  if (!(props.status === 'error' && props.error)) {
    return null;
  }
  return (
    <div className="border-destructive border-l-2 py-2 pl-3">
      <div className="font-mono text-destructive text-sm">{props.error}</div>
    </div>
  );
}

function ContentSection(props: {
  status: DataPart['context7']['status'];
  result?: string;
  show: boolean;
  toggle: () => void;
}) {
  if (!(props.status === 'done' && props.result)) {
    return null;
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-mono text-muted-foreground text-xs uppercase">
          Content
        </div>
        <button
          className="rounded border px-2 py-0.5 font-medium text-xs transition-colors hover:bg-accent"
          onClick={props.toggle}
          type="button"
        >
          {props.show ? 'Hide' : 'Show'}
        </button>
      </div>
      {props.show ? (
        <div className="rounded-md border border-border bg-secondary/90 px-3.5 py-3 text-secondary-foreground text-sm">
          <Streamdown>{props.result}</Streamdown>
        </div>
      ) : (
        <div className="font-mono text-muted-foreground text-xs">
          (collapsed)
        </div>
      )}
    </div>
  );
}
