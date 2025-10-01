import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmailSignatureInfoCard from "./components/info-card";
import SignatureBuilderTabs from "./components/signature-builder-tabs";
import { Eye } from "lucide-react";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SignatureBuilderTabs />
          {/* Signatuer Preview */}
          <div className="space-y-4 w-full h-fit lg:bg-gray-50 lg:p-4 lg:rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5" />
              Live Preview
            </h3>
            <div
              className="px-4 py-12 bg-gray-50 border border-gray-200 rounded-md"
              // dangerouslySetInnerHTML={{ __html: getPreviewHtml() }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSignatureTab;
