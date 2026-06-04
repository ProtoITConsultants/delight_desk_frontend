"use client";
import { PlayCircle } from "lucide-react";
import AiTrainingTab from "../components/ai-training-tab";

const AiPerformance = () => {
  return (
    <AiTrainingTab.Root>
      <AiTrainingTab.Header
        heading="AI Response Playground"
        icon={<PlayCircle className="h-5 w-5 text-purple-600" />}
        description="Test your trained AI by asking questions and see how it responds using your brand voice and training content."
        isComingSoon
      />
      <AiTrainingTab.Body>
        <AiTrainingTab.AiPerformanceTestForm />
      </AiTrainingTab.Body>
    </AiTrainingTab.Root>
  );
};

export default AiPerformance;
