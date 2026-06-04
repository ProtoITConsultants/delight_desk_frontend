"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RETURN_POLICY_FORM_SCHEMA } from "../../utils/schema";
import { RETURN_POLICY_CONFIG_TYPE } from "../../utils/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const ReturnPolicyConfigForm = () => {
  // React Hook Form with Zod validation
  const form = useForm<RETURN_POLICY_CONFIG_TYPE>({
    resolver: zodResolver(RETURN_POLICY_FORM_SCHEMA),
    defaultValues: {
      enableAutoApproval: false,
      autoApprovalDays: 1,
      enableAutoRefund: false,
      enableSmartFollowUp: false,
      maxFollowUpAttempts: 1,
      requirePhotosForDamagedItems: false,
      requireReasonForReturn: false,
      returnPolicyText: "",
      returnInstructions: "",
    },
  });

  // TODO: Implement Save Mutation
  const onSubmit = (data: RETURN_POLICY_CONFIG_TYPE) => {
    console.log("Return Policy Config Form Data:", data);
  };

  const saveMutation = {
    isPending: false,
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/* Simple Auto-Approval Section */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-4">
          <div className="flex items-center justify-between gap-1">
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold">Simple Auto-Approval</h3>
              <p className="text-sm text-muted-foreground">
                Automatically approve all returns within a specific time window
                (no questions asked)
              </p>
            </div>
            <FormField
              control={form.control}
              name="enableAutoApproval"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      data-testid="switch-enable-auto-approval"
                      className="mb-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {form.watch("enableAutoApproval") && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="autoApprovalDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-testid="label-auto-approval-days">
                      Auto-Approval Window (Days)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        max="365"
                        value={field.value || 30}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        data-testid="input-auto-approval-days"
                        className="bg-white"
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Orders purchased within this timeframe will be
                      automatically approved for returns
                    </p>
                    <FormMessage data-testid="error-auto-approval-days" />
                  </FormItem>
                )}
              />

              {/* Automatic Refund Toggle */}
              <div className="flex items-center justify-between gap-1 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">
                    Issue Instant Refunds
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Automatically process WooCommerce refunds when returns are
                    auto-approved
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="enableAutoRefund"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                          data-testid="switch-enable-auto-refund"
                          className="mb-0"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {/* Smart Follow-Up Section */}
        <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg space-y-4">
          <div className="flex items-center justify-between gap-1">
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold">
                Smart Follow-Up Conversations
              </h3>
              <p className="text-sm text-muted-foreground">
                Automatically ask customers for missing information (order
                numbers, photos, etc.) before processing returns
              </p>
            </div>
            <FormField
              control={form.control}
              name="enableSmartFollowUp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      data-testid="switch-enable-smart-follow-up"
                      className="mb-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {form.watch("enableSmartFollowUp") && (
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="maxFollowUpAttempts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-testid="label-max-follow-up-attempts">
                      Maximum Follow-Up Attempts
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        max="5"
                        value={field.value || 2}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        data-testid="input-max-follow-up-attempts"
                        className="bg-white"
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      How many times to ask for missing information before
                      escalating to manual review
                    </p>
                    <FormMessage data-testid="error-max-follow-up-attempts" />
                  </FormItem>
                )}
              />

              {/* Information Requirements */}
              <div className="flex flex-col gap-3">
                <h4 className="font-medium text-sm">
                  Information Requirements
                </h4>

                <div className="flex items-center justify-between gap-1 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">
                      Require Return Reason
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Ask customers to specify why they want to return the item
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="requireReasonForReturn"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            data-testid="switch-require-reason"
                            className="mb-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between gap-1 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">
                      Require Photos for Damaged Items
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Request photos when customers report damaged or defective
                      items
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="requirePhotosForDamagedItems"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            data-testid="switch-require-photos"
                            className="mb-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Return Policy Text */}
        <FormField
          control={form.control}
          name="returnPolicyText"
          render={({ field }) => (
            <FormItem>
              <FormLabel data-testid="label-return-policy">
                Return Policy (Natural Language)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Describe your return policy in natural language. For example: 'We accept returns within 30 days of purchase for unopened items. Custom orders and sale items are final. Customers must pay return shipping unless the item was defective.'"
                  className="min-h-[150px]"
                  data-testid="textarea-return-policy"
                />
              </FormControl>
              <FormMessage
                data-testid="error-return-policy"
                className="-mt-1"
              />
              <FormDescription>
                The AI will use this policy to evaluate return eligibility for
                complex cases
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Return Instructions */}
        <FormField
          control={form.control}
          name="returnInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel data-testid="label-return-instructions">
                Return Instructions
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Instructions for customers on how to return items. Include mailing address, packaging requirements, who pays shipping, etc."
                  className="min-h-[120px]"
                  data-testid="textarea-return-instructions"
                />
              </FormControl>
              <FormMessage
                data-testid="error-return-instructions"
                className="-mt-1"
              />
              <FormDescription>
                These instructions will be sent to customers when their return
                is approved
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            data-testid="button-save-config"
          >
            <Save className="w-4 h-4 mr-2" />
            {saveMutation.isPending ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReturnPolicyConfigForm;
