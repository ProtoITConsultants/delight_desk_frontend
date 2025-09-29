import z from "zod";
import { SIGNUP_FORM_SCHEMA } from "../schema/signup";
import { FORGOT_PASSWORD_FORM_SCHEMA } from "../schema/fogot-password";
import { RESET_PASSWORD_FORM_SCHEMA } from "../schema/reset-password";

type SignupFormTypes = z.infer<typeof SIGNUP_FORM_SCHEMA>;
type ForgotPasswordFormTypes = z.infer<typeof FORGOT_PASSWORD_FORM_SCHEMA>;
type ResetPasswordFormTypes = z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>;

export type {
  SignupFormTypes,
  ForgotPasswordFormTypes,
  ResetPasswordFormTypes,
};
