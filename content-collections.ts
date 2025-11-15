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
import * as v from "valibot";

const authors = defineCollection({
	name: "authors",
	directory: "src/content/authors",
	include: "**/*.md",
	schema: v.object({
		title: v.string(),
		avatar: v.string(),
		x: v.string(),
		content: v.string(),
	}),
});

const posts = defineCollection({
	name: "posts",
	directory: "src/content/blog",
	include: "**/*.mdx",
	schema: v.object({
		title: v.string(),
		description: v.string(),
		image: v.string(),
		date: v.string(),
		authors: v.array(v.string()),
		slug: v.string(),
		content: v.string(),
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
	directory: "src/content/pages",
	include: "**/*.md",
	schema: v.object({
		title: v.string(),
		description: v.string(),
		slug: v.string(),
		content: v.string(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document);
		return {
			...document,
			mdx,
		};
	},
});

const docs = defineCollection({
	name: "docs",
	directory: "src/content/docs",
	include: "**/*.mdx",
	schema: v.object({
		title: v.string(),
		description: v.optional(v.string()),
		published: v.optional(v.boolean(), true),
		content: v.string(),
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

export default defineConfig({
	collections: [authors, posts, pages, docs],
});
