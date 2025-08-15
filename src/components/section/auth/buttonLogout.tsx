"use client";

import { logout } from "@/src/services/login";
import { redirect } from "next/navigation";

export function ButtonLogout() {
	const logoutHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		logout();
		redirect("/login");
	};

	return <button onClick={logoutHandler}>Logout</button>;
}
