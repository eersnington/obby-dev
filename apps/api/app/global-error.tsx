'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { fonts } from '@repo/design-system/lib/fonts';
import { captureException } from '@sentry/nextjs';
import type NextError from 'next/error';
import { useEffect } from 'react';

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = (props: GlobalErrorProperties) => {
  useEffect(() => {
    captureException(props.error);
  }, [props.error]);

  return (
    <html className={fonts} lang="en">
      <body>
        <h1>Oops, something went wrong</h1>
        <Button onClick={() => props.reset()}>Try again</Button>
      </body>
    </html>
  );
};

export default GlobalError;
