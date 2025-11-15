import { Link, useLocation } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import type { SidebarNavItem } from "@/types";

export interface DocsSidebarNavProps {
	items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
	const pathname = useLocation().pathname;

	return items.length ? (
		<div className="w-full">
			{items.map((item) => (
				<div key={item.title} className={cn("pb-8")}>
					<h4 className="mb-1 rounded-md px-2 py-1 font-medium text-sm">
						{item.title}
					</h4>
					{item.items ? (
						<DocsSidebarNavItems items={item.items} pathname={pathname} />
					) : null}
				</div>
			))}
		</div>
	) : null;
}

interface DocsSidebarNavItemsProps {
	items: SidebarNavItem[];
	pathname: string | null;
}

export function DocsSidebarNavItems({
	items,
	pathname,
}: DocsSidebarNavItemsProps) {
	return items?.length ? (
		<div className="grid grid-flow-row auto-rows-max text-sm">
			{items.map((item) =>
				!item.disabled && item.href ? (
					<Link
						key={item.title}
						to={item.href}
						className={cn(
							"flex w-full items-center rounded-md p-2 hover:underline",
							{
								"bg-muted": pathname === item.href,
							},
						)}
						target={item.external ? "_blank" : ""}
						rel={item.external ? "noreferrer" : ""}
					>
						{item.title}
					</Link>
				) : (
					<span
						key={item.title}
						className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60"
					>
						{item.title}
					</span>
				),
			)}
		</div>
	) : null;
}
