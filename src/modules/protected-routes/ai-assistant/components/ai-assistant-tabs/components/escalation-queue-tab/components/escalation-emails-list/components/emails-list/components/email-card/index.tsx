"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useEscalationEmails } from "../../../../utils/context/escalation-emails-filters";
import getPriorityColor from "../../utils/email-card/get-priority-color";
import getEmailCreationTime from "../../utils/email-card/get-email-creation-time";
import getEmailStatusColor from "../../utils/email-card/get-email-status-color";
import getEmailPriorityIcon from "../../utils/email-card/get-email-priority-icon";
import { Badge } from "@/components/ui/badge";
import { ESCALATION_EMAIL_CARD_PROPS } from "../../../../utils/types/escalation-email";

const EscalationEmailCard = ({
  id,
  subject,
  customerEmail,
  priority,
  status,
  createdAt,
  reason,
}: ESCALATION_EMAIL_CARD_PROPS) => {
  const {
    selectedEmails,
    setSelectedEmails,
    selectedEmailForPreview,
    setSelectedEmailForPreview,
  } = useEscalationEmails();

  const EmailIcon = getEmailPriorityIcon(priority);
  const EmailCreationTime = getEmailCreationTime(createdAt);

  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer ${
        selectedEmailForPreview === id
          ? "bg-blue-50 border-r-2 border-blue-500"
          : ""
      } ${selectedEmails.has(id) ? "bg-blue-25" : ""}`}
      onClick={() => setSelectedEmailForPreview(id)}
    >
      <div className="space-y-3">
        {/* Header with checkbox, subject, and badges */}
        <div className="flex items-start gap-3">
          <Checkbox
            checked={selectedEmails.has(id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedEmails((prev) => new Set(prev).add(id));
              } else {
                setSelectedEmails((prev) => {
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
                <p className="font-medium text-sm text-gray-900 truncate mb-1">
                  {subject}
                </p>
                <p className="text-xs text-gray-500">From: {customerEmail}</p>
              </div>
              <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                <Badge
                  variant="outline"
                  className={`text-xs ${getPriorityColor(priority)}`}
                >
                  <EmailIcon className="h-3 w-3" />
                  <span className="ml-1 capitalize">{priority}</span>
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
