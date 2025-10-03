import EscalationQueueEmailsList from "./components/escalation-emails-list";
import { EscalationEmailsListProvider } from "./components/escalation-emails-list/utils/context/escalation-emails-filters";
import EscalationEmailPreview from "./components/escalation_email_preview";

const EscalationQueueTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <EscalationEmailsListProvider>
        <EscalationQueueEmailsList className="lg:col-span-2 h-fit" />
        <EscalationEmailPreview className="lg:col-span-3" />
      </EscalationEmailsListProvider>
    </div>
  );
};

export default EscalationQueueTab;
