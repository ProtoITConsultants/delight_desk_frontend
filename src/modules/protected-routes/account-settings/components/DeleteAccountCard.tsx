import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteAccountCard = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  // TODO: implement delete account
  const handleDeleteAccount = () => {};
  return (
    <Card className="border-red-200 bg-red-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </CardTitle>
        <CardDescription className="text-red-600">
          Irreversible actions that will permanently affect your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-start gap-3">
            <Trash2 className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900 mb-1">
                Delete Account
              </h4>
              <p className="text-sm text-red-700 mb-3">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <ul className="text-xs text-red-600 mb-4 space-y-1">
                <li>
                  • All your profile and billing information will be removed
                </li>
                <li>
                  • Store connections and integrations will be disconnected
                </li>
                <li>• Email automation rules and history will be deleted</li>
                <li>• Any active subscriptions will be cancelled</li>
              </ul>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="space-y-2">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="h-5 w-5" />
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-3">
                      <span>
                        This action will permanently delete your Delight Desk
                        account and cannot be undone. All your data will be
                        permanently removed from our servers.
                      </span>
                      <div className="flex flex-col gap-2 bg-red-50 border border-red-200 rounded p-3">
                        <span className="font-medium text-red-900">
                          This will delete:
                        </span>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• Your profile and account settings</li>
                          <li>• All store connections and integrations</li>
                          <li>• Email automation rules and templates</li>
                          <li>• Order history and customer data</li>
                          <li>• Billing information and invoices</li>
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="delete-confirmation"
                          className="text-sm font-medium text-gray-700"
                        >
                          To confirm, type{" "}
                          <span className="font-mono bg-gray-100 px-1 rounded">
                            DELETE
                          </span>{" "}
                          in the box below:
                        </label>
                        <Input
                          id="delete-confirmation"
                          value={deleteConfirmation}
                          onChange={(e) =>
                            setDeleteConfirmation(e.target.value)
                          }
                          placeholder="Type DELETE to confirm"
                          className="font-mono"
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setDeleteConfirmation("")}
                      className="hover:cursor-pointer"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      //   disabled={
                      //     deleteConfirmation !== "DELETE" ||
                      //     deleteAccountMutation.isPending
                      //   }
                      className="bg-red-600 hover:bg-red-700 focus:ring-red-500 hover:cursor-pointer"
                    >
                      {/* {deleteAccountMutation.isPending
                        ? "Deleting..."
                        : "Delete Account Forever"} */}
                      Delete Account Forever
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteAccountCard;
