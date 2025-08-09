'use client';

import { XIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  defaultOpen: boolean;
  onDismiss: () => void;
}

export function Banner({ defaultOpen, onDismiss }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  if (!open) {
    return null;
  }

  return (
    <div className="full relative border border-yellow-500 border-dashed bg-yellow-100 py-2 pr-8 pl-2 text-xs">
      <strong>Vercel Coding Agent demo</strong> This demo showcases a full-stack
      coding agent built with Vercel&apos;s AI Cloud, AI SDK, and Next.js This
      example gives you full flexibility of the underlying model via Vercel AI
      Gateway and code execution via Vercel Sandbox. For a drop-in, higher-level
      solution for adding vibe coding capabilities to your applications, check
      out the v0 Platform API.
      <button
        aria-label="Close Banner"
        className="absolute top-2 right-2 cursor-pointer text-yellow-700 transition-colors hover:text-yellow-900"
        onClick={() => {
          onDismiss();
          setOpen(false);
        }}
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
