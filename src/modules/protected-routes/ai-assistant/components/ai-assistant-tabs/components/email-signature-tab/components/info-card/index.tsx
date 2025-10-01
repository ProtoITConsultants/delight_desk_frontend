import { Info } from "lucide-react";

const EmailSignatureInfoCard = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Email Signature Usage</p>
          <p>
            Your email signature will be automatically appended to the end of
            every response sent from this system, including AI-generated
            responses and manually written emails. You can choose to exclude the
            signature on individual emails when composing responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailSignatureInfoCard;
