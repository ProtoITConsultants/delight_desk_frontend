import z from "zod";

// Form Validation Schema - Contact Us
export const VISUAL_BUILDER_FORM_SCHEMA = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  company: z.string().optional(),
  companyUrl: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  photoUrl: z.string().optional(),
});
