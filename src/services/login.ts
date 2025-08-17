import { apiClient } from "@/src/services";

export const login = async (credentials: {
	username: string;
	password: string;
}) => {
	try {
		const response = await apiClient.post("/auth/login", credentials);

		const { token, role } = response.data;

		if (token && role) {
			sessionStorage.setItem("authToken", token);
			sessionStorage.setItem("role", role);
		}
	} catch (error) {
		console.error("Login gagal:", error);
		throw error;
	}
};

export const register = async (credentials: {
	username: string;
	password: string;
	role: string;
}) => {
	try {
		const response = await apiClient.post("/auth/register", credentials);

		const { id } = response.data;

		if (id) {
			console.info("Registrasi berhasil ", id);
		}
	} catch (error) {
		console.error("Login gagal:", error);
		throw error;
	}
};

export const logout = () => {
	sessionStorage.removeItem("authToken");
	sessionStorage.removeItem("role");
};
