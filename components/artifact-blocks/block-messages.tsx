import { memo } from "react";
import type { UIMessage } from "ai";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { Doc } from "@/convex/_generated/dataModel";
import equal from "fast-deep-equal";
import { PreviewMessage } from "./message";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import type { UIBlock } from "./block";

interface BlockMessagesProps {
  chatId: string;
  status: UseChatHelpers["status"];
  votes: Array<Doc<"votes">> | undefined;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
  isReadonly: boolean;
  blockStatus: UIBlock["status"];
}

function PureBlockMessages({
  chatId,
  status,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
}: BlockMessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>(null);

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col gap-4 h-full items-center overflow-y-scroll px-4 pt-20"
    >
      {messages.map((message, index) => (
        <PreviewMessage
          chatId={chatId}
          key={message.id}
          message={message}
          isLoading={status === "streaming" && index === messages.length - 1}
          vote={
            votes
              ? votes.find((vote) => vote.messageId === message.id)
              : undefined
          }
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
        />
      ))}

      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}

function areEqual(
  prevProps: BlockMessagesProps,
  nextProps: BlockMessagesProps,
) {
  if (
    prevProps.blockStatus === "streaming" &&
    nextProps.blockStatus === "streaming"
  )
    return true;

  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.status && nextProps.status) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.votes, nextProps.votes)) return false;

  return true;
}

export const BlockMessages = memo(PureBlockMessages, areEqual);
