"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/src/components/section/articles/dataTable";
import { columns } from "@/src/components/section/articles/columns";
import { getArticles, deleteArticle } from "@/src/services/articles";
import { getCategories } from "@/src/services/cetegories";
import { Article } from "@/src/lib/schemas";
import { Category } from "@/src/lib/schemas";
import { PaginationState } from "@tanstack/react-table";
import { useDebounce } from "@/src/hooks/useDebounce";

export default function ArticlesPage() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	const [isLoading, setIsLoading] = useState(true);

	const [totalArticles, setTotalArticles] = useState(0);

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 500);
	const [selectedCategory, setSelectedCategory] = useState("");

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const handleDelete = async (id: string) => {
		try {
			await deleteArticle(id);
			setArticles((prev) => prev.filter((article) => article.id !== id));
		} catch (error) {
			console.error("Failed to delete category:", error);
		}
	};

	useEffect(() => {
		const fetchArticles = async () => {
			setIsLoading(true);
			try {
				const response = await getArticles({
					page: pagination.pageIndex + 1,
					limit: pagination.pageSize,
					title: debouncedSearchQuery,
					category: selectedCategory,
					sortOrder: "ASC",
				});
				setArticles(response.data);
				setTotalArticles(response.total);
			} catch (error) {
				console.error("Gagal mengambil data artikel:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchArticles();
	}, [pagination, debouncedSearchQuery, selectedCategory]);

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true);
			try {
				const response = await getCategories();

				setCategories(response.data.data);
			} catch (error) {
				console.error("Gagal mengambil data category:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const pageCount = Math.ceil(totalArticles / pagination.pageSize);

	console.log(pageCount);

	return (
		<>
			<DataTable
				columns={columns(handleDelete)}
				data={articles}
				categories={categories}
				isLoading={isLoading}
				pageCount={pageCount}
				pagination={pagination}
				setPagination={setPagination}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				totalArticles={totalArticles}
			/>
		</>
	);
}
