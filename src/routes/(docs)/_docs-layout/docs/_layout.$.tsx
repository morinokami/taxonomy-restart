import { createFileRoute, notFound } from "@tanstack/react-router";
import { allDocs } from "content-collections";

import { DocsPageHeader } from "@/components/docs-page-header";
import { DocsPager } from "@/components/docs-pager";
import { Mdx } from "@/components/mdx-components";
import { DashboardTableOfContents } from "@/components/toc";
import { siteConfig } from "@/config/site";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl } from "@/lib/utils";

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
		const doc = allDocs.find((doc) => doc._meta.path === params._splat);

		if (!doc) {
			return {};
		}

		const url = import.meta.env.VITE_APP_URL;

		const ogUrl = new URL(`${url}/api/og`);
		ogUrl.searchParams.set("heading", doc.title);
		ogUrl.searchParams.set("type", "Documentation");
		ogUrl.searchParams.set("mode", "dark");

		return {
			meta: [
				{
					title: `${doc.title} | ${siteConfig.name}`,
				},
				{
					name: "description",
					content: doc.description,
				},
				{
					name: "og:title",
					content: doc.title,
				},
				{
					name: "og:description",
					content: doc.description,
				},
				{
					name: "og:type",
					content: "article",
				},
				{
					name: "og:url",
					content: absoluteUrl(`/docs/${doc._meta.path}`),
				},
				{
					name: "og:image",
					content: ogUrl.toString(),
				},
				{
					name: "og:image:width",
					content: "1200",
				},
				{
					name: "og:image:height",
					content: "630",
				},
				{
					name: "og:image:alt",
					content: doc.title,
				},
				{
					name: "twitter:card",
					content: "summary_large_image",
				},
				{
					name: "twitter:title",
					content: doc.title,
				},
				{
					name: "twitter:description",
					content: doc.description,
				},
				{
					name: "twitter:image",
					content: ogUrl.toString(),
				},
			],
		};
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
