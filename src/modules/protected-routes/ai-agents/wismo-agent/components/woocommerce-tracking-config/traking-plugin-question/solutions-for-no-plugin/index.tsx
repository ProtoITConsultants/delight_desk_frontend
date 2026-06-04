import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { SOLUTIONS_FOR_NO_WOOCOMMERCE_PLUGIN } from "../../../../constants";
import SolutionItem from "./solution-item";

const SolutionsForNoPlugin = () => {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <XCircle className="h-4 w-4" />
        <AlertTitle>WISMO Agent Not Available Yet</AlertTitle>
        <AlertDescription>
          Without tracking numbers in WooCommerce, the WISMO agent cannot
          provide order tracking information to customers. But don&apos;t worry
          - there are easy solutions!
        </AlertDescription>
      </Alert>

      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">
            How to Add Tracking to WooCommerce
          </CardTitle>
          <CardDescription className="text-green-700">
            Choose the option that best fits your shipping workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {SOLUTIONS_FOR_NO_WOOCOMMERCE_PLUGIN.map((solution, index) => (
              <SolutionItem key={index} {...solution} />
            ))}
          </div>

          <p className="text-sm text-green-800 pt-2 border-t border-green-200">
            After setting up one of these options, come back here and click
            &quot;Yes&quot; to validate your setup.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolutionsForNoPlugin;
