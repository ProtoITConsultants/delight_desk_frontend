import z from "zod";
import { SIGNUP_FORM_SCHEMA } from "../schema/signup";

type SignupFormTypes = z.infer<typeof SIGNUP_FORM_SCHEMA>;

export type { SignupFormTypes };
