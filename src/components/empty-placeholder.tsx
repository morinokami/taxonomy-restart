import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyPlaceholder({
	className,
	children,
	...props
}: EmptyPlaceholderProps) {
	return (
		<div
			className={cn(
				"fade-in-50 flex min-h-[400px] animate-in flex-col items-center justify-center rounded-md border border-dashed p-8 text-center",
				className,
			)}
			{...props}
		>
			<div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
				{children}
			</div>
		</div>
	);
}

interface EmptyPlaceholderIconProps
	extends Partial<React.SVGProps<SVGSVGElement>> {
	name: keyof typeof Icons;
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
	name,
	className,
	...props
}: EmptyPlaceholderIconProps) {
	const Icon = Icons[name];

	if (!Icon) {
		return null;
	}

	return (
		<div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
			<Icon className={cn("h-10 w-10", className)} {...props} />
		</div>
	);
};

interface EmptyPlacholderTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
	className,
	...props
}: EmptyPlacholderTitleProps) {
	return (
		<h2 className={cn("mt-6 font-semibold text-xl", className)} {...props} />
	);
};

interface EmptyPlacholderDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
	className,
	...props
}: EmptyPlacholderDescriptionProps) {
	return (
		<p
			className={cn(
				"mt-2 mb-8 text-center font-normal text-muted-foreground text-sm leading-6",
				className,
			)}
			{...props}
		/>
	);
};
