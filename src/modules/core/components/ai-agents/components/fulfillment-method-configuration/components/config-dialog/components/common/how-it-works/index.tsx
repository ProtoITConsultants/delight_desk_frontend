import { Info } from "lucide-react";
import { HOW_FULFILLMENT_METHOD_WORKS_PROPS } from "../../../../../utils/types";

const HowFulfillmentMethodWorks = ({
  fulfillmentMethodTitle,
  howItWorksSteps,
}: HOW_FULFILLMENT_METHOD_WORKS_PROPS) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
        <Info className="h-4 w-4 mr-2" />
        How the {fulfillmentMethodTitle} Order Cancellation Workflow Works
      </h3>
      <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
        {howItWorksSteps.map((step, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
              {index + 1}
            </div>
            <div>
              <p className="font-medium">{step.heading}</p>
              <p className="text-blue-700 dark:text-blue-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowFulfillmentMethodWorks;
