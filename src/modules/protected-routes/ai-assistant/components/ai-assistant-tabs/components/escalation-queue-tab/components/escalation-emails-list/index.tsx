"use client";
import { cn } from "@/lib/utils";
import { ESCALATION_EMAILS_LIST_PROPS } from "../../types/escalation-emails-list";
import { Card } from "@/components/ui/card";
import EscalationEmailsList from "./components/emails-list";
import EscalationPagination from "./components/escalation-pagination";
import EscalationListToolbar from "./components/escalation-list-toolbar";
import EscalationBulkActionBar from "./components/escalation-bulk-action-bar";

const EscalationQueueEmailsList = ({
  className,
}: ESCALATION_EMAILS_LIST_PROPS) => {
  return (
    <Card className={cn("h-fit gap-0 overflow-hidden p-0", className)}>
      <EscalationListToolbar />
      <EscalationBulkActionBar />
      <div className="max-h-[640px] overflow-y-auto">
        <EscalationEmailsList />
      </div>
      <EscalationPagination />
    </Card>
  );
};

export default EscalationQueueEmailsList;
