import { Bot } from "lucide-react";
import Link from "next/link";
import { AI_TRAINING_NOTIFICATION_PROPS } from "../../types/ai-training-notification";

const AiTrainingNotification = ({
  hasTrainingUrls,
  hasCompletedUrls,
  completedUrlCount,
  urlCount,
  contentCount,
  brandVoice,
}: AI_TRAINING_NOTIFICATION_PROPS) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 flex items-start flex-col sm:flex-row gap-4 sm:gap-3">
      <div className="flex items-start gap-3 flex-1">
        <div className="p-2 bg-purple-100 rounded-lg w-fit h-fit">
          <Bot className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-purple-900">
            Maximize AI Intelligence
          </h3>
          <p className="text-sm text-purple-700 mt-1">
            Complete AI training to get better response suggestions and more
            accurate instructions-based generation.
            {!hasTrainingUrls
              ? " Add training URLs from your website to get started."
              : !hasCompletedUrls
              ? " Your training URLs are being processed."
              : " Your AI is ready but could benefit from more training data."}
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs text-purple-600">
            <span>
              URLs: {completedUrlCount || 0}/{urlCount || 0}
            </span>
            <span>Content: {contentCount || 0} pages</span>
            <span>Voice: {brandVoice}</span>
          </div>
        </div>
      </div>
      <Link
        className="text-purple-700 border border-purple-300 bg-white hover:bg-purple-100 flex items-center justify-center gap-1 rounded-md px-3 py-2 font-medium text-sm w-full sm:w-fit"
        href="/ai-training"
      >
        <Bot className="h-3 w-3" />
        Complete Training
      </Link>
    </div>
  );
};

export default AiTrainingNotification;
