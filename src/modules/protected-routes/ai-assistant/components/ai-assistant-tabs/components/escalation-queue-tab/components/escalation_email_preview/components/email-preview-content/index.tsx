import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEscalationEmails } from "../../../escalation-emails-list/utils/context/escalation-emails-filters";

const EmailPreviewContent = () => {
  const { selectedEmailDetails } = useEscalationEmails();
  return (
    <Card>
      <CardHeader className="gap-0">
        <CardTitle className="text-base">Original Email Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-gray-50 border rounded-md text-sm whitespace-pre-wrap">
          {selectedEmailDetails?.body}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPreviewContent;
