import { memo } from "react";
import { File, LoaderCircle, MessageCircle, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useBlock } from "@/hooks/use-block";
import type { BlockKind } from "./block";

const getActionText = (
  type: "create" | "update" | "request-suggestions",
  tense: "present" | "past",
) => {
  switch (type) {
    case "create":
      return tense === "present" ? "Creating" : "Created";
    case "update":
      return tense === "present" ? "Updating" : "Updated";
    case "request-suggestions":
      return tense === "present"
        ? "Adding suggestions"
        : "Added suggestions to";
    default:
      return null;
  }
};

interface DocumentToolResultProps {
  type: "create" | "update" | "request-suggestions";
  result: { id: string; title: string; kind: BlockKind };
  isReadonly: boolean;
}

function PureDocumentToolResult({
  type,
  result,
  isReadonly,
}: DocumentToolResultProps) {
  const { setBlock } = useBlock();

  return (
    <button
      type="button"
      className="bg-background cursor-pointer border py-2 px-3 rounded-xl w-fit flex flex-row gap-3 items-start"
      onClick={(event) => {
        if (isReadonly) {
          toast.error(
            "Viewing files in shared chats is currently not supported.",
          );
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        const boundingBox = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };

        setBlock({
          documentId: result.id,
          kind: result.kind,
          content: "",
          title: result.title,
          isVisible: true,
          status: "idle",
          boundingBox,
        });
      }}
    >
      <div className="text-muted-foreground mt-1">
        {type === "create" ? (
          <File className="w-4 h-4" />
        ) : type === "update" ? (
          <Pencil className="w-4 h-4" />
        ) : type === "request-suggestions" ? (
          <MessageCircle className="w-4 h-4" />
        ) : null}
      </div>
      <div className="text-left">
        {`${getActionText(type, "past")} "${result.title}"`}
      </div>
    </button>
  );
}

export const DocumentToolResult = memo(PureDocumentToolResult, () => true);

interface DocumentToolCallProps {
  type: "create" | "update" | "request-suggestions";
  args: { title: string };
  isReadonly: boolean;
}

function PureDocumentToolCall({
  type,
  args,
  isReadonly,
}: DocumentToolCallProps) {
  const { setBlock } = useBlock();

  return (
    <button
      type="button"
      className="cursor pointer w-fit border py-2 px-3 rounded-xl flex flex-row items-start justify-between gap-3"
      onClick={(event) => {
        if (isReadonly) {
          toast.error(
            "Viewing files in shared chats is currently not supported.",
          );
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        const boundingBox = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };

        setBlock((currentBlock) => ({
          ...currentBlock,
          isVisible: true,
          boundingBox,
        }));
      }}
    >
      <div className="flex flex-row gap-3 items-start">
        <div className="text-zinc-500 mt-1">
          {type === "create" ? (
            <File className="w-4 h-4" />
          ) : type === "update" ? (
            <Pencil className="w-4 h-4" />
          ) : type === "request-suggestions" ? (
            <MessageCircle className="w-4 h-4" />
          ) : null}
        </div>

        <div className="text-left">
          {`${getActionText(type, "present")} ${args.title ? `"${args.title}"` : ""}`}
        </div>
      </div>

      <div className="animate-spin mt-1">
        <LoaderCircle className="w-4 h-4" />
      </div>
    </button>
  );
}

export const DocumentToolCall = memo(PureDocumentToolCall, () => true);
