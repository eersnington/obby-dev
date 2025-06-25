import {
  type Dispatch,
  memo,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import type { Attachment, UIMessage } from "ai";
import type { UseChatHelpers } from "@ai-sdk/react";
import { formatDistance } from "date-fns";
import { AnimatePresence, motion } from "motion/react";
import { useDebounceCallback, useWindowSize } from "usehooks-ts";
import { useBlock } from "@/hooks/use-block";
import { codeBlock } from "./code/client";
import { MultiModalInput } from "./multimodal-input";
import { Toolbar } from "./toolbar";
import { VersionFooter } from "./version-footer";
import { BlockActions } from "./block-actions";
import { BlockCloseButton } from "./block-close-button";
import { BlockMessages } from "./block-messages";
import { useSidebar } from "@/components/ui/sidebar";
import equal from "fast-deep-equal";
import type { Doc } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type Document = Doc<"documents">;

export const blockDefinitions = [codeBlock];
export type BlockKind = (typeof blockDefinitions)[number]["kind"];

export interface UIBlock {
  title: string;
  documentId: string;
  kind: BlockKind;
  content: string;
  isVisible: boolean;
  status: "streaming" | "idle";
  boundingBox: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

function PureBlock({
  chatId,
  input,
  setInput,
  handleSubmit,
  status,
  stop,
  attachments,
  setAttachments,
  append,
  messages,
  setMessages,
  reload,
  votes,
  isReadonly,
}: {
  chatId: string;
  input: string;
  setInput: UseChatHelpers["setInput"];
  status: UseChatHelpers["status"];
  stop: UseChatHelpers["stop"];
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers["setMessages"];
  votes: Array<Doc<"votes">> | undefined;
  append: UseChatHelpers["append"];
  handleSubmit: UseChatHelpers["handleSubmit"];
  reload: UseChatHelpers["reload"];
  isReadonly: boolean;
}) {
  const { block, setBlock, metadata, setMetadata } = useBlock();

  const documents = useQuery(
    api.documents.getDocumentVersions,
    block.documentId !== "init" && block.status !== "streaming"
      ? { documentId: block.documentId }
      : "skip",
  );

  const [mode, setMode] = useState<"edit" | "diff">("edit");
  const [document, setDocument] = useState<Document | null>(null);
  const [localCurrentVersionIndex, setLocalCurrentVersionIndex] = useState(-1);
  const [isContentDirty, setIsContentDirty] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const { open: isSidebarOpen } = useSidebar();
  const isDocumentsFetching = documents === undefined;

  const updateDocument = useMutation(api.documents.updateDocument);
  const previousStatusRef = useRef<string | null>(null);
  const justFinishedStreaming = useRef(false);

  useEffect(() => {
    if (previousStatusRef.current === "streaming" && block.status === "idle") {
      justFinishedStreaming.current = true;
    }
    previousStatusRef.current = block.status;
  }, [block.status]);

  useEffect(() => {
    if (justFinishedStreaming.current) {
      justFinishedStreaming.current = false;
      if (documents && documents.length > 0) {
        const mostRecentDocument = documents[0];
        if (mostRecentDocument) {
          setDocument(mostRecentDocument);
          setLocalCurrentVersionIndex(documents.length - 1);
        }
      }
      if (block.status !== "idle") {
        setBlock((currentBlock) => ({ ...currentBlock, status: "idle" }));
      }
      return;
    }

    if (documents && documents.length > 0) {
      const mostRecentDocument = documents[0];

      if (mostRecentDocument) {
        setDocument(mostRecentDocument);
        setLocalCurrentVersionIndex(documents.length - 1);

        setBlock((currentBlock) => ({
          ...currentBlock,
          status: "idle",
          content: mostRecentDocument.content ?? "",
        }));
      }
    } else {
    }
  }, [documents, setBlock, block.status]);

  const handleContentChange = useCallback(
    (updatedContent: string) => {
      if (!block) return;

      if (documents && documents.length > 0) {
        const currentDocument = documents[0];

        if (!currentDocument || !currentDocument.content) {
          setIsContentDirty(false);
          return;
        }

        if (currentDocument.content !== updatedContent) {
          const optimisticDocument = {
            ...currentDocument,
            content: updatedContent,
            _creationTime: Date.now(),
          };

          setDocument(optimisticDocument);
          setBlock((currentBlock) => ({
            ...currentBlock,
            content: updatedContent,
          }));

          updateDocument({
            documentId: block.documentId,
            content: updatedContent,
            userId: currentDocument.userId,
          })
            .then(() => {
              setIsContentDirty(false);
            })
            .catch((error) => {
              setDocument(currentDocument);
              setBlock((currentBlock) => ({
                ...currentBlock,
                content: currentDocument.content ?? "",
              }));
              console.error("Failed to update document:", error);
            });
        }
      } else if (block.documentId !== "init") {
      }
    },
    [block, documents, updateDocument, setBlock],
  );

  const debouncedHandleContentChange = useDebounceCallback(
    handleContentChange,
    2000,
  );

  const saveContent = useCallback(
    (updatedContent: string, debounce: boolean) => {
      if (document && updatedContent !== document.content) {
        setIsContentDirty(true);

        if (debounce) {
          debouncedHandleContentChange(updatedContent);
        } else {
          handleContentChange(updatedContent);
        }
      }
    },
    [document, debouncedHandleContentChange, handleContentChange],
  );

  function getDocumentContentById(index: number) {
    if (!documents) return "";
    if (!documents[index]) return "";
    return documents[index].content ?? "";
  }

  const handleVersionChange = (type: "next" | "prev" | "toggle" | "latest") => {
    if (!documents) return;

    if (type === "latest") {
      setLocalCurrentVersionIndex(documents.length - 1);
      setMode("edit");
    }

    if (type === "toggle") {
      setMode((mode) => (mode === "edit" ? "diff" : "edit"));
    }

    if (type === "prev") {
      if (localCurrentVersionIndex > 0) {
        setLocalCurrentVersionIndex((index) => index - 1);
      }
    } else if (type === "next") {
      if (localCurrentVersionIndex < documents.length - 1) {
        setLocalCurrentVersionIndex((index) => index + 1);
      }
    }
  };

  const isCurrentVersion =
    documents && documents.length > 0
      ? localCurrentVersionIndex === documents.length - 1
      : true;

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;

  const blockDefinition = blockDefinitions.find(
    (definition) => definition.kind === block.kind,
  );

  if (!blockDefinition) {
    throw new Error("Block definition not found");
  }

  useEffect(() => {
    if (block.documentId !== "init") {
      if (blockDefinition.initialize) {
        blockDefinition.initialize({
          documentId: block.documentId,
          setMetadata,
        });
      }
    }
  }, [block.documentId, blockDefinition, setMetadata]);

  return (
    <AnimatePresence>
      {block.isVisible && (
        <motion.div
          data-testid="block"
          className="flex flex-row h-dvh w-dvw fixed top-0 left-0 z-50 bg-transparent"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.4 } }}
        >
          {!isMobile && (
            <motion.div
              className="fixed bg-background h-dvh"
              initial={{
                width: isSidebarOpen ? windowWidth - 256 : windowWidth,
                right: 0,
              }}
              animate={{ width: windowWidth, right: 0 }}
              exit={{
                width: isSidebarOpen ? windowWidth - 256 : windowWidth,
                right: 0,
              }}
            />
          )}

          {!isMobile && (
            <motion.div
              className="relative w-[400px] bg-muted/50 h-dvh shrink-0"
              initial={{ opacity: 0, x: 10, scale: 1 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                },
              }}
              exit={{
                opacity: 0,
                x: 0,
                scale: 1,
                transition: { duration: 0 },
              }}
            >
              <AnimatePresence>
                {!isCurrentVersion && (
                  <motion.div
                    className="left-0 absolute h-dvh w-[400px] top-0 bg-zinc-900/50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              <div className="flex flex-col h-full justify-between items-center gap-4">
                <BlockMessages
                  chatId={chatId}
                  status={status}
                  votes={votes}
                  messages={messages}
                  setMessages={setMessages}
                  reload={reload}
                  isReadonly={isReadonly}
                  blockStatus={block.status}
                />

                <form className="flex flex-row gap-2 relative items-end w-full px-4 pb-4">
                  <MultiModalInput
                    chatId={chatId}
                    input={input}
                    setInput={setInput}
                    handleSubmit={handleSubmit}
                    status={status}
                    stop={stop}
                    attachments={attachments}
                    setAttachments={setAttachments}
                    messages={messages}
                    append={append}
                    className="bg-background dark:bg-muted"
                    setMessages={setMessages}
                  />
                </form>
              </div>
            </motion.div>
          )}

          <motion.div
            className="fixed dark:bg-muted bg-background h-dvh flex flex-col overflow-y-scroll"
            initial={
              isMobile
                ? {
                    opacity: 1,
                    x: block.boundingBox.left,
                    y: block.boundingBox.top,
                    height: block.boundingBox.height,
                    width: block.boundingBox.width,
                    borderRadius: 50,
                  }
                : {
                    opacity: 1,
                    x: block.boundingBox.left,
                    y: block.boundingBox.top,
                    height: block.boundingBox.height,
                    width: block.boundingBox.width,
                    borderRadius: 50,
                  }
            }
            animate={
              isMobile
                ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    height: windowHeight,
                    width: windowWidth ? windowWidth : "calc(100dvw)",
                    borderRadius: 0,
                    transition: {
                      delay: 0,
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      duration: 5000,
                    },
                  }
                : {
                    opacity: 1,
                    x: 400,
                    y: 0,
                    height: windowHeight,
                    width: windowWidth
                      ? windowWidth - 400
                      : "calc(100dvw-400px)",
                    borderRadius: 0,
                    transition: {
                      delay: 0,
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      duration: 5000,
                    },
                  }
            }
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 600,
                damping: 30,
              },
            }}
          >
            <div className="p-2 flex flex-row justify-between items-start">
              <div className="flex flex-row gap-4 items-start">
                <BlockCloseButton />

                <div className="flex flex-col">
                  <div className="font-medium">{block.title}</div>

                  {isContentDirty ? (
                    <div className="text-sm text-muted-foreground">
                      Saving changes...
                    </div>
                  ) : document ? (
                    <div className="text-sm text-muted-foreground">
                      {`Updated ${formatDistance(
                        new Date(document._creationTime),
                        new Date(),
                        {
                          addSuffix: true,
                        },
                      )}`}
                    </div>
                  ) : (
                    <div className="w-32 h-3 mt-2 bg-muted-foreground/20 rounded-md animate-pulse" />
                  )}
                </div>
              </div>

              <BlockActions
                block={block}
                currentVersionIndex={localCurrentVersionIndex}
                handleVersionChange={handleVersionChange}
                isCurrentVersion={isCurrentVersion}
                mode={mode}
                metadata={metadata}
                setMetadata={setMetadata}
              />
            </div>

            <div className="dark:bg-muted bg-background h-full overflow-y-scroll !max-w-full items-center">
              <blockDefinition.content
                title={block.title}
                content={
                  isCurrentVersion
                    ? block.content
                    : getDocumentContentById(localCurrentVersionIndex)
                }
                mode={mode}
                status={block.status}
                currentVersionIndex={localCurrentVersionIndex}
                suggestions={[]}
                onSaveContent={saveContent}
                isInline={false}
                isCurrentVersion={isCurrentVersion}
                getDocumentContentById={getDocumentContentById}
                isLoading={isDocumentsFetching && !block.content}
                metadata={metadata}
                setMetadata={setMetadata}
              />

              <AnimatePresence>
                {isCurrentVersion && (
                  <Toolbar
                    isToolbarVisible={isToolbarVisible}
                    setIsToolbarVisible={setIsToolbarVisible}
                    append={append}
                    status={status}
                    stop={stop}
                    setMessages={setMessages}
                    blockKind={block.kind}
                  />
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {!isCurrentVersion && (
                <VersionFooter
                  currentVersionIndex={localCurrentVersionIndex}
                  documents={documents}
                  handleVersionChange={handleVersionChange}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const Block = memo(PureBlock, (prevProps, nextProps) => {
  if (prevProps.status !== nextProps.status) return false;
  if (!equal(prevProps.votes, nextProps.votes)) return false;
  if (prevProps.input !== nextProps.input) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;

  return true;
});
