import { CONTACT_US_FORM_SCHEMA } from "@/modules/core/utils/contact-us-form/schema";
import z from "zod";

type CONTACT_US_FORM_TYPE = z.infer<typeof CONTACT_US_FORM_SCHEMA>;

type CONTACT_US_FORM_PROPS = {
  submitButtonClassName?: string;
  formType: "landing-page" | "get-help";
};

export type { CONTACT_US_FORM_TYPE, CONTACT_US_FORM_PROPS };
