import type { User } from "@clerk/tanstack-react-start/server";
import type { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
	user: {
		image: User["imageUrl"];
		name: User["fullName"];
	};
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
	return (
		<Avatar {...props}>
			{user.image ? (
				<AvatarImage alt="Picture" src={user.image} />
			) : (
				<AvatarFallback>
					<span className="sr-only">{user.name}</span>
					<Icons.user className="h-4 w-4" />
				</AvatarFallback>
			)}
		</Avatar>
	);
}
