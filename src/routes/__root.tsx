import { ClerkProvider } from "@clerk/tanstack-react-start";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import appCss from "@/styles/styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: siteConfig.name,
			},
			{
				name: "description",
				content: siteConfig.description,
			},
			{
				name: "keywords",
				content: "TanStack, TanStack Start, React",
			},
			{
				name: "og:type",
				content: "website",
			},
			{
				name: "og:locale",
				content: "en_US",
			},
			{
				name: "og:url",
				content: siteConfig.url,
			},
			{
				name: "og:title",
				content: siteConfig.name,
			},
			{
				name: "og:description",
				content: siteConfig.description,
			},
			{
				name: "og:site_name",
				content: siteConfig.name,
			},
			{
				name: "og:image",
				content: siteConfig.ogImage,
			},
			{
				name: "og:image:width",
				content: "2400",
			},
			{
				name: "og:image:height",
				content: "1260",
			},
			{
				name: "og:image:type",
				content: "image/jpeg",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: siteConfig.name,
			},
			{
				name: "twitter:description",
				content: siteConfig.description,
			},
			{
				name: "twitter:image",
				content: siteConfig.ogImage,
			},
			{
				name: "twitter:creator",
				content: "@onDemocracy",
			},
			// TODO: favicon
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-background font-sans antialiased">
				<ClerkProvider>
					<ThemeProvider>
						{children}
						<Toaster />
					</ThemeProvider>
					<TanStackDevtools
						config={{
							position: "bottom-left",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</ClerkProvider>
			</body>
		</html>
	);
}
