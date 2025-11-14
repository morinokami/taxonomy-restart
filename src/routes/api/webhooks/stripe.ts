import { createFileRoute } from "@tanstack/react-router";
import type Stripe from "stripe";

import { createClerk } from "@/lib/functions/auth";
import { createStripe } from "@/lib/functions/subscription";

export const Route = createFileRoute("/api/webhooks/stripe")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = await request.text();
				const signature = request.headers.get("stripe-signature") as string;

				const clerk = await createClerk();
				const stripe = await createStripe();

				let event: Stripe.Event;

				try {
					event = stripe.webhooks.constructEvent(
						body,
						signature,
						process.env.STRIPE_WEBHOOK_SECRET ?? "",
					);
				} catch (error) {
					return new Response(
						`Webhook Error: ${error instanceof Error ? error.message : "Unknown error"}`,
						{
							status: 400,
						},
					);
				}

				const session = event.data.object as Stripe.Checkout.Session;
				const user = await clerk.users.getUser(session.metadata?.userId ?? "");

				if (!user) {
					return new Response("User not found", {
						status: 400,
					});
				}

				if (event.type === "checkout.session.completed") {
					// Retrieve the subscription details from Stripe.
					const subscription = await stripe.subscriptions.retrieve(
						session.subscription as string,
					);

					// Update the user stripe into in our database.
					// Since this is the initial subscription, we need to update
					// the subscription id and customer id.
					clerk.users.updateUserMetadata(user.id, {
						privateMetadata: {
							stripeSubscriptionId: subscription.id,
							stripeCustomerId: subscription.customer as string,
							stripePriceId: subscription.items.data[0].price.id,
							stripeCurrentPeriodEnd: new Date(
								subscription.items.data[0].current_period_end * 1000,
							),
						},
					});
				}

				if (event.type === "invoice.payment_succeeded") {
					// Retrieve the subscription details from Stripe.
					const subscription = await stripe.subscriptions.retrieve(
						session.subscription as string,
					);

					// Update the price id and set the new period end.
					clerk.users.updateUserMetadata(user.id, {
						privateMetadata: {
							stripePriceId: subscription.items.data[0].price.id,
							stripeCurrentPeriodEnd: new Date(
								subscription.items.data[0].current_period_end * 1000,
							).getTime(),
						},
					});
				}

				return new Response(null, { status: 200 });
			},
		},
	},
});
