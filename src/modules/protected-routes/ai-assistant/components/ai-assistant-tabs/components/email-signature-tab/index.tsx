import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmailSignatureInfoCard from "./components/info-card";
import SignatureBuilderTabs from "./components/signature-builder-tabs";

const EmailSignatureTab = () => {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Professional Email Signature
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <EmailSignatureInfoCard />
        {/* Signature Buidler Options - Tabs */}
        <SignatureBuilderTabs />
      </CardContent>
    </Card>
  );
};

export default EmailSignatureTab;
