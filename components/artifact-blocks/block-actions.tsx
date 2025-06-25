import { type Dispatch, memo, type SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { blockDefinitions, type UIBlock } from "./block";
import type { BlockActionContext } from "./create-block";

interface BlockActionsProps {
  block: UIBlock;
  handleVersionChange: (type: "next" | "prev" | "toggle" | "latest") => void;
  currentVersionIndex: number;
  isCurrentVersion: boolean;
  mode: "edit" | "diff";
  metadata: unknown;
  setMetadata: Dispatch<SetStateAction<unknown>>;
}

function PureBlockActions({
  block,
  handleVersionChange,
  currentVersionIndex,
  isCurrentVersion,
  mode,
  metadata,
  setMetadata,
}: BlockActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const blockDefinition = blockDefinitions.find(
    (definition) => definition.kind === block.kind,
  );

  if (!blockDefinition) {
    throw new Error("Block definition not found");
  }

  const actionContext: BlockActionContext = {
    content: block.content,
    handleVersionChange,
    currentVersionIndex,
    isCurrentVersion,
    mode,
    metadata,
    setMetadata,
  };

  return (
    <div className="flex flex-row gap-1">
      {blockDefinition.actions.map((action) => (
        <Tooltip key={action.description}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={cn("h-fit dark:hover:bg-zinc-700", {
                "p-2": !action.label,
                "py-1.5 px-2": action.label,
              })}
              onClick={async () => {
                setIsLoading(true);

                try {
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  await Promise.resolve(action.onClick(actionContext as any));
                } catch {
                  toast.error("Failed to execute action");
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={
                isLoading || block.status === "streaming"
                  ? true
                  : action.isDisabled
                    ? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                      action.isDisabled(actionContext as any)
                    : false
              }
            >
              {action.icon}
              {action.label}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{action.description}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export const BlockActions = memo(PureBlockActions, (prevProps, nextProps) => {
  if (prevProps.block.status !== nextProps.block.status) return false;
  if (prevProps.currentVersionIndex !== nextProps.currentVersionIndex)
    return false;
  if (prevProps.isCurrentVersion !== nextProps.isCurrentVersion) return false;
  if (prevProps.block.content !== nextProps.block.content) return false;

  return true;
});
