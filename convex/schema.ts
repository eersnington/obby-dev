import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),

    firstName: v.string(),
    lastName: v.union(v.string(), v.null()),
  })
    .index("by_email", ["email"])
    .index("by_userId", ["userId"]),

  chats: defineTable({
    chatId: v.string(),
    userId: v.string(),
    isPinned: v.optional(v.boolean()),

    title: v.string(),
    visibility: v.union(v.literal("private"), v.literal("public")),
  })
    .index("by_userId", ["userId"])
    .index("by_chatId", ["chatId"]),

  messages: defineTable({
    messageId: v.string(),
    chatId: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("tool")),

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
  })
    .index("by_messageId", ["messageId"])
    .index("by_chatId", ["chatId"]),

  documents: defineTable({
    title: v.string(),
    content: v.string(),
    kind: v.union(v.literal("code")),
    documentId: v.string(),
    userId: v.string(),
    chatId: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_documentId", ["documentId"])
    .index("by_chatId", ["chatId"]),

  suggestions: defineTable({
    originalText: v.string(),
    suggestedText: v.string(),
    description: v.optional(v.string()),
    isResolved: v.boolean(),
    documentId: v.string(),
    suggestion_id: v.string(),
    userId: v.string(),
  })
    .index("by_documentId", ["documentId"])
    .index("by_userId", ["userId"]),

  votes: defineTable({
    chatId: v.string(),
    messageId: v.string(),
    isUpvoted: v.boolean(),
  })
    .index("by_messageId", ["messageId"])
    .index("by_chatId", ["chatId"]),

  streams: defineTable({
    streamId: v.string(),
    chatId: v.string(),
  }).index("by_chatId", ["chatId"]),

  // WIP
  organizations: defineTable({
    workosId: v.string(),
    name: v.string(),
  }).index("by_workosId", ["workosId"]),

  // WIP
  projects: defineTable({
    userId: v.string(),
    organizationId: v.id("organizations"),
    name: v.string(),
    description: v.string(),
    chats: v.optional(v.array(v.id("chats"))),
  })
    .index("by_userId", ["userId"])
    .index("by_organizationId", ["organizationId"]),
});
