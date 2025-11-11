import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Result } from "@/types";

const postCreateSchema = v.object({
	title: v.string(),
	content: v.optional(v.string()),
});

// TODO: Delete
interface Post {
	id: string;
}

export const getPosts = createServerFn().handler(
	async (): Promise<Result<Post[]>> => {
		try {
			const { isAuthenticated, userId } = await auth();

			if (!isAuthenticated) {
				return { success: false, error: "Unauthorized" };
			}

			// TODO: Get posts from database

			return { success: true, data: [] };
		} catch (_) {
			return { success: false, error: "Internal Server Error" };
		}
	},
);

export const createPost = createServerFn({ method: "POST" })
	.inputValidator(postCreateSchema)
	.handler(async ({ data }): Promise<Result<Post>> => {
		try {
			const { isAuthenticated, userId } = await auth();

			if (!isAuthenticated) {
				return { success: false, error: "Unauthorized" };
			}

			// TODO: Create post in database

			return { success: true, data: { id: "123" } };
		} catch (_) {
			return { success: false, error: "Internal Server Error" };
		}
	});
