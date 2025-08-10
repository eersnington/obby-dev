'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { InfoIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { create } from 'zustand';

interface State {
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
}

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

export const useWelcomeStore = create<State>((set: SetState<State>) => ({
  open: undefined,
  setOpen: (open: boolean) => set({ open }),
}));

export function Welcome(props: {
  onDismissAction(): void;
  defaultOpen: boolean;
}) {
  const { open, setOpen } = useWelcomeStore();

  useEffect(() => {
    setOpen(props.defaultOpen);
  }, [setOpen, props.defaultOpen]);

  if (!(typeof open === 'undefined' ? props.defaultOpen : open)) {
    return null;
  }

  const handleDismiss = () => {
    props.onDismissAction();
    setOpen(false);
  };

  return (
    <div className="fixed z-10 h-screen w-screen">
      <button
        aria-label="Dismiss welcome dialog"
        className="absolute h-full w-full bg-secondary opacity-60"
        onClick={handleDismiss}
        type="button"
      />
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="mx-4 max-w-xl overflow-hidden rounded-lg bg-background shadow">
          <div className="space-y-4 p-6 ">
            <h1 className="sans-serif mb-7 font-semibold text-2xl tracking-tight">
              OSS Vibe Coding Platform
            </h1>
            <p className="text-base text-primary">
              This is a <strong>demo</strong> of an end-to-end coding platform
              where the user can enter text prompts, and the agent will create a
              full stack application.
            </p>
            <p className="text-base text-secondary-foreground">
              It uses Vercel&quot;s AI Cloud services like{' '}
              <ExternalLink href="https://vercel.com/docs/vercel-sandbox">
                Sandbox
              </ExternalLink>{' '}
              for secure code execution,{' '}
              <ExternalLink href="https://vercel.com/docs/ai-gateway">
                AI Gateway
              </ExternalLink>{' '}
              for GPT-5 and other models support,{' '}
              <ExternalLink href="https://vercel.com/fluid">
                Fluid Compute
              </ExternalLink>{' '}
              for efficient rendering and streaming, and it&quot;s built with{' '}
              <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink>{' '}
              and the{' '}
              <ExternalLink href="https://ai-sdk.dev/docs/introduction">
                AI SDK
              </ExternalLink>
              .
            </p>
          </div>
          <footer className="flex justify-end border-border border-t bg-secondary p-4">
            <Button className="cursor-pointer" onClick={handleDismiss}>
              Try now
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export function ToggleWelcome() {
  const { open, setOpen } = useWelcomeStore();
  return (
    <Button
      className="cursor-pointer"
      onClick={() => setOpen(!open)}
      size="sm"
      variant="outline"
    >
      <InfoIcon /> <span className="hidden lg:inline">What&quot;s this?</span>
    </Button>
  );
}

function ExternalLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      className="text-primary underline underline-offset-3"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
