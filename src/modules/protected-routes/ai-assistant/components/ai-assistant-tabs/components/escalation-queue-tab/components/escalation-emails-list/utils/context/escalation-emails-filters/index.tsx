"use client";
import React, { createContext, useContext, useState } from "react";
import { ESCALATED_EMAIL_TYPE } from "../../types/escalation-email";
import {
  ESCALATION_EMAILS_FILTERS_CONTEXT_TYPE,
  FEEDBACK_DIALOG_DATA_TYPE,
} from "../../types/escalation-email-context";

const EscalationEmailsListContext =
  createContext<ESCALATION_EMAILS_FILTERS_CONTEXT_TYPE | null>(null);

const escalatedEmails: ESCALATED_EMAIL_TYPE[] = [
  {
    id: "1",
    emailId: "1",
    userId: "1",
    subject:
      "Re: ⭐️ Friendly reminder to please leave a review on our site ⭐️",
    customerEmail: "l7cBj@example.com",
    body: "I placed two orders, order number 19468 and order #19463 today. since the orders were placed separately by accident, is it possible to have the orders combined and the shipping cost adjusted down appropriately?",
    priority: "high" as const,
    status: "pending" as const,
    classification: "Refund Request",
    reason:
      "Email processing failed: could not extend file because project size limit (102400 MB) has been exceeded",
    assignedTo: "Babar",
    notes: "No notes",
    aiSuggestedResponse: "Hello, this is a test response.",
    aiConfidence: 0.4,
    createdAt: "Sep 29, 2025 3:53 AM",
    resolvedAt: "2023-01-02",
  },
  {
    id: "2",
    emailId: "1",
    userId: "1",
    subject:
      "New Message From Human Food Bar: Food Fit for a Human - Contact Us",
    customerEmail: "Human Food Bar <hello@humanfoodbar.com>",
    body: "Would you like a complimentary professional cleaning proposal for your business? Simply let me know and I’ll provide details for a complimentary, no-obligation cleaning quote. Thank you for your time, Samantha Lawrence.",
    priority: "low" as const,
    status: "resolved" as const,
    classification: "Refund Request",
    reason:
      "General inquiry requiring human review: The email is a promotional offer for a cleaning service and does not contain any customer service-related inquiries or issues. It is not from a customer but rather a business proposal.",
    assignedTo: "Babar",
    notes: "No notes",
    aiSuggestedResponse:
      "Hello Samantha, Thank you for reaching out to us with your offer. At this time, we are not in need of cleaning services, but we appreciate your consideration. If our needs change in the future, we will certainly keep Sterling Clean Services in mind. Best regards, Customer Service Team",
    aiConfidence: 0.8,
    createdAt: "Sep 12, 2025 6:43 PM",
    resolvedAt: "Sep 12, 2025 6:43 PM",
  },
  {
    id: "3",
    emailId: "1",
    userId: "1",
    subject: "Rewards points",
    customerEmail: "Human Food Bar Support <hello@humanfoodbar.com>",
    body: "Your email signature will be automatically appended to the end of every response sent from this system, including AI-generated responses and manually written emails. You can choose to exclude the signature on individual emails when composing responses.",
    priority: "medium" as const,
    status: "resolved" as const,
    classification: "Refund Request",
    reason: "Customer request for refund",
    assignedTo: "Babar",
    notes: "No notes",
    aiSuggestedResponse:
      "General inquiry requiring human review: The customer is inquiring about missing rewards points for their past orders, which relates to a financial concern regarding the benefits they expected to receive. This aligns with the promo_refund category as it involves a discrepancy in expected rewards or benefits.",
    aiConfidence: 0.8,
    createdAt: "Sep 9, 2025 6:21 AM",
    resolvedAt: "2023-01-02",
  },
  {
    id: "4",
    emailId: "1",
    userId: "1",
    subject: "Rewards points",
    customerEmail: "Human Food Bar Support <hello@humanfoodbar.com>",
    body: "Your email signature will be automatically appended to the end of every response sent from this system, including AI-generated responses and manually written emails. You can choose to exclude the signature on individual emails when composing responses.",
    priority: "urgent" as const,
    status: "in_progress" as const,
    classification: "Refund Request",
    reason: "Customer request for refund",
    assignedTo: "Babar",
    notes: "No notes",
    aiSuggestedResponse:
      "General inquiry requiring human review: The customer is inquiring about missing rewards points for their past orders, which relates to a financial concern regarding the benefits they expected to receive. This aligns with the promo_refund category as it involves a discrepancy in expected rewards or benefits.",
    aiConfidence: 0.8,
    createdAt: "Sep 9, 2025 6:21 AM",
    resolvedAt: "2023-01-02",
  },
  {
    id: "5",
    emailId: "1",
    userId: "1",
    subject: "Rewards points",
    customerEmail: "Human Food Bar Support <hello@humanfoodbar.com>",
    body: "Your email signature will be automatically appended to the end of every response sent from this system, including AI-generated responses and manually written emails. You can choose to exclude the signature on individual emails when composing responses.",
    priority: "medium" as const,
    status: "pending" as const,
    classification: "Refund Request",
    reason: "Customer request for refund",
    assignedTo: "Babar",
    notes: "No notes",
    aiSuggestedResponse:
      "General inquiry requiring human review: The customer is inquiring about missing rewards points for their past orders, which relates to a financial concern regarding the benefits they expected to receive. This aligns with the promo_refund category as it involves a discrepancy in expected rewards or benefits.",
    aiConfidence: 0.8,
    createdAt: "Sep 9, 2025 6:21 AM",
    resolvedAt: "2023-01-02",
  },
];

export const EscalationEmailsListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailStatus, setEmailStatus] = useState<string>("pending");
  const [emailPriority, setEmailPriority] = useState<string>("all");
  const [selectedEmailForPreview, setSelectedEmailForPreview] = useState<
    string | null
  >(null);
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [feedbackDialogData, setFeedbackDialogData] =
    useState<FEEDBACK_DIALOG_DATA_TYPE>({
      isOpen: false,
      emailId: "",
    });

  // Filter Emails List
  const FILTERED_EMAILS = escalatedEmails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      emailPriority === "all" || email.priority === emailPriority;
    const matchesStatus = emailStatus === "all" || email.status === emailStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const selectedEmailDetails = selectedEmailForPreview
    ? escalatedEmails.find((email) => email.id === selectedEmailForPreview)
    : null;

  return (
    <EscalationEmailsListContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        emailStatus,
        setEmailStatus,
        emailPriority,
        setEmailPriority,
        selectedEmailForPreview,
        setSelectedEmailForPreview,
        selectedEmails,
        setSelectedEmails,
        FILTERED_EMAILS,
        selectedEmailDetails,
        feedbackDialogData,
        setFeedbackDialogData,
      }}
    >
      {children}
    </EscalationEmailsListContext.Provider>
  );
};

export const useEscalationEmails = () => {
  const ctx = useContext(EscalationEmailsListContext);
  if (!ctx)
    throw new Error(
      "useSignaturePreview must be used inside SignaturePreviewProvider"
    );
  return ctx;
};
