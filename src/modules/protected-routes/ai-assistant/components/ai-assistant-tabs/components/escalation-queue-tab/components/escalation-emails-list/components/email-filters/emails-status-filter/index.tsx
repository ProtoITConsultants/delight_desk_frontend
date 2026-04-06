"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useAiAssistant } from "@/providers/ai-assistant";
import { EscalationStatus } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";

const EscalationEmailsStatusTabsList = () => {
  const {
    escalationStatus,
    setEscalationStatus,
    setSelectedEmailsForBulkAction,
    setSelectedEscalationForPreview,
  } = useAiAssistant();

  const handleChange = (value: string) => {
    if (value === "all") {
      setEscalationStatus(null);
    } else {
      setEscalationStatus(value as EscalationStatus);
    }
    setSelectedEmailsForBulkAction(new Set());
    setSelectedEscalationForPreview(null);
  };

  return (
    <Tabs value={escalationStatus ?? "all"} onValueChange={handleChange}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger
          value={EscalationStatus.PENDING}
          className="text-xs cursor-pointer"
        >
          Pending
        </TabsTrigger>
        <TabsTrigger
          value={EscalationStatus.IN_PROGRESS}
          className="text-xs cursor-pointer"
        >
          Progress
        </TabsTrigger>
        <TabsTrigger
          value={EscalationStatus.RESOLVED}
          className="text-xs cursor-pointer"
        >
          Resolved
        </TabsTrigger>
        <TabsTrigger
          value={EscalationStatus.ALL}
          className="text-xs cursor-pointer"
        >
          All
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EscalationEmailsStatusTabsList;
