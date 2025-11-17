export type NavItem = {
	label: string;
	to: string;
	disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
	label: string;
	to?: string;
	disabled?: boolean;
	items?: NavItem[];
	icon?: keyof typeof Icons;
};

export type SiteConfig = {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	links: {
		x: string;
		github: string;
	};
};

export type DocsConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
	mainNav: MainNavItem[];
};

export type DashboardConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
	name: string;
	description: string;
	stripePriceId: string;
};

export type UserSubscriptionPlan = {
	name: string;
	description: string;
	stripePriceId: string;
	stripeCustomerId: string;
	stripeSubscriptionId: string;
	stripeCurrentPeriodEnd: number;
	isPro: boolean;
	isCanceled: boolean;
};

export type Result<T> =
	| {
			success: true;
			data: T;
	  }
	| { success: false; error: string };
