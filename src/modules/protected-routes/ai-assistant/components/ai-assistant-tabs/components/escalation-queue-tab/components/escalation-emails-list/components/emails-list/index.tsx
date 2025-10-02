"use client";
import { useEscalationEmails } from "../../utils/context/escalation-emails-filters";
import EscalationEmailCard from "./components/email-card";
import EscalationEmailsSkeleton from "./components/emails-skeleton";

const EscalationEmailsList = () => {
  const isPending = false;
  const { FILTERED_EMAILS } = useEscalationEmails();
  return isPending ? (
    <EscalationEmailsSkeleton />
  ) : FILTERED_EMAILS.length === 0 ? (
    <div className="p-4 text-center text-gray-500">
      No escalated emails found
    </div>
  ) : (
    FILTERED_EMAILS.map((email) => (
      <EscalationEmailCard key={email.id} {...email} />
    ))
  );
};

export default EscalationEmailsList;
