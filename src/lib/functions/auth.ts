import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

export const getAuthState = createServerFn({ method: "GET" }).handler(
	async () => {
		const { isAuthenticated, userId } = await auth();

		if (!isAuthenticated) {
			throw redirect({
				to: "/login",
			});
		}

		return { userId };
	},
);

export const getUserName = createServerFn({ method: "GET" })
	.inputValidator(v.object({ userId: v.string() }))
	.handler(async ({ data }) => {
		const clerkClient = createClerkClient({
			secretKey: process.env.CLERK_SECRET_KEY,
		});

		const user = await clerkClient.users.getUser(data.userId);

		return {
			firstName: user.firstName,
			lastName: user.lastName,
		};
	});
