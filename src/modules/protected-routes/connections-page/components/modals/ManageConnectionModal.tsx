import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Info,
  Mail,
  Package,
  Store,
  Truck,
  Unlink,
} from "lucide-react";

type ManageConnectionModalProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
  type: "wooCommerce" | "gmail" | "outlook" | "shipbob" | "shipstation";
  status: "active" | "inactive";
  // WooCommerce Specific
  storeURL?: string;
  // Email Specific
  email?: string;
  onDisconnectAccount: () => void;
  isDisconnecting: boolean;
};

const connectionIcons: Record<
  ManageConnectionModalProps["type"],
  React.ComponentType<{ className?: string }>
> = {
  wooCommerce: Store,
  gmail: Mail,
  outlook: Mail,
  shipbob: Package,
  shipstation: Truck,
};

const ManageConnectionModal = ({
  isModalOpen,
  onCloseModal,
  type,
  storeURL,
  status,
  email,
  onDisconnectAccount,
  isDisconnecting,
}: ManageConnectionModalProps) => {
  const Icon = connectionIcons[type];

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onCloseModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 capitalize">
            {Icon && <Icon className="w-5 h-5" />}
            {type} Connection
          </DialogTitle>
        </DialogHeader>
        {/* Connection Body */}
        <div className="space-y-4">
          {/* Connection Body */}
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <Info className="w-4 h-4" />
              Connection Details
            </div>
            {/* Connection Details */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
              {/* Status */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Status:
                </span>
                <Badge
                  className={cn(
                    "rounded-full",
                    status === "active"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  )}
                >
                  <CheckCircle className="w-3 h-3" />
                  {status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
              {/* Connection Type - WooCommerce */}
              {type === "wooCommerce" && (
                <div className="flex justify-between gapp-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Store URL:
                  </span>
                  <span className="font-medium break-all">{storeURL}</span>
                </div>
              )}
              {/* Gmail and Outlook - Email and Last Sync */}
              {["gmail", "outlook"].includes(type) && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Email:
                  </span>
                  <span className="font-medium">{email}</span>
                </div>
              )}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              variant="destructive"
              className="w-full justify-center items-center"
              onClick={onDisconnectAccount}
              disabled={isDisconnecting}
            >
              <Unlink className="w-4 h-4 mr-2" />
              {isDisconnecting ? "Disconnecting..." : "Disconnect Account"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageConnectionModal;
