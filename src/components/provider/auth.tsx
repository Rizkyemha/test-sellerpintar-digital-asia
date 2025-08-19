"use client";

import { useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/auth";

const LoadingScreen = () => (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
		}}>
		<h2>Loading...</h2>
	</div>
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		const role = localStorage.getItem("role");

		if (token && role) {
			setIsAuthenticated(true);
			setUserRole(role);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		const isPublicPath = pathname === "/login" || pathname === "/register";

		if (!isAuthenticated) {
			if (!isPublicPath) {
				router.push("/login");
			}
		} else {
			if (isPublicPath) {
				if (userRole === "Admin") {
					router.push("/admin/articles");
				} else {
					router.push("/articles");
				}
			} else if (pathname.startsWith("/admin") && userRole !== "Admin") {
				router.push("/login");
			}
		}
	}, [isLoading, isAuthenticated, userRole, pathname, router]);

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!isAuthenticated && pathname !== "/login" && pathname !== "/register") {
		return <LoadingScreen />;
	}

	if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
		return <LoadingScreen />;
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, userRole, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
