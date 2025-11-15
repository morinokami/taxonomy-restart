import { createFileRoute, Link } from "@tanstack/react-router";
import { allPosts } from "content-collections";

import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/(marketing)/_marketing-layout/blog/")({
	component: BlogPage,
	head: () => ({
		meta: [
			{
				title: "Blog | Taxonomy Restart",
			},
		],
	}),
});

function BlogPage() {
	return (
		<div className="container max-w-4xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
						Blog
					</h1>
					<p className="text-muted-foreground text-xl">
						A blog built using Content Collections. Posts are written in MDX.
					</p>
				</div>
			</div>
			<hr className="my-8" />
			{allPosts.length ? (
				<div className="grid gap-10 sm:grid-cols-2">
					{allPosts.map((post) => (
						<article
							key={post._meta.filePath}
							className="group relative flex flex-col space-y-2"
						>
							{post.image && (
								<img
									src={post.image}
									alt={post.title}
									width={804}
									height={452}
									className="rounded-md border bg-muted transition-colors"
								/>
							)}
							<h2 className="font-extrabold text-2xl">{post.title}</h2>
							{post.description && (
								<p className="text-muted-foreground">{post.description}</p>
							)}
							{post.date && (
								<p className="text-muted-foreground text-sm">
									{formatDate(post.date)}
								</p>
							)}
							<Link to={post.slug} className="absolute inset-0">
								<span className="sr-only">View Article</span>
							</Link>
						</article>
					))}
				</div>
			) : (
				<p>No posts published.</p>
			)}
		</div>
	);
}
