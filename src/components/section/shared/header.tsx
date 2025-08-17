import { useEffect, useState } from "react";
import { Logo } from "../../logo";
import { getUser } from "@/src/services/profile";
import { ButtonLogout } from "@/src/components/section/auth/buttonLogout";

import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/src/components/ui/avatar";
import Link from "next/link";

type User = {
	username?: string;
};

export function Header() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser();
				setUser(userData);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUser();
	}, []);

	return (
		<div className='box-border w-full flex items-center justify-between gap-2 border-2 border-b-slate-200 md:gap-4 text-blue-500 px-4 py-5 md:px-[60px] md:py-[32px]'>
			<Logo />
			<div className='flex gap-4 items-center'>
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Link href='/profile'>
					{!user?.username ? "user" : user?.username}
				</Link>
				<ButtonLogout />
			</div>
		</div>
	);
}
