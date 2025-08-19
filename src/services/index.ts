import axios from "axios";
import config from "@/src/config";

export const apiClient = axios.create({
	baseURL: config.apiBaseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("authToken");

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
