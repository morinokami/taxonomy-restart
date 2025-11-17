import { linkOptions } from "@tanstack/react-router";

import type { DocsConfig } from "@/types";

// TODO: fix all the @ts-expect-error errors (how to link to splat routes?)

export const docsConfig: DocsConfig = {
	mainNav: linkOptions([
		{
			label: "Documentation",
			to: "/docs",
		},
		{
			label: "Guides",
			to: "/guides",
		},
	]),
	sidebarNav: [
		{
			label: "Getting Started",
			items: linkOptions([
				{
					label: "Introduction",
					to: "/docs",
				},
			]),
		},
		{
			label: "Documentation",
			items: linkOptions([
				{
					label: "Introduction",
					// @ts-expect-error
					to: "/docs/documentation",
				},
				{
					label: "Contentlayer",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Components",
					// @ts-expect-error
					to: "/docs/documentation/components",
				},
				{
					label: "Code Blocks",
					// @ts-expect-error
					to: "/docs/documentation/code-blocks",
				},
				{
					label: "Style Guide",
					// @ts-expect-error
					to: "/docs/documentation/style-guide",
				},
				{
					label: "Search",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
			]),
		},
		{
			label: "Blog",
			items: linkOptions([
				{
					label: "Introduction",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Build your own",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Writing Posts",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
			]),
		},
		{
			label: "Dashboard",
			items: linkOptions([
				{
					label: "Introduction",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Layouts",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Server Components",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Authentication",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Database with Prisma",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "API Routes",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
			]),
		},
		{
			label: "Marketing Site",
			items: linkOptions([
				{
					label: "Introduction",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "File Structure",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Tailwind CSS",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
				{
					label: "Typography",
					// @ts-expect-error
					to: "/docs/in-progress",
					disabled: true,
				},
			]),
		},
	],
};
