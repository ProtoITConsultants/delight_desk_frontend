"use client";
import { Checkbox } from "@/components/ui/checkbox";
import getPriorityColor from "../../utils/email-card/get-priority-color";
import getEmailCreationTime from "../../utils/email-card/get-email-creation-time";
import getEmailStatusColor from "../../utils/email-card/get-email-status-color";
import getEmailPriorityIcon from "../../utils/email-card/get-email-priority-icon";
import { Badge } from "@/components/ui/badge";
import { EscalationType } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import { useAiAssistant } from "@/providers/ai-assistant";

const EscalationEmailCard = ({
  id,
  priority,
  status,
  createdAt,
  reason,
  email,
}: EscalationType) => {
  const {
    selectedEmailsForBulkAction,
    setSelectedEmailsForBulkAction,
    selectedEscalationForPreview,
    setSelectedEscalationForPreview,
  } = useAiAssistant();

  const EmailIcon = getEmailPriorityIcon(priority);
  const EmailCreationTime = getEmailCreationTime(createdAt);

  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer ${
        selectedEscalationForPreview === id
          ? "bg-blue-50 border-r-2 border-blue-500"
          : ""
      } ${selectedEmailsForBulkAction.has(id) ? "bg-blue-25" : ""}`}
      onClick={() => setSelectedEscalationForPreview(id)}
    >
      <div className="space-y-3">
        {/* Header with checkbox, subject, and badges */}
        <div className="flex items-start gap-3">
          <Checkbox
            checked={selectedEmailsForBulkAction.has(id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedEmailsForBulkAction((prev) => new Set(prev).add(id));
              } else {
                setSelectedEmailsForBulkAction((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(id);
                  return newSet;
                });
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate mb-1 capitalize">
                  {email?.subject}
                </p>
                <p className="text-xs text-gray-500">
                  From:{" "}
                  <b>
                    <i>{email?.fromEmail}</i>
                  </b>
                </p>
              </div>
              <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                <Badge
                  variant="outline"
                  className={`text-xs ${getPriorityColor(priority)}`}
                >
                  <EmailIcon className="h-3 w-3" />
                  <span className="capitalize">{priority}</span>
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-xs ${getEmailStatusColor(status)}`}
                >
                  {status?.replace("_", " ") || "Unknown"}
                </Badge>
              </div>
            </div>

            {/* Metadata row */}
            <div className="space-y-1 text-xs text-gray-500">
              <div>Created: {EmailCreationTime}</div>
              {reason && <div>Reason: {reason}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalationEmailCard;
