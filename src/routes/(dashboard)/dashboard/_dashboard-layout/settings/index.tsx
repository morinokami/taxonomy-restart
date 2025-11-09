import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(dashboard)/dashboard/_dashboard-layout/settings/",
)({
	component: SettingsPage,
});

function SettingsPage() {
	return <div>Hello "/(dashboard)/dashboard/_dashboard-layout/settings/"!</div>;
}
