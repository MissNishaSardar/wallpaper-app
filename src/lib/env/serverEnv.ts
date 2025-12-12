import z from "zod";

const serverEnvSchema = z.object({
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

const serverEnvVars = {
	DATABASE_URL: process.env.DATABASE_URL,
};

export const serverEnv = serverEnvSchema.parse(serverEnvVars);
