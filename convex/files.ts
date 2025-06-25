import { mutation, action, query } from "./_generated/server";
import { v, Base64 } from "convex/values";

export const generateAttachmentUrl = mutation({
  args: {
    contentType: v.string(),
  },
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getAttachmentUrl = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
    contentType: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Failed to get attachment URL");
    return {
      storageId: args.storageId,
      name: args.name,
      type: args.contentType,
      url,
    };
  },
});

export const storeAiImage = action({
  args: {
    base64Image: v.string(),
  },
  handler: async (ctx, args) => {
    const base64Data = args.base64Image.replace(/^data:image\/\w+;base64,/, "");
    const bytes = Base64.toByteArray(base64Data);
    const blob = new Blob([bytes], { type: "image/png" });
    const storageId = await ctx.storage.store(blob);
    return { storageId };
  },
});

export const getAiImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) {
      throw new Error("Failed to get image URL");
    }
    return { url };
  },
});
