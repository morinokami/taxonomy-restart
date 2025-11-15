import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allGuides } from "content-collections";

import { DocsPageHeader } from "@/components/docs-page-header";
import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx-components";
import { DashboardTableOfContents } from "@/components/toc";
import { buttonVariants } from "@/components/ui/button";
import { getTableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";

export const Route = createFileRoute(
	"/(docs)/_docs-layout/guides/_layout/$slug",
)({
	component: GuidePage,
	loader: async ({ params }) => {
		const guide = allGuides.find((guide) => guide.slug === params.slug);

		if (!guide) {
			throw notFound();
		}

		const toc = await getTableOfContents(guide.content);

		return { guide, toc };
	},
	head: ({ params }) => {
		// TODO: Add head
		return {};
	},
});

function GuidePage() {
	const { guide, toc } = Route.useLoaderData();

	return (
		<main className="relative py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
			<div>
				<DocsPageHeader heading={guide.title} text={guide.description} />
				<Mdx code={guide.mdx} />
				<hr className="my-4" />
				<div className="flex justify-center py-6 lg:py-10">
					<Link
						to="/guides"
						className={cn(buttonVariants({ variant: "ghost" }))}
					>
						<Icons.chevronLeft className="mr-2 h-4 w-4" />
						See all guides
					</Link>
				</div>
			</div>
			<div className="hidden text-sm lg:block">
				<div className="-mt-10 sticky top-16 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
					<DashboardTableOfContents toc={toc} />
				</div>
			</div>
		</main>
	);
}
