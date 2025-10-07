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
import { PROMO_CODE_FORM_PROPS } from "../../utils/types/promo-code-dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, Calendar, Settings, Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePromoCodeDialog } from "../../utils/context";

const PromoCodeForm = ({
  dialogType,
  onCancel,
  onSubmit,
  isSavingPromoCode,
}: PROMO_CODE_FORM_PROPS) => {
  const { form } = usePromoCodeDialog();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/* Enable Promo Code */}
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <FormLabel
                data-testid="label-is-active"
                className="flex-col items-start mb-0"
              >
                Active
                <div className="text-sm text-muted-foreground font-normal">
                  Enable this promo code configuration
                </div>
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                  data-testid="switch-is-active"
                  className="!mb-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Requires Moderation */}
        <FormField
          control={form.control}
          name="requires_moderation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <FormLabel
                data-testid="label-requires-approval"
                className="flex-col items-start mb-0"
              >
                Require Moderation
                <div className="text-sm text-muted-foreground font-normal">
                  Responses will appear in approval queue before sending
                </div>
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                  data-testid="switch-requires-approval"
                  className="!mb-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Basic Configuration */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-lg font-semibold flex items-center gap-2"
            data-testid="section-basic"
          >
            <Settings className="w-5 h-5" />
            Basic Configuration
          </h3>

          <FormField
            control={form.control}
            name="promo_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="label-promo-code">Promo Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="SAVE20"
                    data-testid="input-promo-code"
                  />
                </FormControl>
                <FormMessage data-testid="error-promo-code" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="label-description">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Internal description for this promo code..."
                    data-testid="textarea-description"
                    className="h-[100px] resize-none overflow-auto"
                  />
                </FormControl>
                <FormMessage data-testid="error-description" />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        {/* Usage Type Configuration */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-lg font-semibold flex items-center gap-2"
            data-testid="section-usage-type"
          >
            <Target className="w-5 h-5" />
            Usage Type
          </h3>

          <FormField
            control={form.control}
            name="usage_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="label-usage-type">
                  When to Offer This Promo Code
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      data-testid="select-usage-type"
                      className="!h-10 w-full"
                    >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="refund_only"
                      data-testid="option-refund-only"
                    >
                      Refund Only (Original behavior)
                    </SelectItem>
                    <SelectItem
                      value="first_time_customer_discount"
                      data-testid="option-first-time-customer"
                    >
                      First-Time Customer Discounts
                    </SelectItem>
                    <SelectItem
                      value="general_discount_inquiries"
                      data-testid="option-general-inquiry"
                    >
                      General Discount Inquiries
                    </SelectItem>
                    <SelectItem
                      value="both_refund_and_new_customer_offers"
                      data-testid="option-both"
                    >
                      Both Refunds and New Customer Offers
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-sm text-muted-foreground -mt-1">
                  Choose when this promo code should be automatically offered to
                  customers
                </FormDescription>
                <FormMessage data-testid="error-usage-type" />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        {/* Discount Configuration */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-lg font-semibold flex items-center gap-2"
            data-testid="section-discount"
          >
            <BadgeDollarSign className="w-5 h-5" />
            Discount Configuration
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="discount_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-discount-type">
                    Discount Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="!h-10 w-full"
                        data-testid="select-discount-type"
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="percentage"
                        data-testid="option-percentage"
                      >
                        Percentage
                      </SelectItem>
                      <SelectItem
                        value="fixed_cash"
                        data-testid="option-fixed-cash"
                      >
                        Fixed Amount
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage data-testid="error-discount-type" />
                </FormItem>
              )}
            />

            {form.watch("discount_type") === "percentage" ? (
              <FormField
                control={form.control}
                name="discount_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-testid="label-discount-percentage">
                      Percentage
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="20"
                        data-testid="input-discount-percentage"
                        max={100}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage data-testid="error-discount-percentage" />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="discount_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-testid="label-discount-amount">
                      Amount ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="1"
                        placeholder={"25.00"}
                        data-testid="input-discount-amount"
                      />
                    </FormControl>
                    <FormMessage data-testid="error-discount-amount" />
                  </FormItem>
                )}
              />
            )}
          </div>

          {form.watch("discount_type") === "percentage" && (
            <FormField
              control={form.control}
              name="max_refund_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-max-refund">
                    Maximum Refund Amount ($)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="number"
                      step="0.01"
                      placeholder="50.00"
                      data-testid="input-max-refund"
                    />
                  </FormControl>
                  <FormDescription>
                    Optional cap for percentage-based refunds
                  </FormDescription>
                  <FormMessage data-testid="error-max-refund" />
                </FormItem>
              )}
            />
          )}
        </div>
        <Separator />
        {/* Validity Window */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-lg font-semibold flex items-center gap-2"
            data-testid="section-validity"
          >
            <Calendar className="w-5 h-5" />
            Validity Window
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="valid_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-valid-from">
                    Valid From
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      data-testid="input-valid-from"
                      className="w-full py-2"
                    />
                  </FormControl>
                  <FormMessage data-testid="error-valid-from" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valid_until"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-valid-until">
                    Valid Until
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      data-testid="input-valid-until"
                      className="w-full justify-between py-2"
                    />
                  </FormControl>
                  <FormMessage data-testid="error-valid-until" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        {/* Eligibility Rules */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-lg font-semibold flex items-center gap-2"
            data-testid="section-eligibility"
          >
            <Target className="w-5 h-5" />
            Eligibility Rules
          </h3>
          <FormField
            control={form.control}
            name="min_order_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="label-min-order">
                  Minimum Order Value ($)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="number"
                    step="0.01"
                    placeholder="25.00"
                    data-testid="input-min-order"
                  />
                </FormControl>
                <FormDescription>
                  Optional minimum order requirement
                </FormDescription>
                <FormMessage data-testid="error-min-order" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applies_to_subscription"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <FormLabel
                  data-testid="label-applies-subscriptions"
                  className="flex-col items-start mb-0"
                >
                  Applies to Subscriptions
                  <div className="text-sm text-muted-foreground font-normal">
                    Allow refunds for subscription orders
                  </div>
                </FormLabel>
                <FormControl className="mb-0">
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    data-testid="switch-applies-subscriptions"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Condition Fields for custom offferings */}
          {(form.watch("usage_type") === "first_time_customer_discount" ||
            form.watch("usage_type") === "general_discount_inquiries" ||
            form.watch("usage_type") ===
              "both_refund_and_new_customer_offers") && (
            <>
              <Separator />
              {(form.watch("usage_type") === "first_time_customer_discount" ||
                form.watch("usage_type") ===
                  "both_refund_and_new_customer_offers") && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg space-y-4">
                  <FormField
                    control={form.control}
                    name="enable_first_time_customer_discounts"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel
                          data-testid="label-enable_first_time_customer_discounts"
                          className="flex-col items-start mb-0"
                        >
                          First-Time Customer Discounts
                          <div className="text-sm text-muted-foreground font-normal">
                            Automatically offer this discount to customers with
                            no previous orders
                          </div>
                        </FormLabel>
                        <FormControl className="mb-0">
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            data-testid="switch-enable_first_time_customer_discounts"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {form.watch("enable_first_time_customer_discounts") && (
                    <FormField
                      control={form.control}
                      name="first_time_customer_message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-first-time-message">
                            Custom Message for First-Time Customers
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              value={field.value || ""}
                              placeholder="Welcome! As a first-time customer, we'd love to offer you a special discount..."
                              className="h-[80px] overflow-auto bg-white resize-none"
                              data-testid="textarea-first-time-message"
                            />
                          </FormControl>
                          <div className="text-sm text-muted-foreground">
                            Custom welcome message when offering the discount to
                            first-time customers
                          </div>
                          <FormMessage data-testid="error-first-time-message" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
              {(form.watch("usage_type") === "general_discount_inquiries" ||
                form.watch("usage_type") ===
                  "both_refund_and_new_customer_offers") && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-4">
                  <FormField
                    control={form.control}
                    name="enable_general_inquiry_discounts"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel
                          data-testid="label-enable_general_inquiry_discounts"
                          className="flex-col items-start mb-0"
                        >
                          General Discount Inquiries
                          <div className="text-sm text-muted-foreground font-normal">
                            Offer this discount when customers ask about
                            available promotions
                          </div>
                        </FormLabel>
                        <FormControl className="mb-0">
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            data-testid="switch-enable_general_inquiry_discounts"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("enable_general_inquiry_discounts") && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="max_offer_per_customer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-max-offers">
                              Max Offers per Customer
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                min="1"
                                max="10"
                                value={field.value || 1}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                                data-testid="input-max-offers"
                                className="bg-white"
                              />
                            </FormControl>
                            <div className="text-sm text-muted-foreground">
                              Limit how many times a customer can receive this
                              offer
                            </div>
                            <FormMessage data-testid="error-max-offers" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="offer_frequency_days"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-frequency-days">
                              Frequency (Days)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                min="1"
                                max="365"
                                value={field.value || 90}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                                data-testid="input-frequency-days"
                                className="bg-white"
                              />
                            </FormControl>
                            <div className="text-sm text-muted-foreground">
                              Minimum days between offers to the same customer
                            </div>
                            <FormMessage data-testid="error-frequency-days" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSavingPromoCode}
            data-testid="button-save"
          >
            {isSavingPromoCode
              ? "Saving..."
              : dialogType === "edit-promo-code"
              ? "Update"
              : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PromoCodeForm;
