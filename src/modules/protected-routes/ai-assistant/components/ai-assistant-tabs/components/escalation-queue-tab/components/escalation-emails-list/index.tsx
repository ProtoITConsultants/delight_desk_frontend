import { cn } from "@/lib/utils";
import { ESCALATION_EMAILS_LIST_PROPS } from "../../types/escalation-emails-list";

const EscalationQueueEmailsList = ({
  className,
}: ESCALATION_EMAILS_LIST_PROPS) => {
  return <div className={cn(className)}>EscalationQueueEmailsList</div>;
};

export default EscalationQueueEmailsList;
