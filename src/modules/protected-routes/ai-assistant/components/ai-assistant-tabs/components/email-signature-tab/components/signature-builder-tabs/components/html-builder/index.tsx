"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HTML_BUILDER_FORM_SCHEMA } from "../../schema/html-builder";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSignatureBuilder } from "../../../../utils/context/signature-builder-context";
import { useUpdateEmailSignature } from "@/hooks/services/ai-assistant/use-update-email-signature";
import { useAiAssistant } from "@/providers/ai-assistant";

const HTMLSignatureBuilder = () => {
  const { setSignatureHtml } = useSignatureBuilder();
  const { emailSignature } = useAiAssistant();
  const { updateEmailSignature, isPending } = useUpdateEmailSignature();

  const form = useForm({
    resolver: zodResolver(HTML_BUILDER_FORM_SCHEMA),
    defaultValues: {
      htmlContent: "",
    },
  });

  // watch form changes
  const htmlContent = form.watch("htmlContent");

  const onSubmit = () => {
    updateEmailSignature({
      type: "html",
      signature: {
        htmlSignature: htmlContent || "",
      },
    });
  };

  // update preview whenever textarea changes
  React.useEffect(() => {
    setSignatureHtml(htmlContent || "");
  }, [htmlContent, setSignatureHtml]);

  React.useEffect(() => {
    if (emailSignature?.html) {
      form.setValue("htmlContent", emailSignature.html.htmlSignature || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSignature]);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="htmlContent"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Paste your existing HTML signature</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="<table>...</table> or any HTML signature code"
                  className="min-h-[200px] font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Paste the complete HTML code for your signature. This is perfect
                for company-wide signature templates.
              </FormDescription>
            </FormItem>
          )}
          disabled={isPending}
        />

        <Separator />

        <Button disabled={isPending || !htmlContent} className="w-full">
          Save Email Signature
        </Button>
      </form>
    </Form>
  );
};

export default HTMLSignatureBuilder;
