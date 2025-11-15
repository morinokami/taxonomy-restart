import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	plugins: [
		devtools(),
		contentCollections(),
		tsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				autoStaticPathsDiscovery: false,
				crawlLinks: false,
			},
			pages: [
				{ path: "/docs", prerender: { enabled: true } },
				{ path: "/docs/documentation", prerender: { enabled: true } },
				{
					path: "/docs/documentation/components",
					prerender: { enabled: true },
				},
				{
					path: "/docs/documentation/code-blocks",
					prerender: { enabled: true },
				},
				{
					path: "/docs/documentation/style-guide",
					prerender: { enabled: true },
				},
				{
					path: "/guides",
					prerender: { enabled: true },
				},
				{
					path: "/guides/build-blog-using-contentlayer-mdx",
					prerender: { enabled: true },
				},
				{
					path: "/guides/using-next-auth-next-13",
					prerender: { enabled: true },
				},
			],
		}),
		nitro(),
		viteReact({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
	// To fix the error "The requested module does not provide an export named 'parse'"
	optimizeDeps: {
		include: ["cookie"],
	},
	// https://github.com/adobe/react-spectrum/issues/6694
	resolve: {
		alias: [
			{
				find: "use-sync-external-store/shim/index.js",
				replacement: "react",
			},
		],
	},
});

export default config;
