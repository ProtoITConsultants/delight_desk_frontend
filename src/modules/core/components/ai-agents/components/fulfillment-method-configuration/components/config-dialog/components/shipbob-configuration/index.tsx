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

const SHIPBOB_CONFIG_SCHEMA = z.object({
  shipbobPersonalAccessToken: z
    .string()
    .min(1, "ShipBob personal access token is required"),
});

type ShipbobConfigurationProps = {
  fulfillmentSettings: FulfillmentMethodSettings | undefined;
  isSavingSettings: boolean;
  onSuccessSave: () => void;
  onSaveFulfillmentSettings: (
    params: UpdateFulfillmentMethodSettingsParams,
    onSuccess?: () => void,
  ) => void;
};

const ShipbobConfiguration = ({
  fulfillmentSettings,
  isSavingSettings,
  onSaveFulfillmentSettings,
  onSuccessSave,
}: ShipbobConfigurationProps) => {
  const form = useForm({
    resolver: zodResolver(SHIPBOB_CONFIG_SCHEMA),
    defaultValues: {
      shipbobPersonalAccessToken:
        fulfillmentSettings?.shipbobPersonalAccessToken ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      shipbobPersonalAccessToken:
        fulfillmentSettings?.shipbobPersonalAccessToken ?? "",
    });
  }, [form, fulfillmentSettings?.shipbobPersonalAccessToken]);

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        ShipBob API Integration
      </h3>

      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit((values) => {
            onSaveFulfillmentSettings(
              {
                method: FulfillmentMethodType.SHIPBOB,
                shipbobPersonalAccessToken: values.shipbobPersonalAccessToken,
              },
              onSuccessSave,
            );
          })}
        >
          <FormField
            control={form.control}
            name="shipbobPersonalAccessToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("text-sm font-medium text-gray-700")}>
                  ShipBob Personal Access Token
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your ShipBob token"
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

export default ShipbobConfiguration;
