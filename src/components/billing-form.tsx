import { useState } from "react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { manageSubscription } from "@/lib/functions/subscription";
import { cn, formatDate } from "@/lib/utils";
import type { UserSubscriptionPlan } from "@/types";

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
	subscriptionPlan: UserSubscriptionPlan & {
		isCanceled: boolean;
	};
}

export function BillingForm({
	subscriptionPlan,
	className,
	...props
}: BillingFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(!isLoading);

		// Get a Stripe session URL.
		const result = await manageSubscription();

		if (!result.success) {
			return toast.error("Something went wrong.", {
				description: "Please refresh the page and try again.",
			});
		}

		// Redirect to the Stripe session.
		// This could be a checkout page for initial upgrade.
		// Or portal to manage existing subscription.
		const session = result.data;
		if (session) {
			window.location.href = session.url;
		}
	}

	return (
		<form className={cn(className)} onSubmit={onSubmit} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Subscription Plan</CardTitle>
					<CardDescription>
						You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
						plan.
					</CardDescription>
				</CardHeader>
				<CardContent>{subscriptionPlan.description}</CardContent>
				<CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
					<button
						type="submit"
						className={cn(buttonVariants())}
						disabled={isLoading}
					>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						{subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
					</button>
					{subscriptionPlan.isPro ? (
						<p className="rounded-full font-medium text-xs">
							{subscriptionPlan.isCanceled
								? "Your plan will be canceled on "
								: "Your plan renews on "}
							{formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
						</p>
					) : null}
				</CardFooter>
			</Card>
		</form>
	);
}
