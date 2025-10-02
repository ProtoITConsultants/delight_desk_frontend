"use client";
import React, { createContext, useContext, useState } from "react";
import { ESCALATED_EMAIL_TYPE } from "../../types/escalation-email";

type ESCALATION_EMAILS_FILTERS_CONTEXT_TYPE = {
  // Search Bar
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  // Status Tabs
  emailStatus: string;
  setEmailStatus: React.Dispatch<React.SetStateAction<string>>;
  // Priority Tabs
  emailPriority: string;
  setEmailPriority: React.Dispatch<React.SetStateAction<string>>;
  // Selected Email
  selectedEmailForPreview: string | null;
  setSelectedEmailForPreview: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  // Selected Emails
  selectedEmails: Set<string>;
  setSelectedEmails: React.Dispatch<React.SetStateAction<Set<string>>>;
  // Filtered Emails Array
  FILTERED_EMAILS: ESCALATED_EMAIL_TYPE[];
};

const EscalationEmailsListContext =
  createContext<ESCALATION_EMAILS_FILTERS_CONTEXT_TYPE | null>(null);

const escalatedEmails: ESCALATED_EMAIL_TYPE[] = [
  {
    id: "1",
    emailId: "1",
    userId: "1",
    subject: "Test Email",
    customerEmail: "l7cBj@example.com",
    body: "Hello, this is a test email.",
    priority: "low" as const,
    status: "pending" as const,
    classification: "Refund Request",
    reason: "Customer request for refund",
    assignedTo: "Babar",
    notes: "No notes",
    aiSuggestedResponse: "Hello, this is a test response.",
    aiConfidence: 0.8,
    createdAt: "2023-01-01",
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
