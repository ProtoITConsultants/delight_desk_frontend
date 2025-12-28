import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FC } from "react";
import { WoocommerceTrackingProps } from "../../../types";
import SolutionsForNoPlugin from "./solutions-for-no-plugin";

const WoocommerceTrackingPluginQuestion: FC<WoocommerceTrackingProps> = ({
  hasTrackingPlugin,
  setHasTrackingPlugin,
}) => {
  return (
    <>
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Do you have a tracking plugin pushing tracking numbers to WooCommerce?
        </Label>
        <RadioGroup
          value={hasTrackingPlugin === true ? "yes" : "no"}
          onValueChange={(value) =>
            setHasTrackingPlugin(value === "yes" ? true : false)
          }
          className="flex gap-6"
          data-testid="radio-group-has-tracking"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="tracking-yes"
              data-testid="radio-tracking-yes"
            />
            <Label
              htmlFor="tracking-yes"
              className="font-medium cursor-pointer"
            >
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="tracking-no"
              data-testid="radio-tracking-no"
            />
            <Label htmlFor="tracking-no" className="font-medium cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* No Plugin - Show Solutions */}
      {hasTrackingPlugin === false && <SolutionsForNoPlugin />}
    </>
  );
};

export default WoocommerceTrackingPluginQuestion;
