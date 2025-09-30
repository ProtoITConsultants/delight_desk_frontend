import z from "zod";

// Form Validation Schema - Contact Us
export const CONTACT_US_FORM_SCHEMA = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  inquiry: z.string().min(10, {
    message: "Inquiry must be at least 10 characters.",
  }),
});
