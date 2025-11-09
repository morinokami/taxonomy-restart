import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(dashboard)/dashboard/_dashboard-layout/billing/",
)({
	component: BillingPage,
});

function BillingPage() {
	return <div>Hello "/(dashboard)/dashboard/_dashboard-layout/billing/"!</div>;
}
