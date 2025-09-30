"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, RefreshCw, Send } from "lucide-react";
import { CONTACT_US_FORM_SCHEMA } from "./schema";
import z from "zod";
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

type CONTACT_US_FORM_TYPE = z.infer<typeof CONTACT_US_FORM_SCHEMA>;

const ContactUsForm = () => {
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
    },
    onError: (error) => {
      toast.error("Failed to send message!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return (
    <Card className="mt-8" id="contact-form">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Mail className="h-5 w-5" />
          Still Need Help?
        </CardTitle>
        <CardDescription>
          Can&apos;t find what you&apos;re looking for? Send us a message and
          we&apos;ll get back to you within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              contactUsMutation.mutate(data)
            )}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Company
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your Company Name"
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Inquiry *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="min-h-[100px]"
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
              className="w-full"
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
      </CardContent>
    </Card>
  );
};

export default ContactUsForm;
