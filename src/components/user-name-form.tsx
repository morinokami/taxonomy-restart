import { useUser } from "@clerk/tanstack-react-start";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as v from "valibot";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { userNameSchema } from "@/lib/validations/user";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
	firstName: string | null;
	lastName: string | null;
}

type FormData = v.InferOutput<typeof userNameSchema>;

export function UserNameForm({
	firstName,
	lastName,
	className,
	...props
}: UserNameFormProps) {
	const { user } = useUser();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		resolver: valibotResolver(userNameSchema),
		defaultValues: {
			firstName: firstName ?? "",
			lastName: lastName ?? "",
		},
	});
	const [isSaving, setIsSaving] = useState<boolean>(false);

	async function onSubmit(data: FormData) {
		setIsSaving(true);

		try {
			await user?.update({
				firstName: data.firstName,
				lastName: data.lastName,
			});
			toast.success("Your name has been updated.");
		} catch (_) {
			toast.error("Something went wrong.", {
				description: "Your name was not updated. Please try again.",
			});
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<form
			className={cn(className)}
			onSubmit={handleSubmit(onSubmit)}
			{...props}
		>
			<Card>
				<CardHeader>
					<CardTitle>Your Name</CardTitle>
					<CardDescription>
						Please enter your full name or a display name you are comfortable
						with.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="firstName">
							First Name
						</Label>
						<Input
							id="firstName"
							className="w-[400px]"
							size={32}
							{...register("firstName")}
						/>
						{errors?.firstName && (
							<p className="px-1 text-red-600 text-xs">
								{errors.firstName.message}
							</p>
						)}
						<label className="sr-only" htmlFor="lastName">
							Last Name
						</label>
						<Input
							id="lastName"
							className="w-[400px]"
							size={32}
							{...register("lastName")}
						/>
						{errors?.lastName && (
							<p className="px-1 text-red-600 text-xs">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<button
						type="submit"
						className={cn(buttonVariants(), className)}
						disabled={isSaving}
					>
						{isSaving && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						<span>Save</span>
					</button>
				</CardFooter>
			</Card>
		</form>
	);
}
