"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useEscalationEmails } from "../../utils/context/escalation-emails-filters";

const EscalationEmailsStatusTabsList = () => {
  const { emailStatus, setEmailStatus } = useEscalationEmails();
  return (
    <Tabs value={emailStatus} onValueChange={setEmailStatus}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="pending" className="text-xs cursor-pointer">
          Pending
        </TabsTrigger>
        <TabsTrigger value="in_progress" className="text-xs cursor-pointer">
          Progress
        </TabsTrigger>
        <TabsTrigger value="resolved" className="text-xs cursor-pointer">
          Resolved
        </TabsTrigger>
        <TabsTrigger value="all" className="text-xs cursor-pointer">
          All
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EscalationEmailsStatusTabsList;
