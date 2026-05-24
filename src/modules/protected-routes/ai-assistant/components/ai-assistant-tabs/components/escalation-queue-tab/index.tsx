import EscalationQueueEmailsList from "./components/escalation-emails-list";
import EscalationEmailPreview from "./components/escalation_email_preview";
import EscalationEmailResponseFeedbackDialog from "./components/escalation_email_preview/components/feedback-dialog";
import EscalationFiltersBar from "./components/escalation-filters-bar";

const EscalationQueueTab = () => {
  return (
    <div className="flex flex-col gap-4">
      <EscalationFiltersBar />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <EscalationQueueEmailsList className="lg:col-span-2" />
        <EscalationEmailPreview className="lg:col-span-3" />
      </div>

      <EscalationEmailResponseFeedbackDialog />
    </div>
  );
};

export default EscalationQueueTab;
