"use client";

import { logout } from "@/src/services/login";
import { useAuth } from "@/src/context/auth";

export function ButtonLogout() {
	const { setIsAuthenticated } = useAuth();

	const logoutHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		logout();
		setIsAuthenticated(false);
	};

	return (
		<button
			className='underline hover:cursor-pointer'
			onClick={logoutHandler}>
			Logout
		</button>
	);
}
