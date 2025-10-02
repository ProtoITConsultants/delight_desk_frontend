import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmailSignatureInfoCard from "./components/info-card";
import SignatureBuilderTabs from "./components/signature-builder-tabs";
import SignaturePreview from "./components/signature-preview";
import { SignatureBuilderProvider } from "./utils/context/signature-builder-context";

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
        <SignatureBuilderProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SignatureBuilderTabs />
            {/* Signatuer Preview */}
            <SignaturePreview />
          </div>
        </SignatureBuilderProvider>
      </CardContent>
    </Card>
  );
};

export default EmailSignatureTab;
