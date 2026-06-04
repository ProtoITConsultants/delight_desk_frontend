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
import type z from "zod";
import { HTML_BUILDER_FORM_SCHEMA } from "../../schema/html-builder";

type HtmlBuilderFormValues = z.input<typeof HTML_BUILDER_FORM_SCHEMA>;
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw, Save } from "lucide-react";
import React, { useMemo } from "react";
import { useSignatureBuilder } from "../../../../utils/context/signature-builder-context";
import { useUpdateEmailSignature } from "@/hooks/services/ai-assistant/use-update-email-signature";
import { useAiAssistant } from "@/providers/ai-assistant";

const HTMLSignatureBuilder = () => {
  const { setSignatureHtml } = useSignatureBuilder();
  const { emailSignature } = useAiAssistant();
  const { updateEmailSignature, isPending } = useUpdateEmailSignature();

  const initialValues = useMemo<HtmlBuilderFormValues>(
    () => ({
      htmlContent: emailSignature?.html?.htmlSignature || "",
    }),
    [emailSignature],
  );

  const form = useForm<HtmlBuilderFormValues>({
    resolver: zodResolver(HTML_BUILDER_FORM_SCHEMA),
    defaultValues: initialValues,
  });

  const htmlContent = form.watch("htmlContent");
  const isDirty = form.formState.isDirty;

  const onSubmit = () => {
    updateEmailSignature({
      type: "html",
      signature: {
        htmlSignature: htmlContent || "",
      },
    });
    form.reset({ htmlContent });
  };

  React.useEffect(() => {
    setSignatureHtml(htmlContent || "");
  }, [htmlContent, setSignatureHtml]);

  React.useEffect(() => {
    if (emailSignature?.html) {
      form.reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSignature]);

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="htmlContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Paste your existing HTML signature
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="<table>...</table> or any HTML signature code"
                  className="min-h-[220px] resize-y font-mono text-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-xs">
                Paste the complete HTML for your signature. Ideal for
                company-wide signature templates.
              </FormDescription>
            </FormItem>
          )}
          disabled={isPending}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground">
          <span>
            {isPending
              ? "Saving signature..."
              : isDirty
                ? "Unsaved changes"
                : "All changes saved"}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!isDirty || isPending}
              onClick={() => form.reset(initialValues)}
              className="h-8 gap-1 px-2 text-xs"
            >
              <RotateCcw className="h-3 w-3" />
              Discard
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!isDirty || isPending || !htmlContent}
              className="h-8 gap-1 px-3 text-xs"
            >
              {isPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Save className="h-3 w-3" />
              )}
              {isPending ? "Saving..." : "Save signature"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default HTMLSignatureBuilder;
