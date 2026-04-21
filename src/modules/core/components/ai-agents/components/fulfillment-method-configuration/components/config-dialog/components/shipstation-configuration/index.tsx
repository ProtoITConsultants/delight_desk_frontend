import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import z from "zod";
import {
  FulfillmentMethodSettings,
  FulfillmentMethodType,
  UpdateFulfillmentMethodSettingsParams,
} from "@/services/ai-agents/utils/fulfillment-method";

const SHIPSTATION_CONFIG_SCHEMA = z.object({
  shipstationApiKey: z.string().min(1, "ShipStation API key is required"),
});

type ShipStationConfigurationProps = {
  fulfillmentSettings: FulfillmentMethodSettings | undefined;
  isSavingSettings: boolean;
  onSuccessSave: () => void;
  onSaveFulfillmentSettings: (
    params: UpdateFulfillmentMethodSettingsParams,
    onSuccess?: () => void,
  ) => void;
};

const ShipStationConfiguration = ({
  fulfillmentSettings,
  isSavingSettings,
  onSaveFulfillmentSettings,
  onSuccessSave,
}: ShipStationConfigurationProps) => {
  const form = useForm({
    resolver: zodResolver(SHIPSTATION_CONFIG_SCHEMA),
    defaultValues: {
      shipstationApiKey: fulfillmentSettings?.shipstationApiKey ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      shipstationApiKey: fulfillmentSettings?.shipstationApiKey ?? "",
    });
  }, [form, fulfillmentSettings?.shipstationApiKey]);

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        ShipStation API Integration
      </h3>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit((values) => {
            onSaveFulfillmentSettings(
              {
                method: FulfillmentMethodType.SHIPSTATION,
                shipstationApiKey: values.shipstationApiKey,
              },
              onSuccessSave,
            );
          })}
        >
          <FormField
            control={form.control}
            name="shipstationApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("text-sm font-medium text-gray-700")}>
                  ShipStation API Key
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your ShipStation API key"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] -mt-1" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSavingSettings}>
            {isSavingSettings ? "Saving..." : "Save Configuration"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShipStationConfiguration;
