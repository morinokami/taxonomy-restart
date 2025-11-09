import { SignedOut } from "@clerk/tanstack-react-start";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(marketing)/_marketing-layout")({
	component: MarketingLayout,
});

function MarketingLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="container z-40 bg-background">
				<div className="flex h-20 items-center justify-between py-6">
					<MainNav items={marketingConfig.mainNav} />
					<nav>
						<SignedOut>
							<Link
								to="/login"
								className={cn(
									buttonVariants({ variant: "secondary", size: "sm" }),
									"px-4",
								)}
							>
								Login
							</Link>
						</SignedOut>
					</nav>
				</div>
			</header>
			<main className="flex-1">
				<Outlet />
			</main>
			<SiteFooter />
		</div>
	);
}
