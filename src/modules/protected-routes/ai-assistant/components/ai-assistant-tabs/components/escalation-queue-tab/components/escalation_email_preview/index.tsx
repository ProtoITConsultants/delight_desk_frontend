import { cn } from "@/lib/utils";
import { ESCALATION_EMAIL_PREVIEW_PROPS } from "../../types/escalation-email-preview";

const EscalationEmailPreview = ({
  className,
}: ESCALATION_EMAIL_PREVIEW_PROPS) => {
  return <div className={cn(className)}>EscalationEmailPreview</div>;
};

export default EscalationEmailPreview;
