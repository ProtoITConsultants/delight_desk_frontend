"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreatePromoCodeConfiguration } from "@/hooks/services/ai-agents/promo-code/use-create-promo-code-configuration";
import { useUpdatePromoCodeConfiguration } from "@/hooks/services/ai-agents/promo-code/use-update-promo-code-configuration";
import {
  formValuesToCreatePayload,
} from "@/modules/protected-routes/ai-agents/promo-code-agent/utils/mappers/promo-code-api-mappers";
import {
  PROMO_CODE_DIALOG_PROPS,
  PROMO_CODE_FORM_TYPE,
} from "../../utils/types/promo-code-dialog";
import PromoCodeForm from "../promo-code-form";

const PromoCodeDialoge = ({
  dialogType,
  editingConfigId,
  dialogeTitle,
  dialogDescription,
  isDialogOpen,
  onOpenChange,
}: PROMO_CODE_DIALOG_PROPS) => {
  const { isCreating, createConfiguration } = useCreatePromoCodeConfiguration();
  const { isUpdating, updateConfiguration } = useUpdatePromoCodeConfiguration();

  const isSaving = isCreating || isUpdating;

  const onSubmit = async (data: PROMO_CODE_FORM_TYPE) => {
    try {
      const payload = formValuesToCreatePayload(data);
      if (dialogType === "add-promo-code") {
        await createConfiguration(payload);
      } else {
        if (!editingConfigId) {
          return;
        }
        await updateConfiguration({ configId: editingConfigId, payload });
      }
      onOpenChange(false);
    } catch {
      // Errors are surfaced via mutation toasts
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      {/* Content */}
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{dialogeTitle}</DialogTitle>
          <DialogDescription data-testid="dialog-description">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        {/* Eligibility Rules Section */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Automation Eligibility:</strong> Promo codes with product
            restrictions or buy-one-get-one-free offers are not eligible for
            automation. Only simple percentage or fixed-amount discounts can be
            automated.
          </p>
        </div>
        {/* Promo Code Form */}
        <PromoCodeForm
          dialogType={dialogType}
          isSavingPromoCode={isSaving}
          onSubmit={onSubmit}
          onCancel={() => {
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PromoCodeDialoge;
