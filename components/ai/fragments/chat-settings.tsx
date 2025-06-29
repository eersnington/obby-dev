import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";
import type { ModelInfo } from "lib/ai/models";
import { Settings2 } from "lucide-react";

export function ChatSettings({
  apiKeyConfigurable,
  baseURLConfigurable,
  languageModel,
  onLanguageModelChange,
}: {
  apiKeyConfigurable: boolean;
  baseURLConfigurable: boolean;
  languageModel: ModelInfo & {
    apiKey?: string;
  };
  onLanguageModelChange: (model: ModelInfo) => void;
}) {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground h-6 w-6 rounded-sm"
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>LLM settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="start">
        {apiKeyConfigurable && (
          <>
            <div className="flex flex-col gap-2 px-2 py-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                name="apiKey"
                type="password"
                placeholder="Auto"
                required={true}
                defaultValue={languageModel.apiKey}
                onChange={(e) =>
                  onLanguageModelChange({
                    ...languageModel,
                    apiKey:
                      e.target.value.length > 0 ? e.target.value : undefined,
                  } as ModelInfo)
                }
                className="text-sm"
              />
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        {baseURLConfigurable && (
          <>
            <div className="flex flex-col gap-2 px-2 py-2">
              <Label htmlFor="baseURL">Base URL</Label>
              <Input
                name="baseURL"
                type="text"
                placeholder="Auto"
                required={true}
                defaultValue={languageModel.baseURL}
                onChange={(e) =>
                  onLanguageModelChange({
                    ...languageModel,
                    baseURL:
                      e.target.value.length > 0 ? e.target.value : undefined,
                  } as ModelInfo)
                }
                className="text-sm"
              />
            </div>
            <DropdownMenuSeparator />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
