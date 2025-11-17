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
				<div key={item.label} className={cn("pb-8")}>
					<h4 className="mb-1 rounded-md px-2 py-1 font-medium text-sm">
						{item.label}
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
				!item.disabled && item.to ? (
					<Link
						{...item}
						key={item.label}
						className={cn(
							"flex w-full items-center rounded-md p-2 hover:underline",
							{
								"bg-muted": pathname === item.to,
							},
						)}
					>
						{item.label}
					</Link>
				) : (
					<span
						key={item.label}
						className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60"
					>
						{item.label}
					</span>
				),
			)}
		</div>
	) : null;
}
