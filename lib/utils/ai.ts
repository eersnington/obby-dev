import type {
  Attachment,
  CoreAssistantMessage,
  CoreToolMessage,
  UIMessage,
} from "ai";
import type { Doc } from "@/convex/_generated/dataModel";

type DBMessage = Doc<"messages">;
type DBDocument = Doc<"documents">;

export function convertToUIMessages(
  messages: Array<DBMessage>,
): Array<UIMessage> {
  return messages.map((message) => ({
    id: message._id,
    role: message.role as UIMessage["role"],
    parts: message.parts as UIMessage["parts"],
    content: "",
    createdAt: new Date(message._creationTime),
    experimental_attachments: (message.attachments as Array<Attachment>) ?? [],
  }));
}

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage;
type ResponseMessage = ResponseMessageWithoutId & { id: string };

export function getMostRecentUserMessage(messages: Array<UIMessage>) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.at(-1);
}

export function getDocumentTimestampByIndex(
  documents: Array<DBDocument>,
  index: number,
) {
  if (!documents) return new Date();
  if (index > documents.length) return new Date();

  return documents[index]._creationTime;
}

export function getTrailingMessageId({
  messages,
}: {
  messages: Array<ResponseMessage>;
}): string | null {
  const trailingMessage = messages.at(-1);

  if (!trailingMessage) return null;

  return trailingMessage.id;
}

export function isFileInArray(file: File, existingFiles: File[]) {
  return existingFiles.some(
    (existing) =>
      existing.name === file.name &&
      existing.size === file.size &&
      existing.type === file.type,
  );
}
