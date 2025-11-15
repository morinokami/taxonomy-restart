import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(docs)/_docs-layout/guides/_layout")({
	component: Layout,
});

function Layout() {
	return (
		<div className="mx-auto max-w-5xl">
			<Outlet />
		</div>
	);
}
