"use client";

import { AdminTopNav } from "@/src/components/section/admin/topNav";
import { useEffect, useState } from "react";
import { getUser } from "@/src/services/profile";

type User = {
	username?: string;
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [user, setUser] = useState<User>({});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await getUser();
				setUser(response);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
	}, []);

	return (
		<div className='grid grid-cols-1 auto-rows-min min-h-svh w-full bg-gray-100'>
			<AdminTopNav title='Category' user={user} />
			<div className='px-[24px] pt-[24px]'>
				<div className='overflow-hidden rounded-md border border-slate/200'>
					{children}
				</div>
			</div>
		</div>
	);
}
