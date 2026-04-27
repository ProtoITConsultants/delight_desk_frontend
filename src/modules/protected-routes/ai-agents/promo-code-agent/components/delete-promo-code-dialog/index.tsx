import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeletePromoCodeConfiguration } from "@/hooks/services/ai-agents/promo-code/use-delete-promo-code-configuration";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const DeletePromoCodeDialog = ({
  configId,
  promo_code,
}: {
  configId: string;
  promo_code: string;
}) => {
  const { deleteConfiguration, isDeleting } = useDeletePromoCodeConfiguration();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          data-testid={`button-delete-${configId}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-testid={`dialog-delete-${configId}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Promo Code Configuration</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the &quot;{promo_code}&quot;
            configuration? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            data-testid={`button-cancel-delete-${configId}`}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={() => void deleteConfiguration(configId)}
            data-testid={`button-confirm-delete-${configId}`}
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePromoCodeDialog;
