"use client";

import { useState, useEffect, ReactNode } from "react";
import { UserContext } from "@/src/context/user";
import { getUser } from "@/src/services/profile";
import { useAuth } from "@/src/context/auth";

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated } = useAuth();

	const [username, setUsername] = useState<string | null>(null);
	const [role, setRole] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await getUser();
				setUsername(response.username);
				setRole(response.role);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		if (isAuthenticated) {
			fetchUser();
		}
	}, [isAuthenticated]);

	return (
		<UserContext.Provider value={{ username, role }}>
			{children}
		</UserContext.Provider>
	);
};
