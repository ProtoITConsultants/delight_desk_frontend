import z from "zod";

// User Profile Schema
const UPDATE_USER_PROFILE_SCHEMA = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

// Change Email Schema
const CHANGE_EMAIL_SCHEMA = z.object({
  newEmail: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Change Password Schema
const CHANGE_PASSWORD_SCHEMA = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export {
  UPDATE_USER_PROFILE_SCHEMA,
  CHANGE_EMAIL_SCHEMA,
  CHANGE_PASSWORD_SCHEMA,
};
