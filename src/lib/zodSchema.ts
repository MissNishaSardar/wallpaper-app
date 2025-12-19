import z from "zod";

export const loginSchema = z.object({
	email: z.email("Invalid Email address"),
	password: z.string().min(8, "Password must be 8 charecters long"),
	rememberMe: z.boolean(),
});

export const registerSchema = z
	.object({
		name: z.string().min(6, "Input a valid Name"),
		email: z.email("Invalid Email address"),
		password: z.string().min(8, "Password must be 8 charecters long"),
		confirmPassword: z
			.string()
			.min(8, "Confirm Password must be 8 charecters long"),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		error: "Password didn't match",
	});
