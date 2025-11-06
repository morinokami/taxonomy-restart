import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { allPages } from "content-collections";

export const Route = createFileRoute("/(marketing)/_marketing-layout/$slug")({
	component: PagePage,
	// TODO: Add head
	loader: async ({ params }) => {
		const page = allPages.find((page) => page.slug === params.slug);

		if (!page) {
			throw notFound();
		}

		return page;
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
			{/* TODO: Add styles to the MDX content */}
			<MDXContent code={page.mdx} />
		</article>
	);
}
