"use server";

import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Id } from "@/convex/_generated/dataModel";
import type { MessageText, MessageImage, Message } from "lib/ai/messages";

export async function createChatFromMessage({
  message,
  files,
}: {
  message: string;
  files?: File[];
}) {
  try {
    const { user } = await withAuth({ ensureSignedIn: true });

    if (!user) {
      throw new Error("User not authenticated");
    }

    const convexUser = await fetchQuery(api.users.getByWorkOSIdQuery, {
      workos_id: user.id,
    });

    if (!convexUser) {
      throw new Error("User not found in database");
    }

    // Handle file attachments if present
    let fileData = undefined;
    if (files && files.length > 0) {
      // Convert files to base64 for storage
      const filePromises = files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        return {
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
        };
      });
      fileData = await Promise.all(filePromises);
    }

    const content: Array<MessageText | MessageImage> = [
      { type: "text", text: message },
    ];

    if (fileData && fileData.length > 0) {
      for (const file of fileData) {
        if (file.type.startsWith("image/")) {
          content.push({
            type: "image",
            image: `data:${file.type};base64,${file.data}`,
          });
        }
      }
    }

    const initialUserMessage: Message = {
      role: "user",
      content,
    };

    // Create chat with initial message but placeholder title
    const chatId = await fetchMutation(api.chats.createChat, {
      userId: convexUser._id,
      title: "New Chat", // Placeholder title, will be updated client-side
      messages: [initialUserMessage], // Start with the initial user message
      fileData,
      visibility: "private",
    });

    revalidatePath("/");

    return { chatId, success: true };
  } catch (error) {
    console.error("Error creating chat:", error);
    return { success: false, error: "Failed to create chat" };
  }
}

export async function redirectToChat(chatId: Id<"chats">) {
  redirect(`/chat/${chatId}`);
}
