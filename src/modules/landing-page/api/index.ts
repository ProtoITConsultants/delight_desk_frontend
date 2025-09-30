import LANDING_PAGE_API from "@/constants/api/landing-page";
import { apiService } from "@/lib/api-service";
import { SUBSCRIPTION_PLAN_CARD } from "../types";

const LandingPageAPIs = {
  fetchPricingPlans: async () => {
    try {
      const response = await apiService.get<SUBSCRIPTION_PLAN_CARD[]>(
        LANDING_PAGE_API.PRICING_PLANS_URL
      );
      return response;
    } catch (error) {
      console.error("Error fetching subscription plans", error);
    }
  },
};

export default LandingPageAPIs;
