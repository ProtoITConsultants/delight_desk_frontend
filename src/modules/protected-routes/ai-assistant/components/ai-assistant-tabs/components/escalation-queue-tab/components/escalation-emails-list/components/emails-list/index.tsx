"use client";
import { useAiAssistant } from "@/providers/ai-assistant";
import EscalationEmailCard from "./components/email-card";
import EscalationEmailsSkeleton from "./components/emails-skeleton";

const EscalationEmailsList = () => {
  const { escalationList, isPending } = useAiAssistant();

  if (isPending) {
    return <EscalationEmailsSkeleton />;
  }

  return escalationList?.length === 0 ? (
    <div className="p-4 text-center text-gray-500">
      No escalated emails found
    </div>
  ) : (
    <div className="divide-y">
      {escalationList?.map((escalation) => (
        <EscalationEmailCard key={escalation.id} {...escalation} />
      ))}
    </div>
  );
};

export default EscalationEmailsList;
