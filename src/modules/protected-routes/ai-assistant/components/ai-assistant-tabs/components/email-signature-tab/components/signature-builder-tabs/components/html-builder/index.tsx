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

const HTMLSignatureBuilder = () => {
  const { setSignatureHtml } = useSignatureBuilder();

  const form = useForm({
    resolver: zodResolver(HTML_BUILDER_FORM_SCHEMA),
    defaultValues: {
      htmlContent: "",
    },
  });

  // watch form changes
  const htmlContent = form.watch("htmlContent");

  const onSubmit = () => {};

  const saveUserSignature = {
    isPending: true,
  };

  // update preview whenever textarea changes
  React.useEffect(() => {
    setSignatureHtml(htmlContent || "");
  }, [htmlContent, setSignatureHtml]);

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
          disabled={saveUserSignature.isPending}
        />

        <Separator />

        <Button onClick={() => {}} className="w-full">
          Save Email Signature
        </Button>
      </form>
    </Form>
  );
};

export default HTMLSignatureBuilder;
