import { internalQuery, query } from "./_generated/server";
import schema from "./schema";
import { crud } from "convex-helpers/server/crud";

const userFields = schema.tables.users.validator.fields;

export const { create, destroy, update } = crud(schema, "users");

// Internal query: only callable from other Convex functions (not from the client)
export const getByWorkOSId = internalQuery({
  args: { userId: userFields.userId },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    return user;
  },
});

// Public query for server actions
export const getByWorkOSIdQuery = query({
  args: { workos_id: userFields.userId },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.workos_id))
      .first();
    return user;
  },
});
