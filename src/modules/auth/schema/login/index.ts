import z from "zod";

// Form Validation Schema
export const LOGIN_FORM_SCHEMA = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
