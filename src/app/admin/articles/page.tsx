"use client";

import { articles } from "./articles";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useAuth } from "@/src/context/auth";

export default function Articles() {
	const { isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <DataTable columns={columns} data={articles} />;
}
