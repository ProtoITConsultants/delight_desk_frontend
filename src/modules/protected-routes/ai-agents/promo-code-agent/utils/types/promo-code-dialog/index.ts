import z from "zod";
import { PROMO_CODE_FORM_SCHEMA } from "../../schema/promo-code-agent";

type PROMO_CODE_DIALOG_PROPS = {
  dialogType: "add-promo-code" | "edit-promo-code";
  dialogeTitle: string;
  dialogDescription: string;
  isDialogOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

type PROMO_CODE_FORM_TYPE = z.infer<typeof PROMO_CODE_FORM_SCHEMA>;

type PROMO_CODE_FORM_PROPS = Pick<PROMO_CODE_DIALOG_PROPS, "dialogType"> & {
  onSubmit: (data: PROMO_CODE_FORM_TYPE) => void;
  isSavingPromoCode: boolean;
  onCancel: () => void;
};

export type {
  PROMO_CODE_DIALOG_PROPS,
  PROMO_CODE_FORM_TYPE,
  PROMO_CODE_FORM_PROPS,
};
