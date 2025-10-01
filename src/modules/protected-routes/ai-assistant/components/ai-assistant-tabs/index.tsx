import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutList, Signature } from "lucide-react";
import EmailSignatureTab from "./components/email-signature-tab";
import EscalationQueueTab from "./components/escalation-queue-tab";

const AiAssistantTabs = () => {
  return (
    <Tabs defaultValue="email-signature" className="space-y-6">
      <TabsList className="flex items-center flex-wrap w-full gap-2 p-1 h-10">
        <TabsTrigger
          value="escalation-queue"
          className="flex items-center gap-2 p-[6px_12px] cursor-pointer"
        >
          <LayoutList className="h-4 w-4" />
          Escalation Queue
        </TabsTrigger>
        <TabsTrigger
          value="email-signature"
          className="flex items-center gap-2 p-[6px_12px] cursor-pointer"
        >
          <Signature className="h-4 w-4" />
          Email Signature
        </TabsTrigger>
      </TabsList>
      <TabsContent value="escalation-queue">
        <EscalationQueueTab />
      </TabsContent>
      <TabsContent value="email-signature">
        <EmailSignatureTab />
      </TabsContent>
    </Tabs>
  );
};

export default AiAssistantTabs;
