'use node';

import { internalAction } from './_generated/server';
import { v } from 'convex/values';
import { Stripe } from 'stripe';

export const verifyStripeWebhook = internalAction({
  args: v.object({
    payload: v.string(),
    signature: v.string(),
  }),
  handler: async (_ctx, args) => {
    const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

    return await stripe.webhooks.constructEvent(
      args.payload,
      args.signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  },
});
