import z from "zod";

// Form Validation Schema - Contact Us
export const HTML_BUILDER_FORM_SCHEMA = z.object({
  htmlContent: z.string().optional(),
});
