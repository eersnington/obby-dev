"use client";

import { useCallback, useMemo } from "react";
import type { UIBlock } from "@/components/artifact-blocks/block";
import { useLocalStorage } from "usehooks-ts";

export const initialBlockData: UIBlock = {
  documentId: "init",
  content: "",
  kind: "text",
  title: "",
  status: "idle",
  isVisible: false,
  boundingBox: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
};

type Selector<T> = (state: UIBlock) => T;

export function useBlockSelector<Selected>(selector: Selector<Selected>) {
  const [localBlock] = useLocalStorage<UIBlock>("block", initialBlockData);
  return useMemo(
    () => selector(localBlock ?? initialBlockData),
    [localBlock, selector],
  );
}

export function useBlock() {
  const [localBlock, setLocalBlock] = useLocalStorage<UIBlock>(
    "block",
    initialBlockData,
  );
  const [localBlockMetadata, setLocalBlockMetadata] = useLocalStorage<unknown>(
    "block-metadata",
    null,
  );

  const block = useMemo(() => localBlock ?? initialBlockData, [localBlock]);

  const setBlock = useCallback(
    (updaterFn: UIBlock | ((currentBlock: UIBlock) => UIBlock)) => {
      setLocalBlock((currentBlock) => {
        const blockToUpdate = currentBlock ?? initialBlockData;
        return typeof updaterFn === "function"
          ? updaterFn(blockToUpdate)
          : updaterFn;
      });
    },
    [setLocalBlock],
  );

  return useMemo(
    () => ({
      block,
      setBlock,
      metadata: localBlockMetadata,
      setMetadata: setLocalBlockMetadata,
    }),
    [block, setBlock, localBlockMetadata, setLocalBlockMetadata],
  );
}
