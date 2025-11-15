import { createFileRoute, Outlet } from "@tanstack/react-router";

import { DocsSidebarNav } from "@/components/doc-sidebar-nav";
import { docsConfig } from "@/config/docs";

export const Route = createFileRoute("/(docs)/_docs-layout/docs/_layout")({
	component: Layout,
});

function Layout() {
	return (
		<div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
			<aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
				<DocsSidebarNav items={docsConfig.sidebarNav} />
			</aside>
			<Outlet />
		</div>
	);
}
