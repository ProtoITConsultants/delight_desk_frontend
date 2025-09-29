import z from "zod";
import { CHANGE_PASSWORD_SCHEMA, UPDATE_USER_PROFILE_SCHEMA } from "../schema";

type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: null;
  signatureCompany: null;
  signatureCompanyUrl: null;
  signatureEmail: null;
  signatureLogoUrl: null;
  signatureName: null;
  signaturePhone: null;
  signaturePhotoUrl: null;
  signatureTitle: null;
  stripeCustomerId: null;
  stripeSubscriptionId: null;
};

// Get User Profile Response
type GetUserProfileResponse = {
  user: UserProfile;
  billing: unknown | null;
  plan: unknown | null;
};

// Update User Profile Type
type UpdateUserProfileType = z.infer<typeof UPDATE_USER_PROFILE_SCHEMA>;

// Change Password Type
type ChangePasswordType = z.infer<typeof CHANGE_PASSWORD_SCHEMA>;

export type {
  GetUserProfileResponse,
  UpdateUserProfileType,
  ChangePasswordType,
};
