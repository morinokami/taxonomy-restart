import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const authors = defineCollection({
	name: "authors",
	directory: "content/authors",
	include: "**/*.md",
	schema: z.object({
		title: z.string(),
		avatar: z.string(),
		x: z.string(),
	}),
});

const posts = defineCollection({
	name: "posts",
	directory: "content/blog",
	include: "**/*.md",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string(),
		date: z.string(),
		authors: z.array(z.string()),
		slug: z.string(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document);
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
