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
	username: z
		.string()
		.min(3, { message: "Username harus memiliki minimal 3 karakter." })
		.max(20, { message: "Username tidak boleh lebih dari 20 karakter." }),
	password: z
		.string()
		.min(6, { message: "Password harus memiliki minimal 6 karakter." }),
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

export interface DataTablePropsArticle<TData, TValue> {
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

export const thumbnailFileSchema = z.any().optional();

export type ThumbnailFileSchema = z.infer<typeof thumbnailFileSchema>;

export const articleSchema = z.object({
	imageUrl: thumbnailFileSchema,
	title: z.string().min(1, {
		message: "Judul harus diisi.",
	}),
	categoryId: z.string().min(1, { message: "Silakan pilih kategori." }),
	content: z.string().min(1, {
		message: "Konten harus diisi.",
	}),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

// CATEGORIES

export type Category = {
	id: string;
	name: string;
	createdAt: string;
	setData?: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const CategoryPayload = z.object({
	name: z.string().min(1, { message: "Category field cannot be empty" }),
});

export type TCategoryPayload = z.infer<typeof CategoryPayload>;

export interface DataTablePropsCategory<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	setData: Dispatch<SetStateAction<TData[]>>;
	isLoading: boolean;
	pageCount: number;
	pagination: PaginationState;
	setPagination: Dispatch<SetStateAction<PaginationState>>;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	totalCategories: number;
}
