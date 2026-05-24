"use client";

import { useEscalationStreamSync } from "@/hooks/services/ai-assistant/use-escalation-stream-sync";
import { api } from "@/lib/api";
import { FEEDBACK_DIALOG_DATA_TYPE } from "@/modules/protected-routes/ai-assistant/components/ai-assistant-tabs/components/escalation-queue-tab/components/escalation-emails-list/utils/types/escalation-email-context";
import {
  EscalationPriority,
  EscalationStatus,
  EscalationType,
} from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import {
  ESCALATION_EMAIL_SIGNATURE,
  ESCALATION_STATS,
  GET_ESCALATION_LIST_RESPONSE,
} from "@/services/ai-assistant/utils/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

export interface EscalationDateRange {
  /** ISO date string sent as `dateFrom` query param. */
  from: string | null;
  /** ISO date string sent as `dateTo` query param. */
  to: string | null;
}

interface AiAssistantContentType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  escalationStatus: EscalationStatus | null;
  setEscalationStatus: React.Dispatch<
    React.SetStateAction<EscalationStatus | null>
  >;
  escalationPriority: EscalationPriority | null;
  setEscalationPriority: React.Dispatch<
    React.SetStateAction<EscalationPriority | null>
  >;
  dateRange: EscalationDateRange;
  setDateRange: React.Dispatch<React.SetStateAction<EscalationDateRange>>;
  isPending: boolean;
  isStatsPending: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  escalationList: GET_ESCALATION_LIST_RESPONSE["data"] | undefined;
  escalationStats: ESCALATION_STATS | undefined;
  emailSignature: ESCALATION_EMAIL_SIGNATURE | undefined;
  selectedEscalationForPreview: string | null;
  setSelectedEscalationForPreview: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  selectedEmailsForBulkAction: Set<string>;
  setSelectedEmailsForBulkAction: React.Dispatch<
    React.SetStateAction<Set<string>>
  >;
  selectedEscalationDetails: EscalationType | undefined | null;
  deepLinkedEscalationId: string | null;
  isResolvingDeepLinkedEscalation: boolean;
  isDeepLinkedEscalationNotFound: boolean;
  feedbackDialogData: FEEDBACK_DIALOG_DATA_TYPE;
  setFeedbackDialogData: React.Dispatch<
    React.SetStateAction<FEEDBACK_DIALOG_DATA_TYPE>
  >;
  clearAllFilters: () => void;
}

const AiAssistantContext = createContext<AiAssistantContentType>({
  searchQuery: "",
  setSearchQuery: () => {},
  escalationStatus: null,
  setEscalationStatus: () => {},
  escalationPriority: null,
  setEscalationPriority: () => {},
  dateRange: { from: null, to: null },
  setDateRange: () => {},
  isPending: false,
  isStatsPending: false,
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 0,
  totalItems: 0,
  itemsPerPage: 10,
  hasNextPage: false,
  hasPreviousPage: false,
  escalationList: undefined,
  escalationStats: undefined,
  emailSignature: undefined,
  selectedEscalationForPreview: null,
  setSelectedEscalationForPreview: () => {},
  selectedEmailsForBulkAction: new Set(),
  setSelectedEmailsForBulkAction: () => {},
  selectedEscalationDetails: null,
  deepLinkedEscalationId: null,
  isResolvingDeepLinkedEscalation: false,
  isDeepLinkedEscalationNotFound: false,
  feedbackDialogData: {
    isOpen: false,
    emailId: "",
  },
  setFeedbackDialogData: () => {},
  clearAllFilters: () => {},
});

export const useAiAssistant = (): AiAssistantContentType => {
  const context = useContext(AiAssistantContext);
  if (!context) {
    throw new Error("useAiAssistant must be used within a AiAssistantProvider");
  }
  return context;
};

export const AiAssistantProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const selectedEscalationFromUrl =
    searchParams.get("escalationId") ?? searchParams.get("email");

  const [searchQuery, setSearchQuery] = useState("");
  const [escalationStatus, setEscalationStatus] =
    useState<EscalationStatus | null>(null);
  const [escalationPriority, setEscalationPriority] =
    useState<EscalationPriority | null>(null);
  const [dateRange, setDateRange] = useState<EscalationDateRange>({
    from: null,
    to: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEscalationForPreview, setSelectedEscalationForPreview] =
    useState<string | null>(null);

  const [selectedEmailsForBulkAction, setSelectedEmailsForBulkAction] =
    useState<Set<string>>(new Set());
  const [feedbackDialogData, setFeedbackDialogData] =
    useState<FEEDBACK_DIALOG_DATA_TYPE>({
      isOpen: false,
      emailId: "",
    });
  useEscalationStreamSync({
    searchQuery,
    escalationStatus,
    escalationPriority,
  });

  const {
    escalationList,
    escalationPagination,
    escalationStats,
    emailSignature,
    error,
    isPending,
    isStatsPending,
    isError,
  } = useQueries({
    queries: [
      {
        queryKey: [
          "escalation-list",
          searchQuery,
          escalationStatus,
          escalationPriority,
          dateRange.from,
          dateRange.to,
          currentPage,
        ],
        queryFn: () =>
          api.ai_assistant_service.getEscalationList({
            page: currentPage,
            limit: 10,
            search: searchQuery,
            status: escalationStatus ?? undefined,
            priority: escalationPriority ?? undefined,
            dateFrom: dateRange.from ?? undefined,
            dateTo: dateRange.to ?? undefined,
          }),
      },
      {
        queryKey: ["escalation-stats", dateRange.from, dateRange.to],
        queryFn: () =>
          api.ai_assistant_service.getEscalationStatistics({
            dateFrom: dateRange.from ?? undefined,
            dateTo: dateRange.to ?? undefined,
          }),
      },
      {
        queryKey: ["email-signature"],
        queryFn: () => api.ai_assistant_service.getEmailSignature(),
      },
    ],
    combine: (results) => ({
      escalationList: results[0].data?.data,
      escalationPagination: results[0].data?.pagination,
      escalationStats: results[1].data,
      emailSignature: results[2].data,
      isPending: results[0].isPending,
      isStatsPending: results[1].isPending,
      isError: results.some((result) => result.isError),
      error: results.find((result) => result.error)?.error,
    }),
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    escalationStatus,
    escalationPriority,
    dateRange.from,
    dateRange.to,
  ]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setEscalationStatus(null);
    setEscalationPriority(null);
    setDateRange({ from: null, to: null });
    setSelectedEmailsForBulkAction(new Set());
  };

  useEffect(() => {
    if (!selectedEscalationFromUrl) return;
    setEscalationStatus(null);
    setEscalationPriority(null);
    setSelectedEscalationForPreview((previous) =>
      previous === selectedEscalationFromUrl ? previous : selectedEscalationFromUrl,
    );
  }, [selectedEscalationFromUrl]);

  if (isError) {
    toast.error("Error fetching data", {
      description: error?.message || "Please try again!",
    });
  }

  const selectedEscalationDetails = useMemo(() => {
    if (!selectedEscalationForPreview || !escalationList) return null;
    return escalationList.find(
      (escalation) => escalation.id === selectedEscalationForPreview,
    );
  }, [selectedEscalationForPreview, escalationList]);

  const {
    data: selectedEscalationFallbackDetails,
    isPending: isSpecificEscalationPending,
    isError: isSpecificEscalationError,
  } = useQuery({
    queryKey: ["specific-escalation", selectedEscalationForPreview],
    queryFn: () =>
      api.ai_assistant_service.getSpecificEscalation(
        selectedEscalationForPreview ?? "",
      ),
    enabled:
      !!selectedEscalationForPreview &&
      !selectedEscalationDetails &&
      (searchParams.has("escalationId") || searchParams.has("email")),
  });

  const resolvedSelectedEscalationDetails =
    selectedEscalationDetails ?? selectedEscalationFallbackDetails ?? null;

  const totalPages = escalationPagination?.totalPages ?? 0;
  const totalItems = escalationPagination?.totalItems ?? 0;
  const itemsPerPage = escalationPagination?.itemsPerPage ?? 10;
  const hasNextPage = escalationPagination?.hasNextPage ?? false;
  const hasPreviousPage = escalationPagination?.hasPreviousPage ?? false;

  const isResolvingDeepLinkedEscalation =
    !!selectedEscalationFromUrl &&
    !resolvedSelectedEscalationDetails &&
    (isPending || isSpecificEscalationPending);

  const isDeepLinkedEscalationNotFound =
    !!selectedEscalationFromUrl &&
    !resolvedSelectedEscalationDetails &&
    !isResolvingDeepLinkedEscalation &&
    isSpecificEscalationError;

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      escalationStatus,
      setEscalationStatus,
      escalationPriority,
      setEscalationPriority,
      dateRange,
      setDateRange,
      isPending,
      isStatsPending,
      currentPage,
      setCurrentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage,
      hasPreviousPage,
      escalationList,
      escalationStats,
      emailSignature,
      selectedEscalationForPreview,
      setSelectedEscalationForPreview,
      selectedEmailsForBulkAction,
      setSelectedEmailsForBulkAction,
      selectedEscalationDetails: resolvedSelectedEscalationDetails,
      deepLinkedEscalationId: selectedEscalationFromUrl,
      isResolvingDeepLinkedEscalation,
      isDeepLinkedEscalationNotFound,
      feedbackDialogData,
      setFeedbackDialogData,
      clearAllFilters,
    }),
    [
      searchQuery,
      escalationStatus,
      escalationPriority,
      dateRange,
      isPending,
      isStatsPending,
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage,
      hasPreviousPage,
      escalationList,
      escalationStats,
      emailSignature,
      selectedEscalationForPreview,
      selectedEmailsForBulkAction,
      resolvedSelectedEscalationDetails,
      selectedEscalationFromUrl,
      isResolvingDeepLinkedEscalation,
      isDeepLinkedEscalationNotFound,
      feedbackDialogData,
    ],
  );

  return (
    <AiAssistantContext.Provider value={value}>
      {children}
    </AiAssistantContext.Provider>
  );
};
