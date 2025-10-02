"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEscalationEmails } from "../../../utils/context/escalation-emails-filters";

const EscalationEmailPriorityFilter = () => {
  const { emailPriority, setEmailPriority } = useEscalationEmails();
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">
        Priority Filter
      </label>
      <Select value={emailPriority} onValueChange={setEmailPriority}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All priorities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="urgent">🔴 Urgent</SelectItem>
          <SelectItem value="high">🟠 High</SelectItem>
          <SelectItem value="medium">🟡 Medium</SelectItem>
          <SelectItem value="low">🔵 Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EscalationEmailPriorityFilter;
