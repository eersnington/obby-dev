"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { blockDefinitions, type BlockKind } from "../artifact-blocks/block";
import { initialBlockData, useBlock } from "@/hooks/use-block";
import type { Doc } from "@/convex/_generated/dataModel";

type Suggestion = {
  originalText: string;
  suggestedText: string;
  description: string;
  isResolved: boolean;
  userId: Doc<"users">["_id"];
  documentId: string;
  suggestionId: string;
};
export type DataStreamDelta = {
  type:
    | "text-delta"
    | "code-delta"
    | "image-delta"
    | "title"
    | "id"
    | "suggestion"
    | "clear"
    | "finish"
    | "kind";
  content: string | Suggestion;
};

export function DataStreamHandler({ id }: { id: string }) {
  const { data: dataStream } = useChat({ id });
  const { block, setBlock, setMetadata } = useBlock();
  const lastProcessedIndex = useRef(-1);

  useEffect(() => {
    if (!dataStream?.length) return;

    const newDeltas = dataStream.slice(lastProcessedIndex.current + 1);
    lastProcessedIndex.current = dataStream.length - 1;

    (newDeltas as DataStreamDelta[]).forEach((delta: DataStreamDelta) => {
      const blockDefinition = blockDefinitions.find(
        (blockDefinition) => blockDefinition.kind === block.kind,
      );

      if (blockDefinition?.onStreamPart) {
        blockDefinition.onStreamPart({
          streamPart: delta,
          setBlock,
          setMetadata,
        });
      }

      setBlock((draftBlock) => {
        if (!draftBlock) {
          return { ...initialBlockData, status: "streaming" };
        }

        switch (delta.type) {
          case "id":
            return {
              ...draftBlock,
              documentId: delta.content as string,
              status: "streaming",
            };

          case "title":
            return {
              ...draftBlock,
              title: delta.content as string,
              status: "streaming",
            };

          case "kind":
            return {
              ...draftBlock,
              kind: delta.content as BlockKind,
              status: "streaming",
            };

          case "clear":
            return {
              ...draftBlock,
              content: "",
              status: "streaming",
            };

          case "finish":
            return {
              ...draftBlock,
              status: "idle",
            };

          default:
            return draftBlock;
        }
      });
    });
  }, [dataStream, setBlock, setMetadata, block]);

  return null;
}
