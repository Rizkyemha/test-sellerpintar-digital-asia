"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/src/components/section/categories/dataTable";
import { columns } from "@/src/components/section/categories/columns";
import { getCategories, deleteCategory } from "@/src/services/cetegories";
import { useDebounce } from "@/src/hooks/useDebounce";
import { Category } from "@/src/lib/schemas";
import { PaginationState } from "@tanstack/react-table";
import { createCategory } from "@/src/services/cetegories";
import { set } from "zod";

export default function Page() {
	const [categories, setCategories] = useState<Category[]>([]);

	const [isLoading, setIsLoading] = useState(true);

	const [totalCategories, setTotalCategories] = useState(0);

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	const handleDelete = async (id: string) => {
		try {
			await deleteCategory(id);
			setCategories((prev) => prev.filter((category) => category.id !== id));
		} catch (error) {
			console.error("Failed to delete category:", error);
		}
	};

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	useEffect(() => {
		const fetchArticles = async () => {
			setIsLoading(true);
			try {
				const response = await getCategories({
					page: pagination.pageIndex + 1,
					limit: pagination.pageSize,
					search: debouncedSearchQuery,
				});
				setCategories(response.data.data);
				setTotalCategories(response.data.totalData);
			} catch (error) {
				console.error("Gagal mengambil data artikel:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchArticles();
	}, [pagination, debouncedSearchQuery]);

	const pageCount = Math.ceil(totalCategories / pagination.pageSize);
	return (
		<DataTable
			columns={columns(handleDelete, setCategories)}
			data={categories}
			setData={setCategories}
			isLoading={isLoading}
			pageCount={pageCount}
			pagination={pagination}
			setPagination={setPagination}
			searchQuery={searchQuery}
			setSearchQuery={setSearchQuery}
			totalCategories={totalCategories}
		/>
	);
}
