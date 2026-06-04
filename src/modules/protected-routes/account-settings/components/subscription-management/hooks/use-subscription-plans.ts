import { SUBSCRIPTION_PLAN } from "../types";
import { useQuery } from "@tanstack/react-query";
import SubscriptionPlansAPI from "../api";

export function useSubscriptionPlans() {
  const { data, isPending, isError, error } = useQuery<
    SUBSCRIPTION_PLAN[] | undefined
  >({
    queryKey: ["subscription-plans"],
    queryFn: () => SubscriptionPlansAPI.fetchPricingPlans(),
  });

  if (isError) console.error("Error fetching subscription plans", error);

  return {
    subscriptionPlans: data,
    isFetchingSubscriptionPlans: isPending,
  };
}
