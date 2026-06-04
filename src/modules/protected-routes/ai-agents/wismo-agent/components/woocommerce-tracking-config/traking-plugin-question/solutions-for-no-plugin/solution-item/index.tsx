import { TrackingPluginSolutionItemProps } from "@/modules/protected-routes/ai-agents/wismo-agent/types";
import Link from "next/link";
import { FC } from "react";

const SolutionItem: FC<TrackingPluginSolutionItemProps> = ({
  title,
  description,
  referenceLink,
}) => {
  return (
    <div className="p-3 bg-white rounded-lg border border-green-200">
      <p className="font-medium text-green-900">{title}</p>
      <p className="text-sm text-green-700 mt-1">{description}</p>
      <Link
        href={referenceLink.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:underline mt-2 inline-block"
      >
        {referenceLink.label}
      </Link>
    </div>
  );
};

export default SolutionItem;
