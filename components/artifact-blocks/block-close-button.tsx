import { memo } from "react";
import { X } from "lucide-react";
import { initialBlockData, useBlock } from "@/hooks/use-block";
import { Button } from "@/components/ui/button";

function PureBlockCloseButton() {
  const { setBlock } = useBlock();

  return (
    <Button
      variant="outline"
      className="h-fit p-2 dark:hover:bg-zinc-700"
      onClick={() => {
        setBlock((currentBlock) =>
          currentBlock.status === "streaming"
            ? {
                ...currentBlock,
                isVisible: false,
              }
            : { ...initialBlockData, status: "idle" },
        );
      }}
    >
      <X className="w-4 h-4" />
    </Button>
  );
}

export const BlockCloseButton = memo(PureBlockCloseButton, () => true);
