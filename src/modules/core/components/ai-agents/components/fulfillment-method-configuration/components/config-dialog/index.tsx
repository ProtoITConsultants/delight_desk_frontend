import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FULFILLMENT_METHOD_DIALOG_PROPS } from "../../utils/types";
import getFulfillmentMethodConfigDialogData from "./services/get-config-dialog-data";
import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import HowFulfillmentMethodWorks from "./components/common/how-it-works";
import FulFillmentMethodConfigFAQs from "./components/common/faqs-section";

const FulfillmentMethodConfigDialog = ({
  dialogType,
  isDialogOpen,
  onOpenChange,
}: FULFILLMENT_METHOD_DIALOG_PROPS) => {
  const { title, description, howItWorksSteps, faqs } =
    getFulfillmentMethodConfigDialogData(
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
        <div className="flex flex-col gap-6">
          {/* How it Works Section */}
          <HowFulfillmentMethodWorks
            howItWorksSteps={howItWorksSteps}
            fulfillmentMethodTitle={
              title.split(" ")[0] as FULLFILLMENT_METHODS_TYPES
            }
          />
          {/* Fulfillment Method Configuration */}

          {/* FAQ Section */}
          <FulFillmentMethodConfigFAQs faqs={faqs} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FulfillmentMethodConfigDialog;
