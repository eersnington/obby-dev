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
    },
    handler: async (ctx, args) => {
        const chat = await ctx.db.insert("chats", {
            user_id: args.user_id,
            messages: args.messages,
            visibility: "private", // Default visibility
        });
        return chat;
    }
})


export const getChatById = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {

      const chat = await ctx.db
        .query("chats")
        .withIndex("by__id", q => q.eq("_id", args.id))
        .first();
      return chat;
    },
  });

  export const getChatsByUserID = query({
    args: { user_id: v.id("users") },
    handler: async (ctx, args) => {
      const chats = await ctx.db
        .query("chats")
        .withIndex("by_user_id", q => q.eq("user_id", args.user_id))
        .collect();
      return chats;
    },
  });