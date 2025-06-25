import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const deleteTrailingMessages = mutation({
  args: { messageId: v.string() },
  handler: async (ctx, { messageId }) => {
    const message = await ctx.db
      .query("messages")
      .withIndex("by_messageId", (q) => q.eq("messageId", messageId))
      .first();

    if (!message) {
      throw new Error(`Message not found with id: ${messageId}`);
    }

    const messagesToDelete = await ctx.db
      .query("messages")
      .withIndex("by_chatId", (q) => q.eq("chatId", message.chatId))
      .filter((q) => q.gte(q.field("_creationTime"), message._creationTime))
      .collect();

    for (const msg of messagesToDelete) {
      const votes = await ctx.db
        .query("votes")
        .withIndex("by_messageId", (q) => q.eq("messageId", msg.messageId))
        .collect();

      if (votes.length > 0) {
        await Promise.all(votes.map((vote) => ctx.db.delete(vote._id)));
      }
    }

    await Promise.all(messagesToDelete.map((msg) => ctx.db.delete(msg._id)));

    return { success: true };
  },
});

export const saveMessages = mutation({
  args: {
    messages: v.array(
      v.object({
        messageId: v.string(),
        chatId: v.string(),
        role: v.union(
          v.literal("user"),
          v.literal("assistant"),
          v.literal("tool"),
        ),
        parts: v.array(v.any()),
        attachments: v.optional(
          v.array(
            v.object({
              url: v.string(),
              name: v.string(),
              contentType: v.string(),
            }),
          ),
        ),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existingMessages: {
      messageId: string;
      _id: string;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      [key: string]: any;
    }[] = [];
    for (const msg of args.messages) {
      const existing = await ctx.db
        .query("messages")
        .withIndex("by_messageId", (q) => q.eq("messageId", msg.messageId))
        .first();
      if (existing) existingMessages.push(existing);
    }

    const messagesToInsert = args.messages.filter(
      (msg) =>
        !existingMessages.some(
          (existing) => existing.messageId === msg.messageId,
        ),
    );

    if (messagesToInsert.length > 0) {
      return await Promise.all(
        messagesToInsert.map((message) => ctx.db.insert("messages", message)),
      );
    }
    return [];
  },
});

export const getMessagesByChatId = query({
  args: { chatId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
      .order("asc")
      .collect();
  },
});
