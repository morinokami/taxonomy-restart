import { createFileRoute, notFound } from "@tanstack/react-router";
import { allDocs } from "content-collections";

import { DocsPageHeader } from "@/components/docs-page-header";
import { DocsPager } from "@/components/docs-pager";
import { Mdx } from "@/components/mdx-components";
import { DashboardTableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";

export const Route = createFileRoute("/(docs)/_docs-layout/docs/_layout/$")({
	component: DocPage,
	loader: async ({ params }) => {
		const doc = allDocs.find((doc) => doc._meta.path === params._splat);

		if (!doc) {
			throw notFound();
		}

		const toc = await getTableOfContents(doc.content);

		return { doc, toc };
	},
	head: ({ params }) => {
		// TODO: Add head
		return {};
	},
});

function DocPage() {
	const { doc, toc } = Route.useLoaderData();

	return (
		<main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
			<div className="mx-auto w-full min-w-0">
				<DocsPageHeader heading={doc.title} text={doc.description} />
				<Mdx code={doc.mdx} />
				<hr className="my-4 md:my-6" />
				<DocsPager doc={doc} />
			</div>
			<div className="hidden text-sm xl:block">
				<div className="-mt-10 sticky top-16 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
					<DashboardTableOfContents toc={toc} />
				</div>
			</div>
		</main>
	);
}
