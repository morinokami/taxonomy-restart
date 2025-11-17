// TODO: it works, but there are some type errors that need to be fixed

import type EditorJS from "@editorjs/editorjs";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Link, useNavigate } from "@tanstack/react-router";
import type { Prisma } from "generated/prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import * as v from "valibot";

import "@/styles/editor.css";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { updatePost } from "@/lib/functions/posts";
import { cn } from "@/lib/utils";
import { PostPatchSchema } from "@/lib/validations/post";

interface EditorProps {
	post: Prisma.PostGetPayload<{
		select: { id: true; title: true; content: true; published: true };
	}>;
}

type FormData = v.InferOutput<typeof PostPatchSchema>;

export function Editor({ post }: EditorProps) {
	const { register, handleSubmit } = useForm<FormData>({
		resolver: valibotResolver(PostPatchSchema),
	});
	const ref = useRef<EditorJS | null>(null);
	const navigate = useNavigate({ from: "/editor/$postId" });
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import("@editorjs/editorjs")).default;
		const Header = (await import("@editorjs/header")).default;
		const Embed = (await import("@editorjs/embed")).default;
		const Table = (await import("@editorjs/table")).default;
		const List = (await import("@editorjs/list")).default;
		const Code = (await import("@editorjs/code")).default;
		const LinkTool = (await import("@editorjs/link")).default;
		const InlineCode = (await import("@editorjs/inline-code")).default;

		const body = v.parse(PostPatchSchema, post);

		if (!ref.current) {
			const editor = new EditorJS({
				holder: "editor",
				onReady() {
					ref.current = editor;
				},
				placeholder: "Type here to write your post...",
				inlineToolbar: true,
				data: body.content,
				tools: {
					header: Header,
					linkTool: LinkTool,
					list: List,
					code: Code,
					inlineCode: InlineCode,
					table: Table,
					embed: Embed,
				},
			});
		}
	}, [post]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsMounted(true);
		}
	}, []);

	useEffect(() => {
		if (isMounted) {
			initializeEditor();

			return () => {
				ref.current?.destroy();
				ref.current = undefined;
			};
		}
	}, [isMounted, initializeEditor]);

	async function onSubmit(data: FormData) {
		setIsSaving(true);

		const blocks = await ref.current?.save();

		const updated = await updatePost({
			data: {
				postId: post.id,
				title: data.title,
				content: blocks,
			},
		});

		setIsSaving(false);

		if (!updated) {
			return toast.error("Something went wrong.", {
				description: "Your post was not saved. Please try again.",
			});
		}

		navigate({ to: ".", reloadDocument: true });

		return toast.success("Your post has been saved.");
	}

	if (!isMounted) {
		return null;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid w-full gap-10">
				<div className="flex w-full items-center justify-between">
					<div className="flex items-center space-x-10">
						<Link
							to="/dashboard"
							className={cn(buttonVariants({ variant: "ghost" }))}
						>
							<Icons.chevronLeft className="mr-2 h-4 w-4" />
							Back
						</Link>
						<p className="text-muted-foreground text-sm">
							{post.published ? "Published" : "Draft"}
						</p>
					</div>
					<button type="submit" className={cn(buttonVariants())}>
						{isSaving && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						<span>Save</span>
					</button>
				</div>
				<div className="prose prose-stone dark:prose-invert mx-auto w-[800px]">
					<TextareaAutosize
						autoFocus
						id="title"
						defaultValue={post.title}
						placeholder="Post title"
						className="w-full resize-none appearance-none overflow-hidden bg-transparent font-bold text-5xl focus:outline-none"
						{...register("title")}
					/>
					<div id="editor" className="min-h-[500px]" />
					<p className="text-gray-500 text-sm">
						Use{" "}
						<kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
							Tab
						</kbd>{" "}
						to open the command menu.
					</p>
				</div>
			</div>
		</form>
	);
}
