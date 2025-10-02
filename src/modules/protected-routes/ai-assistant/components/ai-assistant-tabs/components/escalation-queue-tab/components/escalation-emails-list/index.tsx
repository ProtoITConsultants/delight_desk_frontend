import { cn } from "@/lib/utils";
import { ESCALATION_EMAILS_LIST_PROPS } from "../../types/escalation-emails-list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SearchBar from "./components/email-filters/search-bar";
import EscalationEmailsStatusTabsList from "./components/email-filters/emails-status-filter";
import EscalationEmailPriorityFilter from "./components/email-filters/email-priority-filter";
import BulkActionTab from "./components/email-filters/bulk-action";
import SelectAllEscalationEmailsButton from "./components/email-filters/select-all-emails-button";
import EscalationEmailsList from "./components/emails-list";

const EscalationQueueEmailsList = ({
  className,
}: ESCALATION_EMAILS_LIST_PROPS) => {
  return (
    <Card className={cn(className)}>
      {/* Filters Header */}
      <CardHeader className="space-y-3">
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

      {/* Emails List */}
      <CardContent className="p-0 max-h-[500px] overflow-y-auto">
        <EscalationEmailsList />
      </CardContent>
    </Card>
  );
};

export default EscalationQueueEmailsList;
