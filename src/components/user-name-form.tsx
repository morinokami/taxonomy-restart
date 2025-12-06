import { useUser } from "@clerk/tanstack-react-start";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

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
import { UserNameSchema } from "@/lib/validations/user";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
	firstName: string | null;
	lastName: string | null;
}

export function UserNameForm({
	firstName,
	lastName,
	className,
	...props
}: UserNameFormProps) {
	const { user } = useUser();
	const form = useForm({
		defaultValues: {
			firstName: firstName ?? "",
			lastName: lastName ?? "",
		},
		validators: {
			onChange: UserNameSchema,
		},
		onSubmit: async ({ value: data }) => {
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
		},
	});
	const [isSaving, setIsSaving] = useState<boolean>(false);

	return (
		<form
			className={cn(className)}
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
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
						<form.Field
							name="firstName"
							children={(field) => {
								return (
									<>
										<Label className="sr-only" htmlFor="firstName">
											First Name
										</Label>
										<Input
											id="firstName"
											className="w-[400px]"
											size={32}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
										{!field.state.meta.isValid && (
											<p className="px-1 text-red-600 text-xs">
												{field.state.meta.errors
													.map((error) => error?.message)
													.join(", ")}
											</p>
										)}
									</>
								);
							}}
						/>
						<form.Field
							name="lastName"
							children={(field) => {
								return (
									<>
										<label className="sr-only" htmlFor="lastName">
											Last Name
										</label>
										<Input
											id="lastName"
											className="w-[400px]"
											size={32}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
										{!field.state.meta.isValid && (
											<p className="px-1 text-red-600 text-xs">
												{field.state.meta.errors
													.map((error) => error?.message)
													.join(", ")}
											</p>
										)}
									</>
								);
							}}
						/>
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
