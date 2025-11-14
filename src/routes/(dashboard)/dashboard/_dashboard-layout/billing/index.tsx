import { createFileRoute } from "@tanstack/react-router";

import { BillingForm } from "@/components/billing-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAuthState, getSubscriptionPlan } from "@/lib/functions/auth";

export const Route = createFileRoute(
	"/(dashboard)/dashboard/_dashboard-layout/billing/",
)({
	component: BillingPage,
	beforeLoad: async () => await getAuthState(),
	loader: async ({ context }) =>
		await getSubscriptionPlan({ data: { userId: context.userId } }),
});

function BillingPage() {
	const subscriptionPlan = Route.useLoaderData();

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Billing"
				text="Manage billing and your subscription plan."
			/>
			<div className="grid gap-8">
				<Alert>
					<Icons.warning />
					<AlertTitle>This is a demo app.</AlertTitle>
					<AlertDescription className="block">
						Taxonomy app is a demo app using a Stripe test environment. You can
						find a list of test card numbers on the{" "}
						<a
							href="https://stripe.com/docs/testing#cards"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-8"
						>
							Stripe docs
						</a>
						.
					</AlertDescription>
				</Alert>
				<BillingForm subscriptionPlan={subscriptionPlan} />
			</div>
		</DashboardShell>
	);
}
