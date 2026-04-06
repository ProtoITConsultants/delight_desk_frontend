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
import { useQueries } from "@tanstack/react-query";
import { createContext, FC, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

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
  isPending: boolean;
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
  feedbackDialogData: FEEDBACK_DIALOG_DATA_TYPE;
  setFeedbackDialogData: React.Dispatch<
    React.SetStateAction<FEEDBACK_DIALOG_DATA_TYPE>
  >;
}

const AiAssistantContext = createContext<AiAssistantContentType>({
  searchQuery: "",
  setSearchQuery: () => {},
  escalationStatus: null,
  setEscalationStatus: () => {},
  escalationPriority: null,
  setEscalationPriority: () => {},
  isPending: false,
  escalationList: undefined,
  escalationStats: undefined,
  emailSignature: undefined,
  selectedEscalationForPreview: null,
  setSelectedEscalationForPreview: () => {},
  selectedEmailsForBulkAction: new Set(),
  setSelectedEmailsForBulkAction: () => {},
  selectedEscalationDetails: null,
  feedbackDialogData: {
    isOpen: false,
    emailId: "",
  },
  setFeedbackDialogData: () => {},
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
  const [searchQuery, setSearchQuery] = useState("");
  const [escalationStatus, setEscalationStatus] =
    useState<EscalationStatus | null>(null);
  const [escalationPriority, setEscalationPriority] =
    useState<EscalationPriority | null>(null);
  const [selectedEscalationForPreview, setSelectedEscalationForPreview] =
    useState<string | null>(null);

  const [selectedEmailsForBulkAction, setSelectedEmailsForBulkAction] =
    useState<Set<string>>(new Set());
  const [feedbackDialogData, setFeedbackDialogData] =
    useState<FEEDBACK_DIALOG_DATA_TYPE>({
      isOpen: false,
      emailId: "",
    });

  const {
    escalationList,
    escalationStats,
    emailSignature,
    error,
    isPending,
    isError,
  } = useQueries({
    queries: [
      {
        queryKey: [
          "escalation-list",
          searchQuery,
          escalationStatus,
          escalationPriority,
        ],
        queryFn: () =>
          api.ai_assistant_service.getEscalationList({
            page: 1,
            limit: 10,
            search: searchQuery,
            status: escalationStatus ?? undefined,
            priority: escalationPriority ?? undefined,
          }),
      },
      {
        queryKey: ["escalation-stats"],
        queryFn: () => api.ai_assistant_service.getEscalationStatistics(),
      },
      {
        queryKey: ["email-signature"],
        queryFn: () => api.ai_assistant_service.getEmailSignature(),
      },
    ],
    combine: (results) => ({
      escalationList: results[0].data?.data,
      escalationStats: results[1].data,
      emailSignature: results[2].data,
      isPending: results.some((result) => result.isPending),
      isError: results.some((result) => result.isError),
      error: results.find((result) => result.error)?.error,
    }),
  });

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

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      escalationStatus,
      setEscalationStatus,
      escalationPriority,
      setEscalationPriority,
      isPending,
      escalationList,
      escalationStats,
      emailSignature,
      selectedEscalationForPreview,
      setSelectedEscalationForPreview,
      selectedEmailsForBulkAction,
      setSelectedEmailsForBulkAction,
      selectedEscalationDetails,
      feedbackDialogData,
      setFeedbackDialogData,
    }),
    [
      searchQuery,
      escalationStatus,
      escalationPriority,
      isPending,
      escalationList,
      escalationStats,
      emailSignature,
      selectedEscalationForPreview,
      selectedEmailsForBulkAction,
      selectedEscalationDetails,
      feedbackDialogData,
    ],
  );

  return (
    <AiAssistantContext.Provider value={value}>
      {children}
    </AiAssistantContext.Provider>
  );
};
