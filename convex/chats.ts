import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";
import schema from "./schema";
import { crud } from "convex-helpers/server/crud";

const chatFields = schema.tables.chats.validator.fields;

export const { create, destroy, update } = crud(schema, "chats");

export const createChat = mutation({
    args: {
        user_id: v.id("users"),
        messages: v.any(),
        fileData: v.optional(v.any()),
        visibility: v.optional(v.union(v.literal("private"), v.literal("public"))),
    },
    handler: async (ctx, args) => {
        const chat = await ctx.db.insert("chats", {
            user_id: args.user_id,
            messages: args.messages,
            fileData: args.fileData,
            visibility: args.visibility ?? "private", // Default visibility
        });
        return chat;
    },
});

export const getChatById = query({
    args: { id: v.id("chats") },
    handler: async (ctx, args) => {
      const chat = await ctx.db.get(args.id);
      return chat;
    },
  });

export const getChatsByUserID = query({
    args: { user_id: v.id("users") },
    handler: async (ctx, args) => {
      const chats = await ctx.db
        .query("chats")
        .withIndex("by_user_id", (q) => q.eq("user_id", args.user_id))
        .collect();
      return chats;
    },
  });

export const getChatsByVisibility = query({
    args: { visibility: v.union(v.literal("private"), v.literal("public")) },
    handler: async (ctx, args) => {
      const chats = await ctx.db
        .query("chats")
        .withIndex("by_visibility", (q) => q.eq("visibility", args.visibility))
        .collect();
      return chats;
    },
  });

export const getPublicChats = query({
    args: {},
    handler: async (ctx) => {
      const chats = await ctx.db
        .query("chats")
        .withIndex("by_visibility", (q) => q.eq("visibility", "public"))
        .collect();
      return chats;
    },
  });

export const getUserChatsByVisibility = query({
    args: { 
      user_id: v.id("users"), 
      visibility: v.union(v.literal("private"), v.literal("public"))
    },
    handler: async (ctx, args) => {
      const chats = await ctx.db
        .query("chats")
        .withIndex("by_user_visibility", (q) => 
          q.eq("user_id", args.user_id).eq("visibility", args.visibility)
        )
        .collect();
      return chats;
    },
  });

export const getUserPrivateChats = query({
    args: { user_id: v.id("users") },
    handler: async (ctx, args) => {
      const chats = await ctx.db
        .query("chats")
        .withIndex("by_user_visibility", (q) => 
          q.eq("user_id", args.user_id).eq("visibility", "private")
        )
        .collect();
      return chats;
    },
  });

export const getUserPublicChats = query({
    args: { user_id: v.id("users") },
    handler: async (ctx, args) => {
      const chats = await ctx.db
        .query("chats")
        .withIndex("by_user_visibility", (q) => 
          q.eq("user_id", args.user_id).eq("visibility", "public")
        )
        .collect();
      return chats;
    },
  });

export const updateChatVisibility = mutation({
    args: { 
      id: v.id("chats"), 
      visibility: v.union(v.literal("private"), v.literal("public"))
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.id, { visibility: args.visibility });
      return { success: true };
    },
  });

export const addMessageToChat = mutation({
    args: { 
      id: v.id("chats"), 
      messages: v.any()
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.id, { messages: args.messages });
      return { success: true };
    },
  });
