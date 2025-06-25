import type Stripe from "stripe";
import { stripe } from "../stripe";
import { workos } from "../workos";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "env";

export const POST = async (req: NextRequest) => {
  const { userId, orgName, subscriptionLevel } = await req.json();

  try {
    const organization = await workos.organizations.createOrganization({
      name: orgName,
    });

    await workos.userManagement.createOrganizationMembership({
      organizationId: organization.id,
      userId,
      roleSlug: "admin",
    });

    // Retrieve price ID from Stripe
    // The Stripe look up key for the price *must* be the same as the subscription level string
    let price: Stripe.ApiList<Stripe.Price>;

    try {
      price = await stripe.prices.list({
        lookup_keys: [subscriptionLevel],
      });
    } catch (error) {
      console.error(
        "Error retrieving price from Stripe. This is likely because the products and prices have not been created yet. Run the setup script `pnpm run setup` to automatically create them.",
        error,
      );
      return NextResponse.json(
        { error: "Error retrieving price from Stripe" },
        { status: 500 },
      );
    }

    const user = await workos.userManagement.getUser(userId);

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        workOSOrganizationId: organization.id,
      },
    });

    // Update WorkOS organization with Stripe customer ID
    // This will allow WorkOS to automatically add entitlements to the access token
    await workos.organizations.updateOrganization({
      organization: organization.id,
      stripeCustomerId: customer.id,
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      billing_address_collection: "auto",
      line_items: [
        {
          price: price.data[0].id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    console.error(errorMessage, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
