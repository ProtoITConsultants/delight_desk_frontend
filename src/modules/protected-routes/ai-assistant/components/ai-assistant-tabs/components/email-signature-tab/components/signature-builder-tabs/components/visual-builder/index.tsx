"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { VISUAL_BUILDER_FORM_SCHEMA } from "../../schema/visual-builder";

type VisualBuilderFormValues = z.input<typeof VISUAL_BUILDER_FORM_SCHEMA>;
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Building,
  Captions,
  Globe,
  Loader2,
  Mail,
  Phone,
  RotateCcw,
  Save,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo } from "react";
import { useSignatureBuilder } from "../../../../utils/context/signature-builder-context";
import { generateSignaturePreview } from "../../../../utils/services/generateSignaturePreview";
import { useAiAssistant } from "@/providers/ai-assistant";
import { useUpdateEmailSignature } from "@/hooks/services/ai-assistant/use-update-email-signature";

const VisualSignatureBuilder = () => {
  const { setSignatureHtml } = useSignatureBuilder();
  const { emailSignature } = useAiAssistant();
  const { updateEmailSignature, isPending } = useUpdateEmailSignature();

  const initialValues = useMemo<VisualBuilderFormValues>(
    () => ({
      name: emailSignature?.structured.name || "",
      title: emailSignature?.structured.title || "",
      company: emailSignature?.structured.company || "",
      companyUrl: emailSignature?.structured.companyUrl || "",
      email: emailSignature?.structured.email || "",
      phone: emailSignature?.structured.phoneNumber || "",
    }),
    [emailSignature],
  );

  const form = useForm<VisualBuilderFormValues>({
    resolver: zodResolver(VISUAL_BUILDER_FORM_SCHEMA),
    defaultValues: initialValues,
  });

  const onSubmit = () => {
    const values = form.getValues();
    updateEmailSignature({
      type: "structured",
      signature: {
        name: values.name || "",
        title: values.title || "",
        company: values.company || "",
        companyUrl: values.companyUrl || "",
        email: values.email || "",
        phoneNumber: values.phone || "",
      },
    });
    // Reset the form's "dirty" baseline to the just-saved values so the
    // save bar relaxes immediately after a successful submit.
    form.reset(values);
  };

  const values = form.watch();
  const isDirty = form.formState.isDirty;

  useEffect(() => {
    setSignatureHtml(generateSignaturePreview(values));
  }, [values, setSignatureHtml]);

  useEffect(() => {
    if (emailSignature) {
      form.reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSignature]);

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2 text-xs")}>
                  <User className="h-3.5 w-3.5" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={isPending}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2 text-xs")}>
                  <Captions className="h-3.5 w-3.5" />
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Customer Success Manager"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={isPending}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2 text-xs")}>
                  <Building className="h-3.5 w-3.5" />
                  Company
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Acme Corporation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={isPending}
          />
          <FormField
            control={form.control}
            name="companyUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2 text-xs")}>
                  <Globe className="h-3.5 w-3.5" />
                  Company URL
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://acmecorp.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={isPending}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2 text-xs")}>
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="john@acmecorp.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={isPending}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2 text-xs")}>
                  <Phone className="h-3.5 w-3.5" />
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="+1 (555) 123-4567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={isPending}
          />
        </div>
        {/* Dirty-aware save bar. Mirrors the action density we use in the
            AI Assistant response composer so users learn the pattern once. */}
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
              disabled={!isDirty || isPending}
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

export default VisualSignatureBuilder;
