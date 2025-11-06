import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { allAuthors, allPosts } from "content-collections";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
	component: RouteComponent,
	// TODO: Add head
	loader: async ({ params }) => {
		const post = allPosts.find((post) => post.slug === params.slug);

		if (!post) {
			throw notFound();
		}

		return post;
	},
});

function RouteComponent() {
	const post = Route.useLoaderData();
	const authors = post.authors.map((author) =>
		allAuthors.find(({ title }) => title === author),
	);

	return (
		<article className="container relative max-w-3xl py-6 lg:py-10">
			<Link
				to="/blog"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute top-14 left-[-200px] hidden xl:inline-flex",
				)}
			>
				<Icons.chevronLeft className="mr-2 h-4 w-4" />
				See all posts
			</Link>
			<div>
				{post.date && (
					<time
						dateTime={post.date}
						className="block text-muted-foreground text-sm"
					>
						Published on {formatDate(post.date)}
					</time>
				)}
				<h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
					{post.title}
				</h1>
				{authors?.length ? (
					<div className="mt-4 flex space-x-4">
						{authors.map((author) =>
							author ? (
								<a
									key={author.title}
									href={`https://x.com/${author.x}`}
									className="flex items-center space-x-2 text-sm"
								>
									<img
										src={author.avatar}
										alt={author.title}
										width={42}
										height={42}
										className="rounded-full bg-white"
									/>
									<div className="flex-1 text-left leading-tight">
										<p className="font-medium">{author.title}</p>
										<p className="text-[12px] text-muted-foreground">
											@{author.x}
										</p>
									</div>
								</a>
							) : null,
						)}
					</div>
				) : null}
			</div>
			{post.image && (
				<img
					src={post.image}
					alt={post.title}
					width={720}
					height={405}
					className="my-8 rounded-md border bg-muted transition-colors"
				/>
			)}
			{/* TODO: Add styles to the MDX content */}
			<MDXContent code={post.mdx} />
			<hr className="mt-12" />
			<div className="flex justify-center py-6 lg:py-10">
				<Link to="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					See all posts
				</Link>
			</div>
		</article>
	);
}
