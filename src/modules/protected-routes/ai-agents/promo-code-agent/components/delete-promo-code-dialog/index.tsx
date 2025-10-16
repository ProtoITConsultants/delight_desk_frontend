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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const DeletePromoCodeDialog = ({
  promo_code_id,
  promo_code,
}: {
  promo_code_id: string;
  promo_code: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          data-testid={`button-delete-${promo_code_id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-testid={`dialog-delete-${promo_code_id}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Promo Code Configuration</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the &quot;{promo_code}&quot;
            configuration? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            data-testid={`button-cancel-delete-${promo_code_id}`}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            // onClick={() => deleteMutation.mutate(promo_code_id)}
            data-testid={`button-confirm-delete-${promo_code_id}`}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePromoCodeDialog;
