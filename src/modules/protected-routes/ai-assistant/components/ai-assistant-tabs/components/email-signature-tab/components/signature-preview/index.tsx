"use client";
import { Eye, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSignatureBuilder } from "../../utils/context/signature-builder-context";

/**
 * Live preview frame styled to feel like an email — "Sent from" header
 * sits above the rendered signature so users immediately understand
 * where this block will appear in real messages.
 */
const SignaturePreview = () => {
  const { signatureHtml } = useSignatureBuilder();
  const hasSignature = signatureHtml.trim().length > 0;

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <header className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Live preview</h3>
      </header>

      <div className="bg-muted/20 p-4">
        <div className="rounded-md border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-dashed px-4 py-2 text-[11px] uppercase tracking-wide text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span>Sent from AI Assistant</span>
          </div>
          <div className="px-5 py-4">
            <p className="text-sm text-muted-foreground">
              <span className="block text-foreground">
                Thanks for getting in touch!
              </span>
              <span className="mt-1 block">
                Your message has been received and we&apos;ll be in touch
                shortly.
              </span>
            </p>
            <div className="my-4 border-t border-dashed" />
            {hasSignature ? (
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: signatureHtml }}
              />
            ) : (
              <p className="text-xs italic text-muted-foreground">
                Fill in the builder to preview your signature.
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SignaturePreview;
