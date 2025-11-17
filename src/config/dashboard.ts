import { linkOptions } from "@tanstack/react-router";

import type { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
	mainNav: linkOptions([
		{
			label: "Documentation",
			to: "/docs",
		},
		{
			label: "Support",
			// @ts-expect-error: not implemented
			to: "/support",
			disabled: true,
		},
	]),
	sidebarNav: linkOptions([
		{
			label: "Posts",
			to: "/dashboard",
			icon: "post",
		},
		{
			label: "Billing",
			to: "/dashboard/billing",
			icon: "billing",
		},
		{
			label: "Settings",
			to: "/dashboard/settings",
			icon: "settings",
		},
	]),
};
