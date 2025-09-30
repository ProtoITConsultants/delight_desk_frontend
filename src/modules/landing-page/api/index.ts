import LANDING_PAGE_API from "@/constants/api/landing-page";
import { apiService } from "@/lib/api-service";
import { SUBSCRIPTION_PLAN_CARD } from "../types";
import { CONTACT_US_FORM_TYPE } from "@/modules/core/utils/contact-us-form/types";

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
  // Contact Us Form
  contactUsForm: ({ name, email, company, inquiry }: CONTACT_US_FORM_TYPE) =>
    apiService.post(LANDING_PAGE_API.CONTACT_US_FORM_URL, {
      name,
      email,
      company,
      inquiry,
    }),
};

export default LandingPageAPIs;
