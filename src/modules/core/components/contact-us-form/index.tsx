"use client";
import { RefreshCw, Send } from "lucide-react";
import { CONTACT_US_FORM_SCHEMA } from "@/modules/core/utils/contact-us-form/schema";
import LandingPageAPIs from "@/modules/landing-page/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_US_FORM_PROPS,
  CONTACT_US_FORM_TYPE,
} from "@/modules/core/utils/contact-us-form/types";
import { cn } from "@/lib/utils";

const ContactUsForm = ({
  submitButtonClassName,
  formType,
}: CONTACT_US_FORM_PROPS) => {
  const form = useForm({
    resolver: zodResolver(CONTACT_US_FORM_SCHEMA),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      inquiry: "",
    },
  });

  const contactUsMutation = useMutation({
    mutationFn: (data: CONTACT_US_FORM_TYPE) =>
      LandingPageAPIs.contactUsForm(data),
    onSuccess: () => {
      form.reset();
      toast.success("Message sent successfully!");
    },
    onError: (error) => {
      toast.error("Failed to send message!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => contactUsMutation.mutate(data))}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    "text-sm font-medium",
                    formType === "landing-page"
                      ? "text-white/80"
                      : "text-gray-700"
                  )}
                >
                  Name *
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className={cn(
                      formType === "landing-page" &&
                        "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    )}
                    placeholder="Your Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={contactUsMutation.isPending}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    "text-sm font-medium",
                    formType === "landing-page"
                      ? "text-white/80"
                      : "text-gray-700"
                  )}
                >
                  Email *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className={cn(
                      formType === "landing-page" &&
                        "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    )}
                    placeholder="your@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={contactUsMutation.isPending}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  "text-sm font-medium",
                  formType === "landing-page"
                    ? "text-white/80"
                    : "text-gray-700"
                )}
              >
                Company
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Company Name"
                  className={cn(
                    formType === "landing-page" &&
                      "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={contactUsMutation.isPending}
        />
        <FormField
          control={form.control}
          name="inquiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  "text-sm font-medium",
                  formType === "landing-page"
                    ? "text-white/80"
                    : "text-gray-700"
                )}
              >
                Inquiry *
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className={cn(
                    "min-h-[100px]",
                    formType === "landing-page" &&
                      "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  )}
                  placeholder="Please describe your issue or question in detail..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={contactUsMutation.isPending}
        />

        <Button
          type="submit"
          className={cn("w-full", submitButtonClassName)}
          disabled={contactUsMutation.isPending}
        >
          {contactUsMutation.isPending ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactUsForm;
