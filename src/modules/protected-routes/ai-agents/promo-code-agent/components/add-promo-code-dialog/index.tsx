"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  PROMO_CODE_DIALOG_PROPS,
  PROMO_CODE_FORM_TYPE,
} from "../../utils/types/promo-code-agent";
import PromoCodeForm from "../promo-code-form";

const PromoCodeDialoge = ({
  dialogType,
  dialogeTitle,
  dialogDescription,
}: PROMO_CODE_DIALOG_PROPS) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);

  const onSubmit = (data: PROMO_CODE_FORM_TYPE) => {
    if (dialogType === "add-promo-code") {
      console.log("Add Promo Code", data);
    } else {
      console.log("Edit Promo Code", data);
    }
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Promo Code
        </Button>
      </DialogTrigger>
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
          isSavingPromoCode={false}
          onSubmit={onSubmit}
          setIsDialogOpen={setIsCreateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PromoCodeDialoge;
