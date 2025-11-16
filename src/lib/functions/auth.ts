import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import * as v from "valibot";

import { freePlan, proPlan } from "@/config/subscription";
import type { UserSubscriptionPlan } from "@/types";
import { createStripe } from "./subscription";

export const createClerk = createServerOnlyFn(async () => {
	return createClerkClient({
		secretKey: process.env.CLERK_SECRET_KEY,
	});
});

export const redirectIfAuthenticated = createServerFn({
	method: "GET",
}).handler(async () => {
	const { isAuthenticated } = await auth();

	if (isAuthenticated) {
		throw redirect({
			to: "/dashboard",
		});
	}
});

export const getAuthState = createServerFn({ method: "GET" }).handler(
	async () => {
		const { isAuthenticated, userId } = await auth();

		if (!isAuthenticated) {
			throw redirect({
				to: "/login",
			});
		}

		return { userId };
	},
);

export const getUserInfo = createServerFn({ method: "GET" })
	.inputValidator(v.object({ userId: v.string() }))
	.handler(async ({ data }) => {
		const clerkClient = createClerkClient({
			secretKey: process.env.CLERK_SECRET_KEY,
		});

		const user = await clerkClient.users.getUser(data.userId);

		return {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.primaryEmailAddress?.emailAddress,
		};
	});

export const getSubscriptionPlan = createServerFn()
	.inputValidator(v.object({ userId: v.string() }))
	.handler(async ({ data }): Promise<UserSubscriptionPlan> => {
		const clerk = await createClerk();
		const stripe = await createStripe();

		const user = await clerk.users.getUser(data.userId);
		const userMetadata = user.privateMetadata as {
			stripePriceId?: string;
			stripeCustomerId?: string;
			stripeSubscriptionId?: string;
			stripeCurrentPeriodEnd?: string;
		};

		// Check if user is on a pro plan.
		const isPro = !!(
			userMetadata.stripePriceId &&
			userMetadata.stripeCurrentPeriodEnd &&
			new Date(userMetadata.stripeCurrentPeriodEnd).getTime() + 86_400_000 >
				Date.now()
		);

		const plan = isPro ? proPlan : freePlan;

		// If user has a pro plan, check cancel status on Stripe.
		let isCanceled = false;
		if (isPro && userMetadata.stripeSubscriptionId) {
			const stripePlan = await stripe.subscriptions.retrieve(
				userMetadata.stripeSubscriptionId,
			);
			isCanceled = stripePlan.cancel_at_period_end;
		}

		return {
			...plan,
			stripeCustomerId: userMetadata.stripeCustomerId ?? "",
			stripeSubscriptionId: userMetadata.stripeSubscriptionId ?? "",
			stripePriceId: userMetadata.stripePriceId ?? "",
			stripeCurrentPeriodEnd: new Date(
				userMetadata.stripeCurrentPeriodEnd ?? "",
			).getTime(),
			isPro,
			isCanceled,
		};
	});
