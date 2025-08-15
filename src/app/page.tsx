"use client";

import { redirect } from "next/navigation";

import { useAuth } from "@/src/context/auth";

export default function RootPage() {
	const { userRole } = useAuth();

	if (userRole === "Admin") {
		redirect("/admin/articles");
	} else {
		redirect("/articles");
	}
}
