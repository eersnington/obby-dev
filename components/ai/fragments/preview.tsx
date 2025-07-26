import { DeployDialog } from './deploy-dialog';
import { FragmentCode } from './fragment-code';
import { FragmentPreview } from './fragment-preview';
import { Button } from 'components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';
import type { FragmentSchema } from 'lib/fragment';
import type { ExecutionResult } from 'lib/types';
import type { DeepPartial } from 'ai';
import { ChevronsRight, LoaderCircle } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

export function Preview({
  teamID,
  accessToken,
  selectedTab,
  onSelectedTabChange,
  isChatLoading,
  isPreviewLoading,
  fragment,
  result,
  onClose,
}: {
  teamID: string | undefined;
  accessToken: string | undefined;
  selectedTab: 'code' | 'fragment';
  onSelectedTabChange: Dispatch<SetStateAction<'code' | 'fragment'>>;
  isChatLoading: boolean;
  isPreviewLoading: boolean;
  fragment?: DeepPartial<FragmentSchema>;
  result?: ExecutionResult;
  onClose: () => void;
}) {
  if (!fragment) {
    return null;
  }

  const isLinkAvailable = result?.template !== 'code-interpreter-v1';

  return (
    <div className="absolute top-0 left-0 z-10 h-full w-full overflow-auto bg-popover shadow-2xl md:relative md:rounded-tl-3xl md:border-y md:border-l">
      <Tabs
        className="flex h-full flex-col items-start justify-start"
        onValueChange={(value) =>
          onSelectedTabChange(value as 'code' | 'fragment')
        }
        value={selectedTab}
      >
        <div className="grid w-full grid-cols-3 items-center border-b p-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="text-muted-foreground"
                  onClick={onClose}
                  size="icon"
                  variant="ghost"
                >
                  <ChevronsRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close sidebar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-center">
            <TabsList className="h-8 border px-1 py-0">
              <TabsTrigger
                className="flex items-center gap-1 px-2 py-1 font-normal text-xs"
                value="code"
              >
                {isChatLoading && (
                  <LoaderCircle
                    className="h-3 w-3 animate-spin"
                    strokeWidth={3}
                  />
                )}
                Code
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-1 px-2 py-1 font-normal text-xs"
                disabled={!result}
                value="fragment"
              >
                Preview
                {isPreviewLoading && (
                  <LoaderCircle
                    className="h-3 w-3 animate-spin"
                    strokeWidth={3}
                  />
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          {result && (
            <div className="flex items-center justify-end gap-2">
              {isLinkAvailable && (
                <DeployDialog
                  accessToken={accessToken}
                  sbxId={result.sbxId}
                  teamID={teamID}
                  url={result.url}
                />
              )}
            </div>
          )}
        </div>
        {fragment && (
          <div className="h-full w-full overflow-y-auto">
            <TabsContent className="h-full" value="code">
              {fragment.code && fragment.file_path && (
                <FragmentCode
                  files={[
                    {
                      name: fragment.file_path,
                      content: fragment.code,
                    },
                  ]}
                />
              )}
            </TabsContent>
            <TabsContent className="h-full" value="fragment">
              {result && <FragmentPreview result={result as ExecutionResult} />}
            </TabsContent>
          </div>
        )}
      </Tabs>
    </div>
  );
}
