import { createFileRoute } from "@tanstack/react-router";
import { generateMetadata } from "tanstack-meta";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserNameForm } from "@/components/user-name-form";
import { getUserInfo } from "@/lib/functions/auth";

export const Route = createFileRoute(
	"/(dashboard)/dashboard/_dashboard-layout/settings/",
)({
	component: SettingsPage,
	loader: async ({ context }) =>
		await getUserInfo({ data: { userId: context.userId } }),
	head: () => {
		const { meta } = generateMetadata({
			title: "Settings | Taxonomy Restart",
			description: "Settings for your account",
		});

		return {
			meta,
		};
	},
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
