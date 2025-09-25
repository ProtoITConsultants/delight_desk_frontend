import { Globe, Bot, Settings, PlayCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AITrainingHeader from "@/modules/ai-training/sections/ai-training-header";
import AiIdentityTab from "@/modules/ai-training/sections/ai-identity";
import AiKnowledge from "@/modules/ai-training/sections/ai-knowledge";

const AiTraining = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <AITrainingHeader />
      {/* Main Navigation Tabs */}
      <Tabs defaultValue="ai-identity" className="space-y-6">
        <TabsList className="flex items-center flex-wrap w-full gap-2 p-1 h-10">
          <TabsTrigger
            value="ai-identity"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer h-8"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden md:inline">AI Identity</span>
            <span className="md:hidden">Identity</span>
          </TabsTrigger>
          <TabsTrigger
            value="ai-knowledge"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer h-8"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">AI Knowledge</span>
            <span className="md:hidden">Knowledge</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer h-8"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Voice & Settings</span>
            <span className="md:hidden">Settings</span>
          </TabsTrigger>
          <TabsTrigger
            value="playground"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer h-8"
          >
            <PlayCircle className="h-4 w-4" />
            <span className="hidden md:inline">AI Performance</span>
            <span className="md:hidden">Performance</span>
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        {/* AI Identity */}
        <TabsContent value="ai-identity">
          <AiIdentityTab />
        </TabsContent>
        {/* AI Knowledge */}
        <TabsContent value="ai-knowledge">
          <AiKnowledge />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiTraining;
