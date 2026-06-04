import { api } from "@/lib/api";
import { DASHBOARD_ANALYTICS_RANGE } from "@/services/dashboard/types";
import { useQuery } from "@tanstack/react-query";

export const useDashboardAnalytics = (range: DASHBOARD_ANALYTICS_RANGE) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["dashboard-analytics", range],
    queryFn: () => api.dashboard_service.getDashboardAnalytics({ range }),
  });

  return {
    analytics: data,
    isFetchingAnalytics: isPending,
    isAnalyticsError: isError,
    analyticsError: error,
  };
};
