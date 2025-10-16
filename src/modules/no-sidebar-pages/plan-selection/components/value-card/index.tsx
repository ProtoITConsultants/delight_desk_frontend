import { cn } from "@/lib/utils";
import { PLAN_VALUE_CARD_PROPS } from "../../types/value-card";

const PlanValueCard = ({
  Icon,
  heading,
  subheading,
  iconClasses,
  iconBackgroundClasses,
}: PLAN_VALUE_CARD_PROPS) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
      <div
        className={cn(
          "h-12 w-12 rounded-lg flex items-center justify-center mx-auto mb-4",
          iconBackgroundClasses
        )}
      >
        <Icon className={cn("h-6 w-6", iconClasses)} />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 text-center">
        {heading}
      </h3>
      <p className="text-gray-600 text-sm text-center">{subheading}</p>
    </div>
  );
};

export default PlanValueCard;
