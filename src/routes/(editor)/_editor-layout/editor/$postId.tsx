import { createFileRoute } from "@tanstack/react-router";

import { Editor } from "@/components/editor";
import { getPostForUser } from "@/lib/functions/posts";

export const Route = createFileRoute("/(editor)/_editor-layout/editor/$postId")(
	{
		component: PostPage,
		loader: async ({ params }) =>
			await getPostForUser({ data: { postId: params.postId } }),
	},
);

function PostPage() {
	const post = Route.useLoaderData();

	return (
		<Editor
			post={{
				id: post.id,
				title: post.title,
				content: post.content,
				published: post.published,
			}}
		/>
	);
}
