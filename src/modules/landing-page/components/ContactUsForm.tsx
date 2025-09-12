"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

// Form Validation Schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  inquiry: z.string().min(10, {
    message: "Inquiry must be at least 10 characters.",
  }),
});

const ContactUsForm = () => {
  // React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      inquiry: "",
    },
  });

  // TODO: Add Tanstack - Mutation here
  const onSubmit = () => {};

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ds-surface-elevated rounded-2xl ds-card-padding">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white/80">
                      Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your Full Name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white/80">
                      Email *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white/80">
                    Company
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your Company Name"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inquiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white/80">
                    Inquiry *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none !overflow-auto"
                      placeholder="Tell us about your customer service challenges and how we can help..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              // disabled={isSubmitting} // TODO: Disable - With Mutation
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 hover:cursor-pointer"
            >
              {/* TODO: Add loading state - With Mutation */}
              {/* {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )} */}
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactUsForm;
