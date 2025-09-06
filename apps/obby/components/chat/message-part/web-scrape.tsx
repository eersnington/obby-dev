import { cn } from '@repo/design-system/lib/utils';
import { AlertTriangleIcon, GlobeIcon } from 'lucide-react';
import { useState } from 'react';
import { Streamdown } from 'streamdown';
import type { DataPart } from '@/ai/messages/data-parts';
import { MessageSpinner } from '../message-spinner';
import { ToolHeader } from '../tool-header';
import { ToolMessage } from '../tool-message';

export function WebScrape(props: {
  className?: string;
  message: DataPart['web-scrape'];
}) {
  const { message } = props;
  const { status, url, error, result } = message;
  const [showContent, setShowContent] = useState(false);

  const title = result?.metadata?.title;
  const markdown = result?.markdown;
  const summary = result?.summary;

  const screenshot = result?.screenshot;

  const markdownLength = markdown?.length ?? 0;

  return (
    <ToolMessage className={cn(props.className)}>
      <ToolHeader>
        {status === 'error' ? (
          <AlertTriangleIcon className="h-3.5 w-3.5 text-destructive" />
        ) : (
          <GlobeIcon className="h-3.5 w-3.5" />
        )}
        <HeaderStatus
          hasMarkdown={Boolean(markdown)}
          markdownLength={markdownLength}
          status={status}
          title={title}
        />
      </ToolHeader>

      <div className="space-y-3">
        <UrlRow url={url} />
        {status === 'loading' && <MessageSpinner />}
        <ErrorSection error={error} status={status} />
        <SummarySection status={status} summary={summary} />
        <ScreenshotSection screenshot={screenshot} status={status} />
        <ContentSection
          markdown={markdown}
          show={showContent}
          status={status}
          toggle={() => setShowContent((v) => !v)}
        />
      </div>
    </ToolMessage>
  );
}

function HeaderStatus(props: {
  status: DataPart['web-scrape']['status'];
  title?: string;
  markdownLength: number;
  hasMarkdown: boolean;
}) {
  const { status, title, markdownLength, hasMarkdown } = props;
  if (status === 'loading') {
    return <span>Scraping Page</span>;
  }
  if (status === 'error') {
    return <span>Scrape Failed</span>;
  }
  if (status === 'done') {
    return (
      <span>
        {title || 'Page Scraped'}
        {hasMarkdown && (
          <span className="ml-2 font-mono text-muted-foreground text-xs">
            ({markdownLength} chars)
          </span>
        )}
      </span>
    );
  }
  return null;
}

function UrlRow(props: { url?: string }) {
  if (!props.url) {
    return null;
  }
  return (
    <div className="font-mono text-sm">
      <span className="text-muted-foreground">url:</span>{' '}
      <span className="text-foreground">{props.url}</span>
    </div>
  );
}

function ErrorSection(props: {
  status: DataPart['web-scrape']['status'];
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

function SummarySection(props: {
  status: DataPart['web-scrape']['status'];
  summary?: string;
}) {
  if (!(props.status === 'done' && props.summary)) {
    return null;
  }
  return (
    <div className="space-y-1">
      <div className="font-mono text-muted-foreground text-xs uppercase">
        Summary
      </div>
      <div className="prose prose-sm max-w-none text-sm">
        <Streamdown>{props.summary}</Streamdown>
      </div>
    </div>
  );
}

function ScreenshotSection(props: {
  status: DataPart['web-scrape']['status'];
  screenshot?: string;
}) {
  if (!(props.status === 'done' && props.screenshot)) {
    return null;
  }
  return (
    <div className="space-y-1">
      <div className="font-mono text-muted-foreground text-xs uppercase">
        Screenshot
      </div>
      <div className="overflow-hidden rounded border">
        {/** biome-ignore lint/performance/noImgElement: required for web search results*/}
        <img
          alt="Page screenshot"
          className="h-auto w-full"
          height="450"
          src={props.screenshot}
          width="800"
        />
      </div>
    </div>
  );
}

function ContentSection(props: {
  status: DataPart['web-scrape']['status'];
  markdown?: string;
  show: boolean;
  toggle: () => void;
}) {
  if (!(props.status === 'done' && props.markdown)) {
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
        <div className="prose prose-sm max-w-none text-sm">
          <Streamdown>{props.markdown}</Streamdown>
        </div>
      ) : (
        <div className="font-mono text-muted-foreground text-xs">
          (collapsed)
        </div>
      )}
    </div>
  );
}
