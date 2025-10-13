import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock } from "lucide-react";
import CompletedActionsTab from "./components/completed-actions-tab";
import PendingActionsTab from "./components/pending-actions-tab";
import PendingItemsWarningTip from "./components/pending-items-warning";

const ApprovalQueueTabs = () => {
  const pendingItems = [];
  const completedActions = [];
  return (
    <Tabs defaultValue="pending" className="w-full">
      {/* Tabs List */}
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="pending"
          className="flex items-center gap-2 hover:cursor-pointer"
        >
          <Clock className="h-4 w-4" />
          Pending Actions
          <Badge variant="secondary" className="ml-1">
            {pendingItems.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="flex items-center gap-2 hover:cursor-pointer"
        >
          <CheckCircle2 className="h-4 w-4" />
          Completed Actions
          <Badge variant="secondary" className="ml-1">
            {completedActions.length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      <TabsContent value="pending" className="flex flex-col gap-4 mt-4">
        {/* Pending Items Warning */}
        <PendingItemsWarningTip />
        {/* Filter Tabs */}
        <PendingActionsTab />
      </TabsContent>
      <TabsContent value="completed" className="flex flex-col gap-4 mt-4">
        <CompletedActionsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ApprovalQueueTabs;
