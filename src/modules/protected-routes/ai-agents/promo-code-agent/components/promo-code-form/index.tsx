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
        {/* Promo Code Activation Status */}
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
                      value="general_discount_inquiry"
                      data-testid="option-general-inquiry"
                    >
                      General Discount Inquiries
                    </SelectItem>
                    <SelectItem
                      value="refund_and_new_customer_offer"
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
                        value="fixed_amount"
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
                    Optional cap for percentage-based refunds. If set, it must
                    be greater than 0.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
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
                    Valid Until{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      data-testid="input-valid-until"
                      className="w-full justify-between py-2"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Leave empty if this promo doesn&apos;t have an end date
                  </FormDescription>
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
