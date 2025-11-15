import { createFileRoute, notFound } from "@tanstack/react-router";
import { allPages } from "content-collections";

import { Mdx } from "@/components/mdx-components";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

export const Route = createFileRoute("/(marketing)/_marketing-layout/$slug")({
	component: PagePage,
	loader: async ({ params }) => {
		const page = allPages.find((page) => page.slug === params.slug);

		if (!page) {
			throw notFound();
		}

		return page;
	},
	head: ({ params }) => {
		const page = allPages.find((page) => page.slug === params.slug);

		if (!page) {
			return {};
		}

		const url = import.meta.env.VITE_APP_URL;

		const ogUrl = new URL(`${url}/api/og`);
		ogUrl.searchParams.set("heading", page.title);
		ogUrl.searchParams.set("type", siteConfig.name);
		ogUrl.searchParams.set("mode", "light");

		return {
			meta: [
				{
					title: `${page.title} | ${siteConfig.name}`,
				},
				{
					name: "description",
					content: page.description,
				},
				{
					name: "og:title",
					content: page.title,
				},
				{
					name: "og:description",
					content: page.description,
				},
				{
					name: "og:type",
					content: "article",
				},
				{
					name: "og:url",
					content: absoluteUrl(`/${page.slug}`),
				},
				{
					name: "og:image",
					content: ogUrl.toString(),
				},
				{
					name: "twitter:card",
					content: "summary_large_image",
				},
				{
					name: "twitter:title",
					content: page.title,
				},
				{
					name: "twitter:description",
					content: page.description,
				},
				{
					name: "twitter:image",
					content: ogUrl.toString(),
				},
			],
		};
	},
});

function PagePage() {
	const page = Route.useLoaderData();

	return (
		<article className="container max-w-3xl py-6 lg:py-12">
			<div className="space-y-4">
				<h1 className="inline-block font-heading text-4xl lg:text-5xl">
					{page.title}
				</h1>
				{page.description && (
					<p className="text-muted-foreground text-xl">{page.description}</p>
				)}
			</div>
			<hr className="my-4" />
			<Mdx code={page.mdx} />
		</article>
	);
}
