import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Code, User } from "lucide-react";
import VisualSignatureBuilder from "./components/visual-builder";
import HTMLSignatureBuilder from "./components/html-builder";

const SignatureBuilderTabs = () => {
  return (
    <Tabs defaultValue="visual-builder">
      <TabsList className="grid w-fit grid-cols-2 h-fit">
        <TabsTrigger
          value="visual-builder"
          className="flex items-center gap-2 w-fit px-4 py-2 hover:cursor-pointer"
        >
          <User className="h-4 w-4" />
          Visual Builder
        </TabsTrigger>
        <TabsTrigger
          value="html-builder"
          className="flex items-center gap-2 w-fit px-4 py-2 hover:cursor-pointer"
        >
          <Code className="h-4 w-4" />
          HTML Signature
        </TabsTrigger>
      </TabsList>
      <TabsContent value="visual-builder" className="pt-3">
        <VisualSignatureBuilder />
      </TabsContent>
      <TabsContent value="html-builder" className="pt-3">
        <HTMLSignatureBuilder />
      </TabsContent>
    </Tabs>
  );
};

export default SignatureBuilderTabs;
