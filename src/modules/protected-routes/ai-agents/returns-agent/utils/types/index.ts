import z from "zod";
import { RETURN_POLICY_FORM_SCHEMA } from "../schema";

type RETURN_POLICY_CONFIG_TYPE = z.infer<typeof RETURN_POLICY_FORM_SCHEMA>;

export type { RETURN_POLICY_CONFIG_TYPE };
