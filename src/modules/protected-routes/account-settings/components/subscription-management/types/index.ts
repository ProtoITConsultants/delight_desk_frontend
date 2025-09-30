type SUBSCRIPTION_PLAN = {
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

export type { SUBSCRIPTION_PLAN };
