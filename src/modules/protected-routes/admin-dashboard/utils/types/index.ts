export interface USER_TYPE {
  id: string;
  userName: string;
  email: string;
  subscriptionPlan: string;
  isActive: boolean;
  connectedEmailProvider: "gmail" | "outlook" | null;
  connectedStore: "woocommerce" | null;
  lastLogin: string | null;
}
