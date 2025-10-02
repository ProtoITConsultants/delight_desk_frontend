import { cn } from "@/lib/utils";
import { ESCALATION_EMAILS_LIST_PROPS } from "../../types/escalation-emails-list";
import { Card, CardHeader } from "@/components/ui/card";
import SearchBar from "./components/search-bar";
import { EscalationEmailsListProvider } from "./utils/context/escalation-emails-filters";
import EscalationEmailsStatusTabsList from "./components/emails-status-filter";
import EscalationEmailPriorityFilter from "./components/email-priority-filter";
import BulkActionTab from "./components/bulk-action";
import SelectAllEscalationEmailsButton from "./components/select-all-emails-button";

const EscalationQueueEmailsList = ({
  className,
}: ESCALATION_EMAILS_LIST_PROPS) => {
  return (
    <EscalationEmailsListProvider>
      <Card className={cn(className)}>
        <CardHeader className="space-y-3">
          {/* Filters */}
          {/* Search Bar */}
          <SearchBar />
          {/* Filter Tabs - Email Status */}
          <EscalationEmailsStatusTabsList />
          {/* Email Priority Filter */}
          <EscalationEmailPriorityFilter />
          {/* ------------------- */}
          {/* Bulk Action Section */}
          <BulkActionTab />
          {/* Select All / Clear Selection - Button */}
          <SelectAllEscalationEmailsButton />
        </CardHeader>
      </Card>
    </EscalationEmailsListProvider>
  );
};

export default EscalationQueueEmailsList;
