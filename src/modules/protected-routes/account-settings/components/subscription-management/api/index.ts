import { apiService } from "@/lib/api-service";
import { SUBSCRIPTION_PLAN } from "../types";
import USER_SUBSCRIPTION from "@/constants/api/user-subscription";

const SubscriptionPlansAPI = {
  fetchPricingPlans: async () => {
    try {
      const response = await apiService.get<SUBSCRIPTION_PLAN[]>(
        USER_SUBSCRIPTION.PRICING_PLANS_URL
      );
      return response;
    } catch (error) {
      console.error("Error fetching subscription plans", error);
    }
  },
};

export default SubscriptionPlansAPI;
