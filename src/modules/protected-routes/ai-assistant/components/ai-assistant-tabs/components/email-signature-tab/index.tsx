"use client";
import { Card } from "@/components/ui/card";
import EmailSignatureInfoCard from "./components/info-card";
import SignatureBuilderTabs from "./components/signature-builder-tabs";
import SignaturePreview from "./components/signature-preview";
import { SignatureBuilderProvider } from "./utils/context/signature-builder-context";
import { Signature } from "lucide-react";

const EmailSignatureTab = () => {
  return (
    <SignatureBuilderProvider>
      <div className="flex flex-col gap-4">
        <EmailSignatureInfoCard />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Builder column. Self-contained card; each builder's save bar
              lives inside this column. */}
          <Card className="overflow-hidden p-0 lg:col-span-3">
            <header className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
              <Signature className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Signature builder
              </h2>
            </header>
            <SignatureBuilderTabs />
          </Card>

          {/* Live preview column. Sticky so the user keeps the result in
              view while editing — matches the "build vs result" mental
              model designers expect. */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-4">
              <SignaturePreview />
            </div>
          </div>
        </div>
      </div>
    </SignatureBuilderProvider>
  );
};

export default EmailSignatureTab;
