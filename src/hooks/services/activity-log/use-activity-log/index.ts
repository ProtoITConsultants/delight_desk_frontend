import { api } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type UseActivityLogOptions = {
  limit?: number;
  enabled?: boolean;
};

const dedupeById = <T extends { id: string }>(items: T[]): T[] => {
  const seen = new Set<string>();
  const output: T[] = [];
  for (const item of items) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    output.push(item);
  }
  return output;
};

export const useActivityLog = ({
  limit = 10,
  enabled = true,
}: UseActivityLogOptions = {}) => {
  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["activity-log", limit],
    queryFn: ({ pageParam }) =>
      api.activity_log_service.getActivityLog({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined,
    enabled,
  });

  const activityLogs = useMemo(() => {
    const flat = data?.pages.flatMap((p) => p.data) ?? [];
    return dedupeById(flat);
  }, [data?.pages]);

  return {
    activityLogs,
    fetchNextPage,
    hasNextPage,
    isActivityLogsPending: isPending,
    isActivityLogsFetching: isFetching,
    isActivityLogsFetchingNextPage: isFetchingNextPage,
    isActivityLogsError: isError,
    activityLogsError: error,
    refetchActivityLogs: refetch,
  };
};
