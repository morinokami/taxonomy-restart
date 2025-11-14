import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import Stripe from "stripe";

import { proPlan } from "@/config/subscription";
import type { Result } from "@/types";
import { absoluteUrl } from "../utils";
import { getSubscriptionPlan, getUserInfo } from "./auth";

const billingUrl = absoluteUrl("/dashboard/billing");

export const createStripe = createServerOnlyFn(async () => {
	return new Stripe(process.env.STRIPE_API_KEY ?? "");
});

export const manageSubscription = createServerFn().handler(
	async (): Promise<Result<{ url: string }>> => {
		try {
			const { isAuthenticated, userId } = await auth();

			if (!isAuthenticated) {
				return { success: false, error: "Unauthorized" };
			}

			const user = await getUserInfo({ data: { userId } });

			const subscriptionPlan = await getSubscriptionPlan({ data: { userId } });

			const stripe = await createStripe();

			// The user is on the pro plan.
			// Create a portal session to manage subscription.
			if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
				const stripeSession = await stripe.billingPortal.sessions.create({
					customer: subscriptionPlan.stripeCustomerId,
					return_url: billingUrl,
				});

				return { success: true, data: { url: stripeSession.url } };
			}

			// The user is on the free plan.
			// Create a checkout session to upgrade.
			const stripeSession = await stripe.checkout.sessions.create({
				success_url: billingUrl,
				cancel_url: billingUrl,
				payment_method_types: ["card"],
				mode: "subscription",
				billing_address_collection: "auto",
				customer_email: user.email,
				line_items: [
					{
						price: proPlan.stripePriceId,
						quantity: 1,
					},
				],
				metadata: {
					userId,
				},
			});

			return { success: true, data: { url: stripeSession.url ?? "" } };
		} catch (_) {
			console.error(_);
			return { success: false, error: "Unexpected error" };
		}
	},
);
