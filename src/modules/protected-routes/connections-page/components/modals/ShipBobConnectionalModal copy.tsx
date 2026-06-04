import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateFulfillmentMethodSettings } from "@/hooks/services/ai-agents/use-update-fulfillment-method-settings";
import { FulfillmentMethodType } from "@/services/ai-agents/utils/fulfillment-method";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import z from "zod";

// Shipstation Props Type
type ShipBobConnectionModalProps = {
  showShipBobDialog: boolean;
  onCloseModal: () => void;
};

// Form Validation Schema
const formSchema = z.object({
  shipstationApiKey: z.string().min(1, {
    message: "API Key is required",
  }),
});

const ShipBobConnectionalModal = ({
  showShipBobDialog,
  onCloseModal,
}: ShipBobConnectionModalProps) => {
  // React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipstationApiKey: "",
    },
  });

  const { updateFulfillmentMethod, isUpdatingFulfillmentMethod } =
    useUpdateFulfillmentMethodSettings();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFulfillmentMethod({
      params: {
        method: FulfillmentMethodType.SHIPSTATION,
        shipstationApiKey: values.shipstationApiKey,
      },
      onSuccessCallback: () => {
        onCloseModal();
        form.reset();
      },
    });
  };

  return (
    <Dialog open={showShipBobDialog} onOpenChange={onCloseModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect ShipBob</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="shipstationApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      API Key *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="shipstation-api-key"
                        placeholder="Enter your Shipstation API Key"
                        type="text"
                        className="h-10"
                        data-testid="input-shipstation-api-key"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  onCloseModal();
                  // Reset the form
                  form.reset();
                }}
                disabled={isUpdatingFulfillmentMethod}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10"
                data-testid="button-connect-shipbob"
                disabled={isUpdatingFulfillmentMethod}
              >
                {isUpdatingFulfillmentMethod
                  ? "Connecting..."
                  : "Connect ShipBob"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ShipBobConnectionalModal;
