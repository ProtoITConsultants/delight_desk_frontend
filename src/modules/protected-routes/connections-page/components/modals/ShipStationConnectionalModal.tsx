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
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

// Shipstation Props Type
type shipStationProps = {
  showShipstationDialog: boolean;
  setShowShipstationDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

// Form Validation Schema
const formSchema = z.object({
  shipstationApiKey: z.string().min(1, {
    message: "API Key is required",
  }),
  shipstationApiSecret: z.string().min(1, {
    message: "API Secret is required",
  }),
});

const ShipStationConnectionalModal = ({
  showShipstationDialog,
  setShowShipstationDialog,
}: shipStationProps) => {
  // React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipstationApiKey: "",
      shipstationApiSecret: "",
    },
  });

  // TODO: Add Tanstack - Mutation here
  const onSubmit = () => {};

  return (
    <Dialog
      open={showShipstationDialog}
      onOpenChange={setShowShipstationDialog}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Shipstation</DialogTitle>
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
              <FormField
                control={form.control}
                name="shipstationApiSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      API Secret *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="shipstation-api-secret"
                        placeholder="Enter your Shipstation API Secret"
                        type="text"
                        className="h-10"
                        data-testid="input-shipstation-api-secret"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tooltip */}
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Where to find your API credentials
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Go to Shipstation Settings → API Settings → Generate New
                      API Key. You&apos;ll need both the API Key and API Secret.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowShipstationDialog(false);
                  // Reset the form
                  form.reset();
                }}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10"
                data-testid="button-connect-shipstation"
              >
                Connect Shipstation
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ShipStationConnectionalModal;
