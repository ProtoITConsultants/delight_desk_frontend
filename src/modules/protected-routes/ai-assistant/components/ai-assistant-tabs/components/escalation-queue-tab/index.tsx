import EscalationQueueEmailsList from "./components/escalation-emails-list";
import EscalationEmailPreview from "./components/escalation_email_preview";

const EscalationQueueTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <EscalationQueueEmailsList className="lg:col-span-2" />
      <EscalationEmailPreview className="lg:col-span-3" />
    </div>
  );
};

export default EscalationQueueTab;
