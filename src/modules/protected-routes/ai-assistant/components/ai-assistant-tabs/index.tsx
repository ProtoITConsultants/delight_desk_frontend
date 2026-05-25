"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutList, Signature } from "lucide-react";
import EmailSignatureTab from "./components/email-signature-tab";
import EscalationQueueTab from "./components/escalation-queue-tab";

/**
 * Top-level switch between the operational queue and the signature settings.
 *
 * The triggers sit in a width-`fit` segmented control aligned to the left
 * so the operational view visually dominates — Email Signature is a
 * less-frequent settings surface and shouldn't take up half the page width
 * the way a 50/50 split tab strip implies.
 */
const AiAssistantTabs = () => {
  return (
    <Tabs defaultValue="escalation-queue" className="space-y-4">
      <TabsList className="inline-flex h-9 w-fit items-center gap-1 rounded-md bg-muted p-1">
        <TabsTrigger
          value="escalation-queue"
          className="inline-flex h-7 items-center gap-1.5 rounded-sm px-3 text-xs font-medium cursor-pointer data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <LayoutList className="h-3.5 w-3.5" />
          <span className="sm:hidden">Queue</span>
          <span className="hidden sm:inline">Escalation Queue</span>
        </TabsTrigger>
        <TabsTrigger
          value="email-signature"
          className="inline-flex h-7 items-center gap-1.5 rounded-sm px-3 text-xs font-medium cursor-pointer data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Signature className="h-3.5 w-3.5" />
          <span className="sm:hidden">Signature</span>
          <span className="hidden sm:inline">Email Signature</span>
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
