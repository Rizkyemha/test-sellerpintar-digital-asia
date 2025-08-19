"use client";

import { useUser } from "@/src/context/user";
import { UserProfile } from "@/src/components/section/shared/user";

export default function Profile() {
	const { username, role } = useUser();

	return (
		<div className='bg-gray-50 flex items-center justify-center p-6'>
			<UserProfile username={username ?? ""} role={role ?? ""} />
		</div>
	);
}
