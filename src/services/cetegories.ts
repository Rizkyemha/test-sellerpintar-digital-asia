import { apiClient } from "@/src/services";

export interface GetCategoriesParams {
	title?: string;
	page?: number;
}

export interface CategoryPayload {
	name: string;
}

export const getCategories = async (params: GetCategoriesParams = {}) => {
	try {
		const response = await apiClient.get("/categories", { params });
		return response.data;
	} catch (error) {
		console.error("Gagal mengambil daftar kategori:", error);
		throw error;
	}
};

export const createCategory = async (payload: CategoryPayload) => {
	try {
		const response = await apiClient.post("/categories", payload);
		return response.data;
	} catch (error) {
		console.error("Gagal membuat kategori:", error);
		throw error;
	}
};

export const updateCategory = async (id: string, payload: CategoryPayload) => {
	try {
		const response = await apiClient.put(`/categories/${id}`, payload);
		return response.data;
	} catch (error) {
		console.error(`Gagal memperbarui kategori dengan ID ${id}:`, error);
		throw error;
	}
};

export const deleteCategory = async (id: string) => {
	try {
		const response = await apiClient.delete(`/categories/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Gagal menghapus kategori dengan ID ${id}:`, error);
		throw error;
	}
};
