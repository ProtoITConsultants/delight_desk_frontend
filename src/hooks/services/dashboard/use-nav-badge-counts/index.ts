import { api } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const NAV_BADGE_COUNTS_QUERY_KEY = ["nav-badge-counts"] as const;

export const formatNavBadgeCount = (count: number): string =>
  count > 99 ? "99+" : String(count);

export const useNavBadgeCounts = () => {
  return useQuery({
    queryKey: NAV_BADGE_COUNTS_QUERY_KEY,
    queryFn: () => api.dashboard_service.getNavBadgeCounts(),
    staleTime: 5_000,
    placeholderData: keepPreviousData,
  });
};
