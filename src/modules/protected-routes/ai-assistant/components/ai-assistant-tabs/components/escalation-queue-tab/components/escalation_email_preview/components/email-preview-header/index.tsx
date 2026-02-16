import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import getEmailStatusColor from "../../../escalation-emails-list/components/emails-list/utils/email-card/get-email-status-color";
import getEmailPriorityIcon from "../../../escalation-emails-list/components/emails-list/utils/email-card/get-email-priority-icon";
import { cn } from "@/lib/utils";
import getPriorityColor from "../../../escalation-emails-list/components/emails-list/utils/email-card/get-priority-color";
import { useAiAssistant } from "@/providers/ai-assistant";

const EmailPreviewHeader = () => {
  const { selectedEscalationDetails } = useAiAssistant();
  const PriorityIcon = getEmailPriorityIcon(
    selectedEscalationDetails?.priority || "",
  );

  return (
    <Card>
      <CardHeader className="gap-0">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg capitalize">
              {selectedEscalationDetails?.email?.subject}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              From: {selectedEscalationDetails?.email?.fromEmail}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "capitalize",
                getPriorityColor(selectedEscalationDetails?.priority || ""),
              )}
            >
              <PriorityIcon className="h-4 w-4" />
              <span className="ml-1 capitalize">
                {selectedEscalationDetails?.priority}
              </span>
            </Badge>
            <Badge
              variant="secondary"
              className={cn(
                "capitalize",
                getEmailStatusColor(selectedEscalationDetails?.status || ""),
              )}
            >
              {selectedEscalationDetails?.status?.replace("_", " ") ||
                "Unknown"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 text-sm">
          {/* Email Date */}
          <div className="flex flex-col gap-1">
            <span className="font-medium text-gray-600">Created:</span>
            <p>{selectedEscalationDetails?.createdAt}</p>
          </div>
          {/* Escalation Reason */}
          <div className="flex flex-col gap-1">
            <span className="font-medium text-gray-600">
              Escalation Reason:
            </span>
            <p className="capitalize">
              {selectedEscalationDetails?.reason || "Unknown"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPreviewHeader;
