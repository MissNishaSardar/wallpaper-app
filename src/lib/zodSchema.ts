import z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid Email address"),
  password: z.string().min(8, "Password must be 8 charecters long"),
  rememberMe: z.boolean(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

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
    message: "Password didn't match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const tagSchema = z.object({
  slug: z.string().min(3, "Input a valid tag name"),
});

export type TagSchemaType = z.infer<typeof tagSchema>;

export const updateNameSchema = z.object({
  name: z.string().min(6, "Input a valid Name"),
});

export type UpdateNameSchemaType = z.infer<typeof updateNameSchema>;
