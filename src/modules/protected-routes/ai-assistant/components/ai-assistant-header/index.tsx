import { Card, CardContent } from "@/components/ui/card";
import { useAiAssistant } from "@/providers/ai-assistant";
import { ArrowUp, Clock } from "lucide-react";

const AiAssistantHeader = () => {
  const { escalationStats } = useAiAssistant();

  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-600">
          Resolve complex cases with AI-powered assistance
        </p>
      </div>

      <div className="grid grid-cols-2 lg:flex gap-4">
        <Card className="flex-shrink-0 p-0 min-w-[156.79px]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-xl font-bold text-gray-900">
                  {escalationStats?.byStatus.pending || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-shrink-0 p-0 min-w-[156.79px]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <ArrowUp className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  High Priority
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {escalationStats?.byPriority.high || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AiAssistantHeader;
