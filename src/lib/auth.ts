import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const authStateFn = createServerFn({ method: "GET" }).handler(
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
