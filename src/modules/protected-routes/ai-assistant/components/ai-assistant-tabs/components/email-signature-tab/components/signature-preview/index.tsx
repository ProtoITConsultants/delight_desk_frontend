"use client";

import { Eye } from "lucide-react";
import { useSignatureBuilder } from "../../utils/context/signature-builder-context";

const SignaturePreview = () => {
  const { signatureHtml } = useSignatureBuilder();
  return (
    <div className="space-y-4 w-full h-fit lg:bg-gray-50 lg:p-4 lg:rounded-lg">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <Eye className="h-5 w-5" />
        Live Preview
      </h3>
      <div
        className="px-6 py-4 bg-gray-50 border border-gray-200 rounded-md min-h-30"
        dangerouslySetInnerHTML={{ __html: signatureHtml }}
      />
    </div>
  );
};

export default SignaturePreview;
