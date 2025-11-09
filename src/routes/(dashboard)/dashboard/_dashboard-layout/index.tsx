import { SignOutButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(dashboard)/dashboard/_dashboard-layout/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <SignOutButton />;
}
