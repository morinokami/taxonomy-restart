import { auth } from "@clerk/tanstack-react-start/server";
import { notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { Prisma } from "generated/prisma/client";

import * as v from "valibot";
import { getSubscriptionPlan } from "@/lib/functions/auth";
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

				const subscriptionPlan = await getSubscriptionPlan({
					data: { userId },
				});

				// If user is on a free plan.
				// Check if user has reached limit of 3 posts.
				if (!subscriptionPlan?.isPro) {
					const count = await prisma.post.count({
						where: {
							authorId: userId,
						},
					});

					if (count >= 3) {
						return { success: false, error: "This action requires a pro plan" };
					}
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

export const updatePost = createServerFn({ method: "POST" })
	.inputValidator(
		v.object({ postId: v.string(), title: v.string(), content: v.any() }),
	)
	.handler(async ({ data }) => {
		try {
			const { userId } = await auth();

			const count = await prisma.post.count({
				where: {
					id: data.postId,
					authorId: userId ?? "",
				},
			});

			if (count === 0) {
				return false;
			}

			// TODO: Implement sanitization for content
			await prisma.post.update({
				where: {
					id: data.postId,
				},
				data: {
					title: data.title,
					content: data.content,
				},
			});

			return true;
		} catch (_) {
			return false;
		}
	});

export const getPostForUser = createServerFn({ method: "GET" })
	.inputValidator(v.object({ postId: v.string() }))
	.handler(async ({ data }) => {
		const { isAuthenticated, userId } = await auth();

		if (!isAuthenticated) {
			throw redirect({ to: "/login" });
		}

		const post = await prisma.post.findUnique({
			where: { id: data.postId, authorId: userId },
		});

		if (!post) {
			throw notFound();
		}

		return post;
	});
