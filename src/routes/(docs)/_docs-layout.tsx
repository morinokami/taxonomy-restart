import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { DocsSidebarNav } from "@/components/doc-sidebar-nav";
import { DocsSearch } from "@/components/docs-search";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/(docs)/_docs-layout")({
	component: DocsLayout,
});

function DocsLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-40 w-full border-b bg-background">
				<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
					<MainNav items={docsConfig.mainNav}>
						<DocsSidebarNav items={docsConfig.sidebarNav} />
					</MainNav>
					<div className="flex flex-1 items-center space-x-4 sm:justify-end">
						<div className="flex-1 sm:grow-0">
							<DocsSearch />
						</div>
						<nav className="flex space-x-4">
							<Link
								to={siteConfig.links.github}
								target="_blank"
								rel="noreferrer"
							>
								<Icons.gitHub className="h-7 w-7" />
								<span className="sr-only">GitHub</span>
							</Link>
						</nav>
					</div>
				</div>
			</header>
			<div className="container flex-1">
				<Outlet />
			</div>
			<SiteFooter className="border-t" />
		</div>
	);
}
