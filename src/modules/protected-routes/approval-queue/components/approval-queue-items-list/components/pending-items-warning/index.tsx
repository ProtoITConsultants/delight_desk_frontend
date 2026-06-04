import { TriangleAlert } from "lucide-react";

const PendingItemsWarningTip = () => {
  return (
    <div className="flex items-center gap-2 p-4 bg-red-100/35 rounded-lg border border-red-400 text-red-400">
      <TriangleAlert className="w-4 h-4" />
      <p className="text-sm">
        <b>112 AI Agent actions</b> waiting for approval. Review each action
        carefully before approving or rejecting.
      </p>
    </div>
  );
};

export default PendingItemsWarningTip;
