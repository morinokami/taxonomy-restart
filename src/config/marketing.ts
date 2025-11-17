import { linkOptions } from "@tanstack/react-router";
import type { MarketingConfig } from "@/types";

export const marketingConfig: MarketingConfig = {
	mainNav: linkOptions([
		{
			to: "/",
			label: "Features",
			hash: "features",
		},
		{
			to: "/pricing",
			label: "Pricing",
		},
		{
			to: "/blog",
			label: "Blog",
		},
		{
			to: "/docs",
			label: "Documentation",
		},
	]),
};
