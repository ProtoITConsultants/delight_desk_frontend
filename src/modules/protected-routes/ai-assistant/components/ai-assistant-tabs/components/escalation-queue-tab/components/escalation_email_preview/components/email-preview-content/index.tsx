import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAiAssistant } from "@/providers/ai-assistant";

const EmailPreviewContent = () => {
  const { selectedEscalationDetails } = useAiAssistant();
  return (
    <Card>
      <CardHeader className="gap-0">
        <CardTitle className="text-base">Original Email Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="p-4 bg-gray-50 border rounded-md text-sm whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: selectedEscalationDetails?.email?.body ?? "",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default EmailPreviewContent;
