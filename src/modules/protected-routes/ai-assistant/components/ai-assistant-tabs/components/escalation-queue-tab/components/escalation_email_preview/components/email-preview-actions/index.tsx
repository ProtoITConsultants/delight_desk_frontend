import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEscalationEmails } from "../../../escalation-emails-list/utils/context/escalation-emails-filters";

const EmailPreviewActions = () => {
  const { selectedEmailDetails } = useEscalationEmails();

  return (
    <Card className="gap-6">
      <CardHeader className="gap-0">
        <CardTitle className="text-base">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 flex-wrap">
          {selectedEmailDetails?.status === "pending" && (
            <Button
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700 !h-9"
              //   onClick={() => {
              //     markInProgressMutation.mutate({
              //       emailId: selectedEmailDetails.id,
              //     });
              //   }}
              //   disabled={markInProgressMutation.isPending}
            >
              {/* {markInProgressMutation.isPending
                ? "Updating..."
                : "Mark In Progress"} */}
              Mark In Progress
            </Button>
          )}

          {/* Show Mark as Resolved for pending and in_progress tickets */}
          {(selectedEmailDetails?.status === "pending" ||
            selectedEmailDetails?.status === "in_progress") && (
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 !h-9"
              //   onClick={() => {
              //     markResolvedMutation.mutate({
              //       emailId: selectedEmailDetails.id,
              //     });
              //   }}
              //   disabled={markResolvedMutation.isPending}
            >
              {/* {markResolvedMutation.isPending
                ? "Resolving..."
                : "Mark as Resolved"} */}
              Mark as Resolved
            </Button>
          )}

          {/* Show Mark as Unresolved for resolved tickets */}
          {selectedEmailDetails?.status === "resolved" && (
            <Button
              size="sm"
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50 !h-9"
              onClick={() => {
                // markUnresolvedMutation.mutate({
                //   emailId: selectedEmailDetails.id,
                // });
              }}
              //   disabled={markUnresolvedMutation.isPending}
            >
              {/* {markUnresolvedMutation.isPending
                ? "Reopening..."
                : "Mark as Unresolved"} */}
              Mark as Unresolved
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPreviewActions;
