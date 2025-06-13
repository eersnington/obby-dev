import { env } from "@/env";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_API_KEY as string);

export { stripe };
