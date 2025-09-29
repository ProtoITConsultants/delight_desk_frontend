import z from "zod";
import { CONTACT_US_FORM_SCHEMA } from "../schema";

type SUBSCRIPTION_PLAN_CARD = {
  id: string;
  name: string;
  displayName: string;
  price: string;
  resolutions: number;
  costPerResolution: string;
  emailLimit: number | null;
  features: string[];
  isActive: boolean;
  createdAt: string;
};

type CONTACT_US_FORM_TYPE = z.infer<typeof CONTACT_US_FORM_SCHEMA>;

export type { SUBSCRIPTION_PLAN_CARD, CONTACT_US_FORM_TYPE };
