import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAiAssistant } from "@/providers/ai-assistant";
import { EscalationStatus } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import { useUpdateEscalationStatus } from "@/hooks/services/ai-assistant/use-update-escalation-status";
import { Loader } from "lucide-react";

const EmailPreviewActions = () => {
  const { selectedEscalationDetails } = useAiAssistant();
  const { isPending, updateEscalationStatus } = useUpdateEscalationStatus();

  return (
    <Card className="gap-6">
      <CardHeader className="gap-0">
        <CardTitle className="text-base">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex items-center gap-1">
            <Loader className="animate-spin h-5 w-5 text-gray-500" />
            <span className="ml-2 text-gray-500">Updating status...</span>
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {selectedEscalationDetails?.status === EscalationStatus.PENDING && (
              <Button
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700 !h-9"
                onClick={() => {
                  updateEscalationStatus({
                    type: "single",
                    escalationIds: [selectedEscalationDetails?.id],
                    status: EscalationStatus.IN_PROGRESS,
                  });
                }}
                disabled={isPending}
              >
                Mark In Progress
              </Button>
            )}

            {/* Show Mark as Resolved for pending and in_progress tickets */}
            {(selectedEscalationDetails?.status === EscalationStatus.PENDING ||
              selectedEscalationDetails?.status ===
                EscalationStatus.IN_PROGRESS) && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 !h-9"
                onClick={() => {
                  updateEscalationStatus({
                    type: "single",
                    escalationIds: [selectedEscalationDetails?.id],
                    status: EscalationStatus.RESOLVED,
                  });
                }}
                disabled={isPending}
              >
                Mark as Resolved
              </Button>
            )}

            {/* Show Mark as Unresolved for resolved tickets */}
            {selectedEscalationDetails?.status ===
              EscalationStatus.RESOLVED && (
              <Button
                size="sm"
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50 !h-9"
                onClick={() => {
                  updateEscalationStatus({
                    type: "single",
                    escalationIds: [selectedEscalationDetails?.id],
                    status: EscalationStatus.PENDING,
                  });
                }}
                disabled={isPending}
              >
                Mark as Unresolved
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailPreviewActions;
