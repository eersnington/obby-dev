import { env } from "@/env";
import { WorkOS } from "@workos-inc/node";

const workos = new WorkOS(env.WORKOS_API_KEY, {
  clientId: env.WORKOS_CLIENT_ID,
});

export { workos };
