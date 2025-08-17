import { apiClient } from "@/src/services";

export const getUser = async () => {
	try {
		const response = await apiClient.get("/auth/profile");

		const { id, username, role } = response.data;

		console.log("User data:", { id, username, role });

		return response.data;
	} catch (error) {
		console.error("Login gagal:", error);
		throw error;
	}
};
