import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings, {
	type Options as RehypeAutolinkHeadingsOptions,
} from "rehype-autolink-headings";
import rehypePrettyCode, {
	type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const authors = defineCollection({
	name: "authors",
	directory: "content/authors",
	include: "**/*.md",
	schema: z.object({
		title: z.string(),
		avatar: z.string(),
		x: z.string(),
		content: z.string(),
	}),
});

const posts = defineCollection({
	name: "posts",
	directory: "content/blog",
	include: "**/*.mdx",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string(),
		date: z.string(),
		authors: z.array(z.string()),
		slug: z.string(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document, {
			rehypePlugins: [
				rehypeSlug,
				[
					rehypePrettyCode,
					{
						theme: "github-dark",
						onVisitLine(node) {
							// Prevent lines from collapsing in `display: grid` mode, and allow empty
							// lines to be copy/pasted
							if (node.children.length === 0) {
								node.children = [{ type: "text", value: " " }];
							}
						},
						onVisitHighlightedLine(node) {
							node.properties.className?.push("line--highlighted");
						},
						onVisitHighlightedChars(node) {
							node.properties.className = ["word--highlighted"];
						},
					} satisfies RehypePrettyCodeOptions,
				],
				[
					rehypeAutolinkHeadings,
					{
						properties: {
							className: ["subheading-anchor"],
							ariaLabel: "Link to section",
						},
					} satisfies RehypeAutolinkHeadingsOptions,
				],
			],
			remarkPlugins: [remarkGfm],
		});
		return {
			...document,
			mdx,
		};
	},
});

const pages = defineCollection({
	name: "pages",
	directory: "content/pages",
	include: "**/*.md",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		slug: z.string(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document);
		return {
			...document,
			mdx,
		};
	},
});

export default defineConfig({
	collections: [authors, posts, pages],
});
