import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const saveDocument = mutation({
  args: {
    documentId: v.string(),
    title: v.string(),
    kind: v.union(v.literal('code'), v.literal('fragment')),
    content: v.string(),
    userId: v.string(),
    chatId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('documents', args);
  },
});

export const getDocumentById = query({
  args: { documentId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('documents')
      .withIndex('by_documentId', (q) => q.eq('documentId', args.documentId))
      .first();
  },
});

export const updateDocument = mutation({
  args: {
    documentId: v.string(),
    content: v.optional(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const latestVersion = await ctx.db
      .query('documents')
      .withIndex('by_documentId', (q) => q.eq('documentId', args.documentId))
      .order('desc')
      .first();

    if (!latestVersion) {
      throw new Error('Cannot update document: No existing version found.');
    }

    const newVersionId = await ctx.db.insert('documents', {
      documentId: args.documentId,
      userId: args.userId,
      title: latestVersion.title,
      kind: latestVersion.kind,
      content: args.content ?? latestVersion.content,
      chatId: latestVersion.chatId,
    });

    return newVersionId;
  },
});

export const deleteDocumentsByIdAfterTimestamp = mutation({
  args: {
    documentId: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const suggestions = await ctx.db
      .query('suggestions')
      .withIndex('by_documentId', (q) => q.eq('documentId', args.documentId))
      .filter((q) => q.gt(q.field('_creationTime'), args.timestamp))
      .collect();

    for (const s of suggestions) {
      await ctx.db.delete(s._id);
    }

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_documentId', (q) => q.eq('documentId', args.documentId))
      .filter((q) => q.gt(q.field('_creationTime'), args.timestamp))
      .collect();

    for (const d of documents) {
      await ctx.db.delete(d._id);
    }
  },
});

export const getDocumentVersions = query({
  args: { documentId: v.string() },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query('documents')
      .withIndex('by_documentId', (q) => q.eq('documentId', args.documentId))
      .order('desc')
      .collect();

    return documents;
  },
});
