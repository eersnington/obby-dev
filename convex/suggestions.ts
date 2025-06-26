import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const saveSuggestions = mutation({
  args: {
    suggestions: v.array(
      v.object({
        suggestionId: v.string(),
        documentId: v.string(),
        originalText: v.string(),
        suggestedText: v.string(),
        description: v.optional(v.string()),
        isResolved: v.boolean(),
        userId: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    return await Promise.all(
      args.suggestions.map((suggestion) =>
        ctx.db.insert('suggestions', suggestion),
      ),
    );
  },
});

export const getSuggestionsByDocumentId = query({
  args: { documentId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('suggestions')
      .withIndex('by_documentId', (q) => q.eq('documentId', args.documentId))
      .collect();
  },
});
