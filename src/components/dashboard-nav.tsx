"use client";

import { Link, useLocation } from "@tanstack/react-router";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { SidebarNavItem } from "@/types";

interface DashboardNavProps {
	items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
	const path = useLocation().pathname;

	if (!items?.length) {
		return null;
	}

	return (
		<nav className="grid items-start gap-2">
			{items.map((item) => {
				const Icon = Icons[item.icon as keyof typeof Icons] ?? Icons.arrowRight;
				return (
					item.to && (
						<Link key={item.to} to={item.disabled ? "/" : item.to}>
							<span
								className={cn(
									"group flex items-center rounded-md px-3 py-2 font-medium text-sm hover:bg-accent hover:text-accent-foreground",
									path === item.to ? "bg-accent" : "transparent",
									item.disabled && "cursor-not-allowed opacity-80",
								)}
							>
								<Icon className="mr-2 h-4 w-4" />
								<span>{item.label}</span>
							</span>
						</Link>
					)
				);
			})}
		</nav>
	);
}
