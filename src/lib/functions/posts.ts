import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";

import type { Prisma } from "generated/prisma/client";
import * as v from "valibot";
import prisma from "@/lib/prisma";
import type { Result } from "@/types";

const postCreateSchema = v.object({
	title: v.string(),
	content: v.optional(v.string()),
});

export const getPosts = createServerFn().handler(
	async (): Promise<
		Result<
			Prisma.PostGetPayload<{
				select: {
					id: true;
					title: true;
					published: true;
					createdAt: true;
				};
			}>[]
		>
	> => {
		try {
			const { isAuthenticated, userId } = await auth();

			if (!isAuthenticated) {
				return { success: false, error: "Unauthorized" };
			}

			const posts = await prisma.post.findMany({
				select: {
					id: true,
					title: true,
					published: true,
					createdAt: true,
				},
				where: {
					authorId: userId,
				},
			});

			return { success: true, data: posts };
		} catch (_) {
			return { success: false, error: "Internal Server Error" };
		}
	},
);

export const createPost = createServerFn({ method: "POST" })
	.inputValidator(postCreateSchema)
	.handler(
		async ({
			data,
		}): Promise<
			Result<
				Prisma.PostGetPayload<{
					select: {
						id: true;
					};
				}>
			>
		> => {
			try {
				const { isAuthenticated, userId } = await auth();

				if (!isAuthenticated) {
					return { success: false, error: "Unauthorized" };
				}

				const post = await prisma.post.create({
					data: {
						title: data.title,
						content: data.content,
						authorId: userId,
					},
					select: {
						id: true,
					},
				});

				return { success: true, data: post };
			} catch (_) {
				return { success: false, error: "Internal Server Error" };
			}
		},
	);

export const deletePost = createServerFn({ method: "POST" })
	.inputValidator(v.object({ postId: v.string() }))
	.handler(async ({ data }) => {
		try {
			const { isAuthenticated, userId } = await auth();

			if (!isAuthenticated) {
				return false;
			}

			await prisma.post.delete({
				where: { id: data.postId, authorId: userId },
			});

			return true;
		} catch (_) {
			return false;
		}
	});
