import { createFileRoute } from "@tanstack/react-router";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

export const Route = createFileRoute(
	"/(dashboard)/dashboard/_dashboard-layout/",
)({
	component: DashboardPage,
	loader: async ({ context }) => {
		// TODO: Get user's posts from database
		return [];
	},
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
				{/* TODO: <PostCreateButton /> */}
			</DashboardHeader>
			<div>
				{posts?.length ? (
					<div className="divide-y divide-border rounded-md border">
						{posts.map((post) => (
							// TODO: <PostItem key={post.id} post={post} />
							<></>
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name="post" />
						<EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							You don&apos;t have any posts yet. Start creating content.
						</EmptyPlaceholder.Description>
						{/* TODO: <PostCreateButton variant="outline" /> */}
					</EmptyPlaceholder>
				)}
			</div>
		</DashboardShell>
	);
}
