import { PulseLoader } from 'react-spinners';
import useSWR from 'swr';
import { SyntaxHighlighter } from './syntax-highlighter';

type Props = {
  sandboxId: string;
  path: string;
};

export function FileContent({ sandboxId, path }: Props) {
  const searchParams = new URLSearchParams({ path });
  const content = useSWR(
    `/api/sandboxes/${sandboxId}/files?${searchParams.toString()}`,
    async (pathname: string, init: RequestInit) => {
      const response = await fetch(pathname, init);
      const text = await response.text();
      return text;
    },
    { refreshInterval: 500 }
  );

  return (
    <div className="h-full min-h-0 w-full overflow-auto">
      {content.isLoading || !content.data ? (
        <div className="flex h-full w-full items-center justify-center">
          <PulseLoader className="opacity-60" size={8} />
        </div>
      ) : (
        <SyntaxHighlighter code={content.data} path={path} />
      )}
    </div>
  );
}
