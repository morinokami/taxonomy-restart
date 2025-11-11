import { Link, useNavigate } from "@tanstack/react-router";
import type { Prisma } from "generated/prisma/client";
import { useState } from "react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePost } from "@/lib/functions/posts";

interface PostOperationsProps {
	post: Prisma.PostGetPayload<{ select: { id: true; title: true } }>;
}

export function PostOperations({ post }: PostOperationsProps) {
	const navigate = useNavigate({ from: "/dashboard" });
	const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
					<Icons.ellipsis className="h-4 w-4" />
					<span className="sr-only">Open</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Link to={`/editor/${post.id}`} className="flex w-full">
							Edit
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="flex cursor-pointer items-center text-destructive focus:text-destructive"
						onSelect={() => setShowDeleteAlert(true)}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to delete this post?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async (event) => {
								event.preventDefault();
								setIsDeleteLoading(true);

								const deleted = await deletePost({ data: { postId: post.id } });

								if (!deleted) {
									return toast.error("Something went wrong.", {
										description: "Your post was not deleted. Please try again.",
									});
								}
								setIsDeleteLoading(false);
								setShowDeleteAlert(false);
								navigate({ to: ".", reloadDocument: true });
							}}
							className="bg-red-600 focus:ring-red-600"
						>
							{isDeleteLoading ? (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Icons.trash className="mr-2 h-4 w-4" />
							)}
							<span>Delete</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
