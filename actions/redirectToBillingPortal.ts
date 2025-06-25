"use server";

import { redirect } from "next/navigation";
import { stripe } from "../app/(legacy)/api/stripe";
import { workos } from "@/app/(legacy)/api/workos";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { env } from "env";

export default async function redirectToBillingPortal(path: string) {
  const { organizationId } = await withAuth();

  const response = await fetch(
    `${workos.baseURL}/organizations/${organizationId}`,
    {
      headers: {
        Authorization: `Bearer ${env.WORKOS_API_KEY}`,
        "content-type": "application/json",
      },
    },
  );
  const workosOrg = await response.json();

  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  const billingPortalSession = await stripe.billingPortal.sessions.create({
    customer: workosOrg?.stripe_customer_id,
    return_url: `${baseUrl}/dashboard/${path}`,
  });

  redirect(billingPortalSession?.url);
}
