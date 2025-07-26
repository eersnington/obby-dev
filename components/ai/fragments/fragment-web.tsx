import CopyButton from 'components/copy-button';
import { Button } from 'components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';
import type { ExecutionResultWeb } from 'lib/types';
import { RotateCw } from 'lucide-react';
import { useState } from 'react';

export function FragmentWeb({ result }: { result: ExecutionResultWeb }) {
  const [iframeKey, setIframeKey] = useState(0);
  if (!result) return null;

  function refreshIframe() {
    setIframeKey((prevKey) => prevKey + 1);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <iframe
        className="h-full w-full"
        key={iframeKey}
        loading="lazy"
        sandbox="allow-forms allow-scripts allow-same-origin"
        src={result.url}
        title="Embedded Web Content"
      />
      <div className="border-t p-2">
        <div className="flex items-center rounded-2xl bg-muted dark:bg-white/10">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="text-muted-foreground"
                  onClick={refreshIframe}
                  variant="link"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground text-xs">
            {result.url}
          </span>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <CopyButton copyValue={result.url} />
              </TooltipTrigger>
              <TooltipContent>Copy URL</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
