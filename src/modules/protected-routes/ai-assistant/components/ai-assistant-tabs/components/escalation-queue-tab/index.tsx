import EscalationQueueEmailsList from "./components/escalation-emails-list";
import EscalationEmailPreview from "./components/escalation_email_preview";
import EscalationEmailResponseFeedbackDialog from "./components/escalation_email_preview/components/feedback-dialog";

const EscalationQueueTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Escalation Queue Emails List */}
      <EscalationQueueEmailsList className="lg:col-span-2 h-fit" />
      {/* Escalation Email Preview */}
      <EscalationEmailPreview className="lg:col-span-3" />
      {/* Feedback Dialog - If AI Generated Response is Rejected */}
      <EscalationEmailResponseFeedbackDialog />
    </div>
  );
};

export default EscalationQueueTab;
