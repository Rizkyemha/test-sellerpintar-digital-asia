import { apiClient } from "@/src/services";

export interface GetArticlesParams {
	title?: string;
	category?: string;
	page?: number;
	limit?: number;
}

export interface CreateArticlePayload {
	title: string;
	content: string;
	categoryId: string;
	imageFile: File;
}

export interface UpdateArticlePayload {
	title?: string;
	content?: string;
	categoryId?: string;
	imageFile?: File;
}

const uploadImage = async (imageFile: File): Promise<string> => {
	const formData = new FormData();
	formData.append("image", imageFile);

	try {
		const response = await apiClient.post("/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data.imageUrl;
	} catch (error) {
		console.error("Gagal mengunggah gambar:", error);
		throw new Error("Upload gambar gagal.");
	}
};

export const getArticles = async (params: GetArticlesParams = {}) => {
	try {
		const response = await apiClient.get("/articles", { params });
		return response.data;
	} catch (error) {
		console.error("Gagal mengambil daftar artikel:", error);
		throw error;
	}
};

export const getArticleById = async (id: string) => {
	try {
		const response = await apiClient.get(`/articles/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Gagal mengambil artikel dengan ID ${id}:`, error);
		throw error;
	}
};

export const createArticle = async (payload: CreateArticlePayload) => {
	try {
		const imageUrl = await uploadImage(payload.imageFile);

		const articleData = {
			title: payload.title,
			content: payload.content,
			categoryId: payload.categoryId,
			imageUrl: imageUrl,
		};

		const response = await apiClient.post("/articles", articleData);
		return response.data;
	} catch (error) {
		console.error("Gagal membuat artikel:", error);
		throw error;
	}
};

export const updateArticle = async (
	id: string,
	payload: UpdateArticlePayload
) => {
	try {
		const articleData: Omit<UpdateArticlePayload, "imageFile"> & {
			imageUrl?: string;
		} = {
			title: payload.title,
			content: payload.content,
			categoryId: payload.categoryId,
		};

		if (payload.imageFile) {
			const imageUrl = await uploadImage(payload.imageFile);
			articleData.imageUrl = imageUrl;
		}

		const response = await apiClient.put(`/articles/${id}`, articleData);
		return response.data;
	} catch (error) {
		console.error(`Gagal memperbarui artikel dengan ID ${id}:`, error);
		throw error;
	}
};

export const deleteArticle = async (id: string) => {
	try {
		const response = await apiClient.delete(`/articles/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Gagal menghapus artikel dengan ID ${id}:`, error);
		throw error;
	}
};
