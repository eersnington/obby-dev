// import { publish } from '@/app/actions/publish'
import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

// import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function DeployDialog({
  url,
  sbxId: _1,
  teamID: _2,
  accessToken: _3,
}: {
  url: string;
  sbxId: string;
  teamID: string | undefined;
  accessToken: string | undefined;
}) {
  // const posthog = usePostHog()

  const [_publishedURL, setPublishedURL] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: ignore
  useEffect(() => {
    setPublishedURL(null);
  }, [url]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Image
            alt="Vercel"
            className="mr-2"
            height={16}
            src={'/logos/vercel_logo.svg'}
            width={16}
          />
          Deploy to Vercel (Soon)
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-80 flex-col gap-2 p-4">
        <div className="font-semibold text-sm">
          <Image
            alt="Vercel"
            className="mr-2 rounded-full bg-white"
            height={28}
            src={'/logos/vercel_logo.svg'}
            width={28}
          />
          Deploy to Vercel
        </div>
        <div className="text-muted-foreground text-sm">
          You will be able to connect to your vercel account, and deploy this
          project soon.
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
