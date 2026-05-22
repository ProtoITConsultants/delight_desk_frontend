import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApprovalQueueContextType } from "./approval-queue-context.types";
import { useApprovalQueueStreamSync } from "@/hooks/services/approval-queue/use-approval-queue-stream-sync";
import {
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

const ApprovalQueueContext = createContext<ApprovalQueueContextType>({
  selectedItemStatus: null,
  setSelectedItemStatus: () => {},
  activeAgentCategory: ApprovalQueueAgentCategory.ALL,
  setActiveAgentCategory: () => {},
  approvalQueueItems: [],
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 0,
  totalItems: 0,
  itemsPerPage: ITEMS_PER_PAGE,
  hasNextPage: false,
  hasPreviousPage: false,
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
    useState<ApprovalQueueItemStatus | null>(null);
  const [activeAgentCategory, setActiveAgentCategory] =
    useState<ApprovalQueueAgentCategory>(ApprovalQueueAgentCategory.ALL);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to first page whenever filters change so users never end up on a
  // page that no longer exists for the new filter set.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedItemStatus, activeAgentCategory]);

  useApprovalQueueStreamSync();

  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: [
      "approval-queue-items",
      selectedItemStatus,
      activeAgentCategory,
      currentPage,
    ],
    queryFn: () =>
      api.approval_queue_service.getApprovalQueueItems({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        status: selectedItemStatus ?? undefined,
        category:
          activeAgentCategory === ApprovalQueueAgentCategory.ALL
            ? undefined
            : activeAgentCategory,
      }),
    placeholderData: keepPreviousData,
  });

  const approvalQueueItems = useMemo(() => data?.data ?? [], [data]);
  const pagination = data?.pagination;

  const totalPages = pagination?.totalPages ?? 0;
  const totalItems = pagination?.totalItems ?? 0;
  const itemsPerPage = pagination?.itemsPerPage ?? ITEMS_PER_PAGE;
  const hasNextPage = pagination?.hasNextPage ?? false;
  const hasPreviousPage = pagination?.hasPreviousPage ?? false;

  const value = useMemo(() => {
    return {
      selectedItemStatus,
      setSelectedItemStatus,
      activeAgentCategory,
      setActiveAgentCategory,
      approvalQueueItems,
      currentPage,
      setCurrentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage,
      hasPreviousPage,
      isLoading: isPending,
      refetch,
      isRefetching,
    };
  }, [
    selectedItemStatus,
    activeAgentCategory,
    approvalQueueItems,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage,
    hasPreviousPage,
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
