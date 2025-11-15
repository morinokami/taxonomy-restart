import { createFileRoute, Link } from "@tanstack/react-router";
import { allGuides } from "content-collections";
import { compareDesc } from "date-fns";

import { DocsPageHeader } from "@/components/docs-page-header";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/(docs)/_docs-layout/guides/_layout/")({
	component: GuidesPage,
	loader: async () => {
		const guides = allGuides
			.filter((guide) => guide.published)
			.sort((a, b) => {
				return compareDesc(new Date(a.date), new Date(b.date));
			});

		return guides;
	},
	head: () => ({
		meta: [
			{
				title: "Guides | Taxonomy Restart",
			},
			{
				name: "description",
				content:
					"This section includes end-to-end guides for developing Taxonomy Restart apps.",
			},
		],
	}),
});

function GuidesPage() {
	const guides = Route.useLoaderData();

	return (
		<div className="py-6 lg:py-10">
			<DocsPageHeader
				heading="Guides"
				text="This section includes end-to-end guides for developing Next.js 13 apps."
			/>
			{guides?.length ? (
				<div className="grid gap-4 md:grid-cols-2 md:gap-6">
					{guides.map((guide) => (
						<article
							key={guide.slug}
							className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
						>
							<div className="flex flex-col justify-between space-y-4">
								<div className="space-y-2">
									<h2 className="font-medium text-xl tracking-tight">
										{guide.title}
									</h2>
									{guide.description && (
										<p className="text-muted-foreground">{guide.description}</p>
									)}
								</div>
								{guide.date && (
									<p className="text-muted-foreground text-sm">
										{formatDate(guide.date)}
									</p>
								)}
							</div>
							<Link to={guide.slug} className="absolute inset-0">
								<span className="sr-only">View</span>
							</Link>
						</article>
					))}
				</div>
			) : (
				<p>No guides published.</p>
			)}
		</div>
	);
}
