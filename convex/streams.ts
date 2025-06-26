import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createStreamId = mutation({
  args: { streamId: v.string(), chatId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('streams', {
      streamId: args.streamId,
      chatId: args.chatId,
    });
  },
});

export const getStreamIdsByChatId = query({
  args: { chatId: v.string() },
  handler: async (ctx, args) => {
    const streams = await ctx.db
      .query('streams')
      .withIndex('by_chatId', (q) => q.eq('chatId', args.chatId))
      .collect();

    return streams.map((s) => s.streamId);
  },
});
