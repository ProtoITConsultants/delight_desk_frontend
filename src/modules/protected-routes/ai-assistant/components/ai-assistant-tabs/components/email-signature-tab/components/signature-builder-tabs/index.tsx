"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Code, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import VisualSignatureBuilder from "./components/visual-builder";
import HTMLSignatureBuilder from "./components/html-builder";

type Mode = "visual-builder" | "html-builder";

const SignatureBuilderTabs = () => {
  const [mode, setMode] = useState<Mode>("visual-builder");

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div
        role="tablist"
        aria-label="Signature builder mode"
        className="inline-flex w-fit rounded-md border bg-muted/40 p-0.5"
      >
        <SegmentButton
          isActive={mode === "visual-builder"}
          onClick={() => setMode("visual-builder")}
          icon={<User className="h-3.5 w-3.5" />}
          label="Visual builder"
        />
        <SegmentButton
          isActive={mode === "html-builder"}
          onClick={() => setMode("html-builder")}
          icon={<Code className="h-3.5 w-3.5" />}
          label="HTML"
        />
      </div>

      <Tabs value={mode}>
        <TabsContent value="visual-builder" className="mt-0">
          <VisualSignatureBuilder />
        </TabsContent>
        <TabsContent value="html-builder" className="mt-0">
          <HTMLSignatureBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignatureBuilderTabs;

type SegmentButtonProps = {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
};

const SegmentButton = ({
  isActive,
  onClick,
  icon,
  label,
}: SegmentButtonProps) => (
  <button
    type="button"
    role="tab"
    aria-selected={isActive}
    onClick={onClick}
    className={cn(
      "inline-flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
      isActive
        ? "bg-background text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground",
    )}
  >
    {icon}
    {label}
  </button>
);
