import { UseFormReturn } from "react-hook-form";
import { PROMO_CODE_FORM_TYPE } from "../promo-code-dialog";

type PROMO_CODE_CONTEXT_TYPE = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogType: "add-promo-code" | "edit-promo-code";
  setDialogType: React.Dispatch<
    React.SetStateAction<"add-promo-code" | "edit-promo-code">
  >;
  form: UseFormReturn<PROMO_CODE_FORM_TYPE>;
};

export type { PROMO_CODE_CONTEXT_TYPE };
