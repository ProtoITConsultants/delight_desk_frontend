"use client";
import { Bot, Check, Loader2 } from "lucide-react";
import AiTrainingTab from "../components/ai-training-tab";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AI_IDENTITY_FORM } from "../constants";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useAiTeamCenter } from "@/providers/ai-team-center";

// AI Identity Form Validation Schema
const aiIdentityFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  // Business Type Should have Value
  businessType: z.string().min(1, {
    message: "Business Type is required.",
  }),
  agentTitle: z.string().min(1, {
    message: "Agent Title is required.",
  }),
  emailSalutation: z.string().min(1, {
    message: "Email Salutation is required.",
  }),
  companyName: z.string().min(1, {
    message: "Company Name is required.",
  }),
  signatureFooter: z.string().optional(),
  customSalutation: z.string().optional(),
});

const AiIdentity = () => {
  const {
    aiIdentity: aiIdentityData,
    updateAiIdentity,
    isLoading,
  } = useAiTeamCenter();

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(aiIdentityFormSchema),
    defaultValues: {
      name: "",
      agentTitle: "AI Customer Service Agent",
      emailSalutation: "At your service",
      companyName: "",
      signatureFooter: "",
    },
  });

  const formValues = form.watch();

  const formRef = useRef(form);
  const didFocusAgentNameRef = useRef(false);

  useEffect(() => {
    if (aiIdentityData) {
      formRef.current.reset({
        name: aiIdentityData.aiAgentName || "[Agent Name]",
        businessType: aiIdentityData.businessType || "[Business Type]",
        agentTitle: aiIdentityData.aiAgentTitle || "",
        emailSalutation: aiIdentityData.emailSalutation || "[Email Salutation]",
        companyName:
          aiIdentityData.companyNameForEmailSignature || "[Your Company]",
        signatureFooter: aiIdentityData.signatureFooter || "[Signature Footer]",
        customSalutation: "",
      });
    }
  }, [aiIdentityData]);

  useEffect(() => {
    if (isLoading || didFocusAgentNameRef.current) return;

    const tid = window.setTimeout(() => {
      const el = document.getElementById(
        "agent-name",
      ) as HTMLInputElement | null;
      if (!el?.isConnected || el.disabled) return;

      el.focus({ preventScroll: true });
      didFocusAgentNameRef.current = true;
    }, 0);

    return () => window.clearTimeout(tid);
  }, [isLoading, aiIdentityData]);

  const onSubmit = () => {
    updateAiIdentity({
      aiAgentName: form.getValues("name"),
      // businessType: form.getValues("businessType"),
      aiAgentTitle: form.getValues("agentTitle"),
      emailSalutation: form.getValues("emailSalutation"),
      companyNameForEmailSignature: form.getValues("companyName"),
      signatureFooter: form.getValues("signatureFooter") || "",
    });
  };

  return (
    <AiTrainingTab.Root>
      <AiTrainingTab.Header
        heading="AI Identity"
        icon={<Bot className="h-5 w-5" />}
        description=" Give your AI agent a professional identity for customer service interactions. This name will be used for all AI agents regardless of their function."
      />
      <AiTrainingTab.Body>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Identity Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* AI Agent Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      AI Agent Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="agent-name"
                        type="text"
                        placeholder="Enter a professional name for your AI agent"
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="-mt-1 text-xs" />
                  </FormItem>
                )}
                disabled={isLoading}
              />
              {/* <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Business Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          data-testid="select-business-vertical"
                          className="!h-10 w-full shadow-none"
                        >
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {AI_IDENTITY_FORM.BUSINESS_TYPES.map((type) => (
                            <SelectItem value={type.value} key={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="-mt-1 text-xs" />
                    <FormDescription className="text-xs text-gray-500">
                      Choose your business type to help the AI provide
                      industry-appropriate responses
                    </FormDescription>
                  </FormItem>
                )}
                disabled={isLoading}
              /> */}
              {/* Agent Title */}
              <FormField
                control={form.control}
                name="agentTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      AI Agent Title
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          data-testid="select-agent-title"
                          className="!h-10 w-full shadow-none"
                        >
                          <SelectValue placeholder="Choose agent title" />
                        </SelectTrigger>
                        <SelectContent>
                          {AI_IDENTITY_FORM.AGENT_TITLES.map((title) => (
                            <SelectItem value={title} key={title}>
                              {title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="-mt-1 text-xs" />
                    <FormDescription className="text-xs text-gray-500">
                      This title appears in your AI agent&apos;s email signature
                      to establish professional identity.
                    </FormDescription>
                  </FormItem>
                )}
                disabled={isLoading}
              />
              {/* Email Salutation (Greeting) */}
              <FormField
                control={form.control}
                name="emailSalutation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Email Salutation
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          data-testid="select-salutation"
                          className="!h-10 w-full shadow-none"
                        >
                          <SelectValue placeholder="Choose salutation" />
                        </SelectTrigger>
                        <SelectContent>
                          {AI_IDENTITY_FORM.EMAIL_SALUTATIONS.map(
                            (salutation) => (
                              <SelectItem value={salutation} key={salutation}>
                                {salutation}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="-mt-1 text-xs" />
                    <FormDescription className="text-xs text-gray-500">
                      Choose from research-backed professional closings or
                      create your own custom ending.
                    </FormDescription>
                  </FormItem>
                )}
                disabled={isLoading}
              />
              {/* Signature Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Company Name for Email Signature
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="signature-company"
                        type="text"
                        placeholder="Enter company name for AI email signatures"
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="-mt-1 text-xs" />
                    <FormDescription className="text-xs text-gray-500">
                      This company name will appear in your AI agent&apos;s
                      email signature. Leave blank to use your account&apos;s
                      default company name.
                    </FormDescription>
                  </FormItem>
                )}
                disabled={isLoading}
              />
              {/* Signature Footer */}
              <FormField
                control={form.control}
                name="signatureFooter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Signature Footer
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="signature-footer"
                        type="text"
                        placeholder="Enter company name for AI email signatures"
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="-mt-1 text-xs" />
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-xs text-green-800">
                        <strong>Recommended:</strong> &quot;We use AI to solve
                        customer problems faster. Reply &apos;Human&apos; for
                        immediate escalation.&quot; — This promotes transparency
                        while providing a clear escalation path for customers
                        who prefer human support.
                      </p>
                    </div>
                  </FormItem>
                )}
                disabled={isLoading}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </Form>
          {/* Name Generator */}
          <AiTrainingTab.NameGenerator
            aiAgentName={formValues.name}
            setAiAgentName={(value) => form.setValue("name", value)}
          />
        </div>
        {/* Signature Preview */}
        <AiTrainingTab.SignaturePreview
          aiAgentName={formValues.name}
          salutation={formValues.emailSalutation}
          customSalutation={formValues.customSalutation}
          aiAgentTitle={formValues.agentTitle}
          signatureCompanyName={formValues.companyName}
          signatureFooter={formValues.signatureFooter}
        />
      </AiTrainingTab.Body>
    </AiTrainingTab.Root>
  );
};

export default AiIdentity;
