import { Link } from "@tanstack/react-router";
import type { Prisma } from "generated/prisma/client";
import { PostOperations } from "@/components/post-operations";
import { formatDate } from "@/lib/utils";

interface PostItemProps {
	post: Prisma.PostGetPayload<{
		select: { id: true; title: true; published: true; createdAt: true };
	}>;
}

export function PostItem({ post }: PostItemProps) {
	return (
		<div className="flex items-center justify-between p-4">
			<div className="grid gap-1">
				<Link
					to="/editor/$postId"
					params={{ postId: post.id }}
					className="font-semibold hover:underline"
				>
					{post.title}
				</Link>
				<div>
					<p className="text-muted-foreground text-sm">
						{formatDate(post.createdAt?.toDateString())}
					</p>
				</div>
			</div>
			<PostOperations post={{ id: post.id, title: post.title }} />
		</div>
	);
}
