import { SignUp } from "@clerk/tanstack-react-start";
import { shadcn } from "@clerk/themes";
import { createFileRoute, Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(auth)/_auth-layout/register/")({
	component: RegisterPage,
	head: () => ({
		meta: [
			{
				title: "Create an account | Taxonomy Restart",
			},
			{
				description: "Create an account to get started",
			},
		],
	}),
});

function RegisterPage() {
	return (
		<div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
			<Link
				to="/login"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute top-4 right-4 md:top-8 md:right-8",
				)}
			>
				Login
			</Link>
			<div className="hidden h-full bg-muted lg:block" />
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					{/* TODO: Show terms and privacy links */}
					<SignUp appearance={{ theme: [shadcn] }} />
				</div>
			</div>
		</div>
	);
}
