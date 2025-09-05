'use client';

import {
  WebPreview,
  WebPreviewBody,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from '@repo/design-system/components/ai-elements/web-preview';
import { cn } from '@repo/design-system/lib/utils';
import {
  CodeIcon,
  ExternalLink,
  PanelTopIcon,
  RefreshCwIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { FileExplorer } from '@/components/file-explorer/file-explorer';

type Props = {
  className?: string;
  disabled?: boolean;
  url?: string;
  sandboxId?: string;
  paths?: string[];
};

export function Preview({ className, disabled, url, sandboxId, paths }: Props) {
  const [currentUrl, setCurrentUrl] = useState<string>(url ?? '');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'web' | 'code'>('web');
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    setCurrentUrl(url ?? '');
    if (url) {
      setIsLoading(true);
      setError(null);
      setReloadToken((t) => t + 1);
    }
  }, [url]);

  const refresh = () => {
    if (currentUrl) {
      setIsLoading(true);
      setError(null);
      setReloadToken((t) => t + 1);
    }
  };

  const srcWithToken = (u: string, token: number) => {
    if (!u) {
      return '';
    }
    try {
      const next = new URL(u);
      next.searchParams.set('t', String(token));
      return next.toString();
    } catch {
      const sep = u.includes('?') ? '&' : '?';
      return `${u}${sep}t=${token}`;
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load the page');
  };

  return (
    <WebPreview
      className={className}
      defaultUrl={currentUrl}
      key={currentUrl || 'empty'}
      onUrlChange={(newUrl) => {
        setCurrentUrl(newUrl);
        if (newUrl) {
          setIsLoading(true);
          setError(null);
          setReloadToken((t) => t + 1);
        }
      }}
    >
      <WebPreviewNavigation className="justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <WebPreviewNavigationButton
            disabled={!currentUrl}
            onClick={() => {
              if (currentUrl) {
                window.open(currentUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            tooltip="Open in new tab"
            type="button"
          >
            <ExternalLink className="size-4" />
          </WebPreviewNavigationButton>

          <WebPreviewNavigationButton
            className={cn(isLoading && 'text-foreground')}
            disabled={!currentUrl}
            onClick={refresh}
            tooltip="Refresh"
            type="button"
          >
            <RefreshCwIcon
              className={cn('size-4', isLoading && 'animate-spin')}
            />
          </WebPreviewNavigationButton>

          {currentUrl ? (
            <WebPreviewUrl
              className="h-8 min-w-0 flex-1 text-sm"
              onChange={(e) => setCurrentUrl(e.currentTarget.value)}
              placeholder="Enter URL..."
              value={currentUrl}
            />
          ) : null}
        </div>

        {/* Tab group - desktop only */}
        <div className="hidden items-center rounded-none border border-border lg:flex">
          <button
            className={cn(
              'flex items-center space-x-1 rounded-none border-none px-3 py-1 text-sm transition-colors',
              activeTab === 'web'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            )}
            onClick={() => setActiveTab('web')}
            type="button"
          >
            <PanelTopIcon className="size-3" />
            <span>Web</span>
          </button>
          <button
            className={cn(
              'flex items-center space-x-1 rounded-none border-none px-3 py-1 text-sm transition-colors',
              activeTab === 'code'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            )}
            onClick={() => setActiveTab('code')}
            type="button"
          >
            <CodeIcon className="size-3" />
            <span>Code</span>
          </button>
        </div>
      </WebPreviewNavigation>

      {activeTab === 'web' && !disabled ? (
        <div className="relative flex h-full w-full flex-col">
          <WebPreviewBody
            className="h-full w-full"
            onError={handleIframeError}
            onLoad={handleIframeLoad}
            src={currentUrl ? srcWithToken(currentUrl, reloadToken) : undefined}
            title="Browser content"
          />

          {isLoading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/90">
              <BarLoader color="#666" />
              <span className="text-gray-500 text-xs">Loading...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white">
              <span className="text-red-500">Failed to load page</span>
              <button
                className="text-blue-500 text-sm hover:underline"
                onClick={() => {
                  if (currentUrl) {
                    setIsLoading(true);
                    setError(null);
                    setReloadToken((t) => t + 1);
                  }
                }}
                type="button"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full w-full">
          <FileExplorer
            className="h-full w-full border-none"
            disabled={disabled}
            paths={paths || []}
            sandboxId={sandboxId}
          />
        </div>
      )}
    </WebPreview>
  );
}
