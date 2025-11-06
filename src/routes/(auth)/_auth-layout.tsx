import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth-layout")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="min-h-screen">
			<Outlet />
		</div>
	);
}
