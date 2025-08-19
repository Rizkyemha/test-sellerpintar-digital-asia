"use client";

import { UserProfile } from "@/src/components/section/shared/user";
import { useUser } from "@/src/context/user";

export default function Profile() {
	const { username, role } = useUser();

	console.log(role);

	return (
		<div className='flex items-center justify-center p-6 bg-blue'>
			<UserProfile username={username ?? ""} role={role ?? ""} />
		</div>
	);
}
