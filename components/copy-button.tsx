'use client';

import { useState, type ReactNode, useEffect } from 'react';
import { Button } from 'components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function CopyButton({
  children,
  copyValue,
}: {
  children?: ReactNode;
  copyValue: string;
}) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async () => {
    setCopied(true);

    try {
      await navigator.clipboard.writeText(copyValue);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Determine button variant based on theme
  const variant = mounted
    ? resolvedTheme === 'dark'
      ? 'secondary'
      : 'default'
    : 'default';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="cursor-pointer"
            onClick={copyToClipboard}
            size="default"
            variant={variant}
          >
            {children}
            {copied ? (
              <Check className="ml-2 h-4 w-4" />
            ) : (
              <Copy className="ml-2 h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? 'Copied' : 'Copy'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
