import { createFileRoute } from "@tanstack/react-router";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { PostCreateButton } from "@/components/post-create-button";
import { PostItem } from "@/components/post-item";
import { getPosts } from "@/lib/functions/posts";

export const Route = createFileRoute(
	"/(dashboard)/dashboard/_dashboard-layout/",
)({
	component: DashboardPage,
	loader: async () => await getPosts(),
	head: () => ({
		meta: [
			{
				title: "Dashboard | Taxonomy Restart",
			},
		],
	}),
});

function DashboardPage() {
	const posts = Route.useLoaderData();

	return (
		<DashboardShell>
			<DashboardHeader heading="Posts" text="Create and manage posts.">
				<PostCreateButton />
			</DashboardHeader>
			<div>
				{posts.success && posts.data.length ? (
					<div className="divide-y divide-border rounded-md border">
						{posts.data.map((post) => (
							<PostItem key={post.id} post={post} />
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name="post" />
						<EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							You don&apos;t have any posts yet. Start creating content.
						</EmptyPlaceholder.Description>
						<PostCreateButton variant="outline" />
					</EmptyPlaceholder>
				)}
			</div>
		</DashboardShell>
	);
}
