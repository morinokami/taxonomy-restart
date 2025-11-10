import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

const postCreateSchema = v.object({
	title: v.string(),
	content: v.optional(v.string()),
});

// TODO: Use Result type

export const getPosts = createServerFn().handler(async () => {
	try {
		const { isAuthenticated, userId } = await auth();

		if (!isAuthenticated) {
			return new Response("Unauthorized", { status: 401 });
		}

		// TODO: Get posts from database

		return [];
	} catch (_) {
		return new Response("Internal Server Error", { status: 500 });
	}
});

export const createPost = createServerFn({ method: "POST" })
	.inputValidator(postCreateSchema)
	.handler(async ({ data }) => {
		try {
			const { isAuthenticated, userId } = await auth();

			if (!isAuthenticated) {
				return new Response("Unauthorized", { status: 401 });
			}

			// TODO: Create post in database
		} catch (_) {
			return new Response("Internal Server Error", { status: 500 });
		}
	});
