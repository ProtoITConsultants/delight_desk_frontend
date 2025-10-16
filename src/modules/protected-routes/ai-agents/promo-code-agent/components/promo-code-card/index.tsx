import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Edit2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { PROMO_CODE_TYPES } from "../../utils/types/promo-code-card";
import DeletePromoCodeDialog from "../delete-promo-code-dialog";
import { usePromoCodeDialog } from "../../utils/context";
import PromoCodeDialoge from "../add-promo-code-dialog";
import { useState } from "react";
import "./styles.css";
import { Label } from "@/components/ui/label";

const PromoCodeCard = ({
  id,
  promo_code,
  description,
  usage_type,
  valid_from,
  valid_until,
  is_active,
  usage_count,
  last_used,
  discount_type,
  max_refund_value,
  discount_amount,
  applies_to_subscription,
  min_order_value,
  enable_first_time_customer_discounts,
  first_time_customer_message,
  enable_general_inquiry_discounts,
  max_offer_per_customer,
  offer_frequency_days,
  discount_percentage,
}: PROMO_CODE_TYPES) => {
  const { form } = usePromoCodeDialog();
  const [isEditPromoCodeDialogOpen, setIsEditPromoCodeDialogOpen] =
    useState(false);
  // Function to get the status badge
  const getStatusBadge = () => {
    const now = new Date();
    const validFrom = new Date(valid_from);
    const validUntil = new Date(valid_until);

    if (!is_active) {
      return (
        <Badge variant="secondary" data-testid={`status-automated-${id}`}>
          Inactive
        </Badge>
      );
    }

    if (now < validFrom) {
      return (
        <Badge variant="outline" data-testid={`status-automated-${id}`}>
          Scheduled
        </Badge>
      );
    }

    if (now > validUntil) {
      return (
        <Badge variant="destructive" data-testid={`status-automated-${id}`}>
          Expired
        </Badge>
      );
    }

    if (is_active) {
      return (
        <Badge variant="default" data-testid={`status-automated-${id}`}>
          Active
        </Badge>
      );
    }

    return (
      <Badge variant="secondary" data-testid={`status-manual-${id}`}>
        Manual Only
      </Badge>
    );
  };

  // Function to format the discount display
  const formatDiscountDisplay = ({
    discountType,
  }: {
    discountType: string;
  }) => {
    if (discountType === "percentage") {
      return `${discount_percentage}%${
        max_refund_value ? ` (max $${max_refund_value})` : ""
      }`;
    }
    return `$${discount_amount}`;
  };

  const handleEditPromoCode = () => {
    form.reset({
      promo_code: promo_code,
      description: description || "",
      usage_type: usage_type,
      discount_type: discount_type,
      discount_percentage: discount_percentage,
      max_refund_value: max_refund_value,
      discount_amount: discount_amount,
      valid_from: valid_from,
      valid_until: valid_until,
      min_order_value: min_order_value || "",
      applies_to_subscription: applies_to_subscription || false,
      is_active: is_active || false,
      enable_first_time_customer_discounts:
        enable_first_time_customer_discounts || false,
      first_time_customer_message: first_time_customer_message || "",
      enable_general_inquiry_discounts:
        enable_general_inquiry_discounts || false,
      max_offer_per_customer: max_offer_per_customer || 1,
      offer_frequency_days: offer_frequency_days || 90,
    });

    setIsEditPromoCodeDialogOpen(true);
  };

  return (
    <Card data-testid={`config-card-${id}`}>
      <CardHeader className="flex justify-between items-start gap-2 header-container">
        <div className="header-title">
          <CardTitle
            className="flex items-center gap-2 text-2xl"
            data-testid={`config-title-${id}`}
          >
            {promo_code}
            {getStatusBadge()}
          </CardTitle>
          <CardDescription data-testid={`config-description-${id}`}>
            {description || "No description provided"}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 header-actions">
          <div className="flex items-center gap-2">
            <Switch
              id={`switch-activation-status-${id}`}
              checked={is_active || false}
              onCheckedChange={() => {
                console.log("Switch checked");
              }}
              data-testid={`switch-activation-status-${id}`}
            />
            <Label
              htmlFor={`switch-activation-status-${id}`}
              className="text-sm text-muted-foreground hover:cursor-pointer"
            >
              Active
            </Label>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditPromoCode()}
            data-testid={`button-edit-${id}`}
          >
            <Edit2 className="w-4 h-4" />
          </Button>

          {/* Edit Promo Code Dialog */}
          <PromoCodeDialoge
            dialogType="edit-promo-code"
            dialogeTitle="Create Promo Code Configuration"
            dialogDescription="Set up automatic refunds for customers who qualified for a promo code but didn't receive the discount on their order. Configure the discount amount, validity period, and eligibility requirements."
            isDialogOpen={isEditPromoCodeDialogOpen}
            onOpenChange={(value) => {
              setIsEditPromoCodeDialogOpen(value);
            }}
          />

          {/* Delete Promo Code Dialog */}
          <DeletePromoCodeDialog promo_code_id={id} promo_code={promo_code} />
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 w1440:grid-cols-4 gap-4 text-sm">
        <div data-testid={`config-discount-${id}`}>
          <div className="font-medium">Discount</div>
          <div className="text-muted-foreground">
            {formatDiscountDisplay({
              discountType: discount_type,
            })}
          </div>
        </div>

        <div data-testid={`config-validity-${id}`}>
          <div className="font-medium">Valid Until</div>
          <div className="text-muted-foreground">
            {formatDistanceToNow(new Date(valid_until), {
              addSuffix: true,
            })}
          </div>
        </div>

        <div data-testid={`config-usage-${id}`}>
          <div className="font-medium">Usage</div>
          <div className="text-muted-foreground">
            {usage_count || 0} times
            {last_used && (
              <div className="text-xs">
                Last:{" "}
                {formatDistanceToNow(new Date(last_used), {
                  addSuffix: true,
                })}
              </div>
            )}
          </div>
        </div>

        <div data-testid={`config-restrictions-${id}`}>
          <div className="font-medium">Restrictions</div>
          <div className="text-muted-foreground space-y-1">
            {min_order_value && (
              <Badge variant="outline" className="text-xs">
                Min ${min_order_value}
              </Badge>
            )}
            {!applies_to_subscription && (
              <Badge variant="outline" className="text-xs">
                No subscriptions
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoCodeCard;
