import EscalationQueueEmailsList from "./components/escalation-emails-list";
import { EscalationEmailsListProvider } from "./components/escalation-emails-list/utils/context/escalation-emails-filters";
import EscalationEmailPreview from "./components/escalation_email_preview";
import EscalationEmailResponseFeedbackDialog from "./components/escalation_email_preview/components/feedback-dialog";

const EscalationQueueTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <EscalationEmailsListProvider>
        {/* Escalation Queue Emails List */}
        <EscalationQueueEmailsList className="lg:col-span-2 h-fit" />
        {/* Escalation Email Preview */}
        <EscalationEmailPreview className="lg:col-span-3" />
        {/* Feedback Dialog - If AI Generated Response is Rejected */}
        <EscalationEmailResponseFeedbackDialog />
      </EscalationEmailsListProvider>
    </div>
  );
};

export default EscalationQueueTab;
