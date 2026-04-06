import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApprovalQueueContextType } from "./approval-queue-context.types";
import {
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ApprovalQueueContext = createContext<ApprovalQueueContextType>({
  selectedItemStatus: ApprovalQueueItemStatus.PENDING,
  setSelectedItemStatus: () => {},
  activeAgentCategory: ApprovalQueueAgentCategory.ALL,
  setActiveAgentCategory: () => {},
  approvalQueueItems: [],
  fetchNextPage: () => {},
  hasNextPage: false,
  isFetchingNextPage: false,
  isLoading: false,
  refetch: () => Promise.resolve(),
  isRefetching: false,
});

export const useApprovalQueueContext = (): ApprovalQueueContextType => {
  const context = useContext(ApprovalQueueContext);
  if (!context) {
    throw new Error(
      "useApprovalQueueContext must be used within an ApprovalQueueProvider",
    );
  }
  return context;
};

export const ApprovalQueueProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItemStatus, setSelectedItemStatus] =
    useState<ApprovalQueueItemStatus>(ApprovalQueueItemStatus.PENDING);
  const [activeAgentCategory, setActiveAgentCategory] =
    useState<ApprovalQueueAgentCategory>(ApprovalQueueAgentCategory.ALL);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["approval-queue-items", selectedItemStatus, activeAgentCategory],
    queryFn: ({ pageParam = 1 }) => {
      return api.approval_queue_service.getApprovalQueueItems({
        page: pageParam,
        limit: 10,
        status: selectedItemStatus,
        category:
          activeAgentCategory === ApprovalQueueAgentCategory.ALL
            ? undefined
            : activeAgentCategory,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1;
      }

      return undefined;
    },
  });

  const approvalQueueItems = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  console.log("approvalQueueItems", approvalQueueItems);

  const value = useMemo(() => {
    return {
      selectedItemStatus,
      setSelectedItemStatus,
      activeAgentCategory,
      setActiveAgentCategory,
      approvalQueueItems,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading: isPending,
      refetch,
      isRefetching,
    };
  }, [
    selectedItemStatus,
    setSelectedItemStatus,
    activeAgentCategory,
    setActiveAgentCategory,
    approvalQueueItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
    isRefetching,
  ]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch approval queue items", {
        description: error?.message || "Please try again later",
      });
    }
  }, [isError, error]);

  return (
    <ApprovalQueueContext.Provider value={value}>
      {children}
    </ApprovalQueueContext.Provider>
  );
};
