import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";
import { createPost } from "@/lib/functions/posts";
import { cn } from "@/lib/utils";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
	className,
	variant,
	...props
}: PostCreateButtonProps) {
	const navigate = useNavigate({ from: "/dashboard" });
	const [isLoading, setIsLoading] = useState(false);

	async function onClick() {
		setIsLoading(true);

		const response = await createPost({ data: { title: "Untitled Post" } });

		setIsLoading(false);

		if (!response.success) {
			if (response.error === "Unauthorized") {
				return toast.error("Limit of 3 posts reached.", {
					description: "Please upgrade to the PRO plan.",
				});
			}

			return toast.error("Something went wrong.", {
				description: "Your post was not created. Please try again.",
			});
		}

		const post = response.data;

		// This forces a cache invalidation.
		// router.refresh();

		// navigate({ to: "/editor/$postId", params: { postId: post.id } });
	}

	return (
		<button
			onClick={onClick}
			className={cn(
				buttonVariants({ variant }),
				{
					"cursor-not-allowed opacity-60": isLoading,
				},
				className,
			)}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? (
				<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Icons.add className="mr-2 h-4 w-4" />
			)}
			New post
		</button>
	);
}
