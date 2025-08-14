import { z } from "zod";

export const ROLES = ["admin", "user"];

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

export const LoginSchema = z.object({
	username: z.string(),
	password: z.string(),
});
