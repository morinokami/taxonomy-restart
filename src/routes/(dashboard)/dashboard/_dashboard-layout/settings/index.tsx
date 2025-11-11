import { createFileRoute } from "@tanstack/react-router";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserNameForm } from "@/components/user-name-form";
import { getUserName } from "@/lib/functions/auth";

export const Route = createFileRoute(
	"/(dashboard)/dashboard/_dashboard-layout/settings/",
)({
	component: SettingsPage,
	loader: async ({ context }) =>
		await getUserName({ data: { userId: context.userId } }),
	head: () => ({
		meta: [
			{
				title: "Pricing | Taxonomy Restart",
				description: "Settings for your account",
			},
		],
	}),
});

function SettingsPage() {
	const { firstName, lastName } = Route.useLoaderData();

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Settings"
				text="Manage account and website settings."
			/>
			<div className="grid gap-10">
				<UserNameForm firstName={firstName} lastName={lastName} />
			</div>
		</DashboardShell>
	);
}
