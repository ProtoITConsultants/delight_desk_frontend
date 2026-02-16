"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAiAssistant } from "@/providers/ai-assistant";
import { EscalationPriority } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";

const EscalationEmailPriorityFilter = () => {
  const {
    escalationPriority,
    setEscalationPriority,
    setSelectedEscalationForPreview,
  } = useAiAssistant();

  const handleChange = (value: EscalationPriority) => {
    if (value === EscalationPriority.ALL) {
      return setEscalationPriority(null);
    }
    setEscalationPriority(value as EscalationPriority);
    setSelectedEscalationForPreview(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">
        Priority Filter
      </label>
      <Select
        value={escalationPriority || EscalationPriority.ALL}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All priorities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EscalationPriority.ALL}>All Priorities</SelectItem>
          <SelectItem value={EscalationPriority.URGENT}>🔴 Urgent</SelectItem>
          <SelectItem value={EscalationPriority.HIGH}>🟠 High</SelectItem>
          <SelectItem value={EscalationPriority.MEDIUM}>🟡 Medium</SelectItem>
          <SelectItem value={EscalationPriority.LOW}>🔵 Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EscalationEmailPriorityFilter;
