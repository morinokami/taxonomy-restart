import { SignIn } from "@clerk/tanstack-react-start";
import { shadcn } from "@clerk/themes";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { redirectIfAuthenticated } from "@/lib/functions/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(auth)/_auth-layout/login/")({
	component: LoginPage,
	beforeLoad: async () => {
		await redirectIfAuthenticated();
	},
	head: () => ({
		meta: [
			{
				title: "Login | Taxonomy Restart",
			},
			{
				description: "Login to your account",
			},
		],
	}),
});

function LoginPage() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link
				to="/"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute top-4 left-4 md:top-8 md:left-8",
				)}
			>
				<Icons.chevronLeft className="mr-2 h-4 w-4" />
				Back
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<SignIn
					appearance={{
						theme: [shadcn],
					}}
					path="/login"
					signUpUrl="/register"
				/>
			</div>
		</div>
	);
}
