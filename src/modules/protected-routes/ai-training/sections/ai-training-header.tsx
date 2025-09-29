import { Brain } from "lucide-react";

const AITrainingHeader = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Brain className="h-7 w-7 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">AI Team Center</h1>
      </div>
      <p className="text-gray-600 text-lg">
        Build and invest in your AI agent. Like any new hire, you get out what
        you put in.
      </p>
    </div>
  );
};

export default AITrainingHeader;
