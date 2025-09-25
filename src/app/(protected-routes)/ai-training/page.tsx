import { Globe, Bot, Settings, PlayCircle, HelpCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AITrainingHeader from "@/modules/ai-training/sections/ai-training-header";
import AiIdentityTab from "@/modules/ai-training/sections/ai-identity";
import AiKnowledge from "@/modules/ai-training/sections/ai-knowledge";
import VoiceAndSettings from "@/modules/ai-training/sections/voice-and-settings";
import AiPerformance from "@/modules/ai-training/sections/ai-performance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            value="voice-and-setting"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer h-8"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Voice & Settings</span>
            <span className="md:hidden">Settings</span>
          </TabsTrigger>
          <TabsTrigger
            value="ai-performance"
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
        {/* Voice and Settings */}
        <TabsContent value="voice-and-setting">
          <VoiceAndSettings />
        </TabsContent>
        {/* AI Performance */}
        <TabsContent value="ai-performance" className="space-y-6">
          <AiPerformance />
          {/* Performance Tips */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 text-2xl">
                <HelpCircle className="h-5 w-5" />
                Performance Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-2">
                    💡 Test Common Questions
                  </h4>
                  <p className="text-gray-700">
                    Ask about your return policy, shipping, pricing, and product
                    details to see if your AI has learned these key topics.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-2">
                    🎯 Improve Responses
                  </h4>
                  <p className="text-gray-700">
                    If responses seem generic, add more specific content about
                    your products and policies to the AI Knowledge tab.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiTraining;
