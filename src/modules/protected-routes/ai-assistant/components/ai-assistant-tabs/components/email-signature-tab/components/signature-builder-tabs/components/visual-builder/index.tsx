"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VISUAL_BUILDER_FORM_SCHEMA } from "../../schema/visual-builder";
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
import { Building, Captions, Globe, Mail, Phone, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useSignatureBuilder } from "../../../../utils/context/signature-builder-context";
import { generateSignaturePreview } from "../../../../utils/services/generateSignaturePreview";
import { useAiAssistant } from "@/providers/ai-assistant";
import { useUpdateEmailSignature } from "@/hooks/services/ai-assistant/use-update-email-signature";

const VisualSignatureBuilder = () => {
  const { setSignatureHtml } = useSignatureBuilder();
  const { emailSignature } = useAiAssistant();
  const { updateEmailSignature, isPending } = useUpdateEmailSignature();

  const form = useForm({
    resolver: zodResolver(VISUAL_BUILDER_FORM_SCHEMA),
    defaultValues: {
      name: "",
      title: "",
      company: "",
      companyUrl: "",
      email: "",
      phone: "",
    },
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
  };

  const values = form.watch();

  useEffect(() => {
    const preview = generateSignaturePreview(values);

    setSignatureHtml(preview);
  }, [values, setSignatureHtml]);

  useEffect(() => {
    if (emailSignature) {
      form.reset({
        name: emailSignature.structured.name || "",
        title: emailSignature.structured.title || "",
        company: emailSignature.structured.company || "",
        companyUrl: emailSignature.structured.companyUrl || "",
        email: emailSignature.structured.email || "",
        phone: emailSignature.structured.phoneNumber || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSignature]);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2")}>
                  <User className="h-4 w-4" />
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
                <FormLabel className={cn("flex items-center gap-2")}>
                  <Captions className="h-4 w-4" />
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
        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2")}>
                  <Building className="h-4 w-4" />
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
                <FormLabel className={cn("flex items-center gap-2")}>
                  <Globe className="h-4 w-4" />
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
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("flex items-center gap-2")}>
                  <Mail className="h-4 w-4" />
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
                <FormLabel className={cn("flex items-center gap-2")}>
                  <Phone className="h-4 w-4" />
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
        <Separator />
        {/* Profile Picture */}
        {/* <div className="space-y-4">
          <h4 className="font-medium">Profile Photo (Optional)</h4>
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Photo</FormLabel>
                <FormControl>
                  {!field.value ? (
                    <FileUploader
                      triggerClassName="w-full"
                      fileType="image"
                      dialogHeading="Upload Profile Photo"
                      dialogDescription="This will appear in your email signature"
                      onSaveSelectedFile={(file) => {
                        field.onChange(file);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        {isUploading === "photo"
                          ? "Uploading..."
                          : "Upload Profile Photo"}
                      </div>
                    </FileUploader>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          <Image
                            width={48}
                            height={48}
                            src={field.value}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Profile photo uploaded
                          </p>
                          <p className="text-xs text-muted-foreground">
                            This will appear in your email signature
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <FileUploader
                          triggerClassName="w-full"
                          fileType="image"
                          dialogHeading="Upload Profile Photo"
                          dialogDescription="This will appear in your email signature"
                          onSaveSelectedFile={(file) => {
                            field.onChange(file);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            {isUploading === "photo"
                              ? "Uploading..."
                              : "Upload Profile Photo"}
                          </div>
                        </FileUploader>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {}}
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove Photo
                        </Button>
                      </div>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Optional: Add a professional headshot. Your signature will
                  look great with or without a photo.
                </FormDescription>
              </FormItem>
            )}
            disabled={isPending}
          />
        </div> 
        <Separator />
        */}

        <Button disabled={isPending} className="w-full">
          Save Email Signature
        </Button>
      </form>
    </Form>
  );
};

export default VisualSignatureBuilder;
