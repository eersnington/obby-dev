import { internalQuery } from "./_generated/server";
import schema from "./schema";
import { crud } from "convex-helpers/server/crud";

const organizationFields = schema.tables.organizations.validator.fields;

export const { create, destroy, update } = crud(schema, "organizations");

export const getByWorkOSId = internalQuery({
  args: { workosId: organizationFields.workosId },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .filter((q) => q.eq(q.field("workosId"), args.workosId))
      .first();
    return organization;
  },
});
