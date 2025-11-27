import { ClerkProvider } from "@clerk/tanstack-react-start";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { generateMetadata } from "tanstack-meta";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import appCss from "@/styles/styles.css?url";

export const Route = createRootRoute({
	head: () => {
		const { meta, links } = generateMetadata({
			charSet: "utf-8",
			title: siteConfig.name,
			description: siteConfig.description,
			keywords: ["TanStack", "TanStack Start", "React"],
			openGraph: {
				type: "website",
				locale: "en_US",
				url: siteConfig.url,
				title: siteConfig.name,
				description: siteConfig.description,
				siteName: siteConfig.name,
				images: [
					{
						url: siteConfig.ogImage,
						width: 2400,
						height: 1260,
						type: "image/jpeg",
					},
				],
			},
			twitter: {
				card: "summary_large_image",
				title: siteConfig.name,
				description: siteConfig.description,
				images: [siteConfig.ogImage],
				creator: "@onDemocracy",
			},
			icons: {
				icon: "/favicon.ico",
				apple: "/apple-touch-icon.png",
			},
		});

		return {
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				...meta,
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				...links,
			],
		};
	},
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
