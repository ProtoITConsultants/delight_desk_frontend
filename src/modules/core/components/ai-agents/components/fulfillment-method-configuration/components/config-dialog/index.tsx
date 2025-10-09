import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FULFILLMENT_METHOD_DIALOG_PROPS } from "../../utils/types";
import getDialogHeader from "./services/get-dialog-header";
import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";

const FulfillmentMethodConfigDialog = ({
  dialogType,
  isDialogOpen,
  onOpenChange,
}: FULFILLMENT_METHOD_DIALOG_PROPS) => {
  const { title, description } = getDialogHeader(
    dialogType as FULLFILLMENT_METHODS_TYPES
  );

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => {
        onOpenChange(value);
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {/* Body */}
      </DialogContent>
    </Dialog>
  );
};

export default FulfillmentMethodConfigDialog;
