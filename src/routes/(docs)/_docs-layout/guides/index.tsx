import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(docs)/_docs-layout/guides/")({
	component: GuidesIndexPage,
});

function GuidesIndexPage() {
	return <div>Hello "/(docs)/_docs-layout/guides/"!</div>;
}
