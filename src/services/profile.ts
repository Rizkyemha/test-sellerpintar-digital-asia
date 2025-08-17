import { apiClient } from "@/src/services";

export const getUser = async () => {
	try {
		const response = await apiClient.get("/auth/profile");

		return response.data;
	} catch (error) {
		console.error("Login gagal:", error);
		throw error;
	}
};
