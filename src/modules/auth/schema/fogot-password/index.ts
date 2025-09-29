import z from "zod";

// Form Validation
export const FORGOT_PASSWORD_FORM_SCHEMA = z.object({
  email: z.email("Please enter a valid email address"),
});
