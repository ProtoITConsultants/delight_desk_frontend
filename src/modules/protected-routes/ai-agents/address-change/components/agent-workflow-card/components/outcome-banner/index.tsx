import { AlertCircle, CheckCircle } from "lucide-react";
import { WORKFLOW_OUTCOME_BANNER_PROPS } from "../../../../utils/types/outcome-banner";

const AddressChangeWorkflowOutcomeBanner = (
  props: WORKFLOW_OUTCOME_BANNER_PROPS
) => {
  return props.addressChanged ? (
    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <div className="flex items-center space-x-3">
        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        <div>
          <div className="font-medium text-green-900 dark:text-green-100">
            Address Changed Successfully
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            Address updated successfully in our system. Your order will ship to
            the new address.
          </div>

          <div className="text-sm text-green-700 dark:text-green-300">
            New address: {props.newAddress}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        <div>
          <div className="font-medium text-orange-900 dark:text-orange-100">
            Address Change Not Possible
          </div>
          <div className="text-sm text-orange-700 dark:text-orange-300">
            {props.failingReason
              ? `Warehouse response: ${props.failingReason}`
              : "Order could not be cancelled due to fulfillment timing"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressChangeWorkflowOutcomeBanner;
