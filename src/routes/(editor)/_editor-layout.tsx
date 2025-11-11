import { createFileRoute, Outlet } from "@tanstack/react-router";

import { getAuthState } from "@/lib/functions/auth";

export const Route = createFileRoute("/(editor)/_editor-layout")({
	component: RouteComponent,
	beforeLoad: async () => await getAuthState(),
});

function RouteComponent() {
	return (
		<div className="container mx-auto grid items-start gap-10 py-8">
			<Outlet />
		</div>
	);
}
