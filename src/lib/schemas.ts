import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { ColumnDef, PaginationState } from "@tanstack/react-table";

// AUTH

export const ROLES = ["Admin", "User"];

export const RegisterSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Username harus memiliki minimal 3 karakter." })
		.max(20, { message: "Username tidak boleh lebih dari 20 karakter." }),

	password: z
		.string()
		.min(6, { message: "Password harus memiliki minimal 6 karakter." }),

	role: z.enum(ROLES, {
		message: "Silakan pilih role yang valid.",
	}),
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

// ARTICLES

export type Article = {
	id: string;
	imageUrl: string;
	title: string;
	createdAt: string;
	category: { name: string; id: string };
};

export interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	categories: Category[];
	isLoading: boolean;
	pageCount: number;
	pagination: PaginationState;
	setPagination: Dispatch<SetStateAction<PaginationState>>;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	totalArticles: number;
}

// CATEGORIES

export type Category = {
	id: string;
	name: string;
};
