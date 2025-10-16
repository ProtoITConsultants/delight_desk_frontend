import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useEscalationEmails } from "../../../escalation-emails-list/utils/context/escalation-emails-filters";
import { Badge } from "@/components/ui/badge";
import getEmailStatusColor from "../../../escalation-emails-list/components/emails-list/utils/email-card/get-email-status-color";
import getEmailPriorityIcon from "../../../escalation-emails-list/components/emails-list/utils/email-card/get-email-priority-icon";
import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink, History, Package } from "lucide-react";
import { Input } from "@/components/ui/input";

const EmailPreviewHeader = () => {
  const { selectedEmailDetails } = useEscalationEmails();
  const PriorityIcon = getEmailPriorityIcon(
    selectedEmailDetails?.priority || ""
  );

  // const formatDate = (dateString: string) => {
  //   try {
  //     if (!dateString) return "N/A";
  //     const date = new Date(dateString);
  //     if (isNaN(date.getTime())) return "Invalid Date";
  //     return format(date, "MMM d, yyyy h:mm a");
  //   } catch (error) {
  //     return "Invalid Date";
  //   }
  // };

  return (
    <Card>
      <CardHeader className="gap-0">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              {selectedEmailDetails?.subject}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              From: {selectedEmailDetails?.customerEmail}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={getEmailStatusColor(
                selectedEmailDetails?.priority || ""
              )}
            >
              <PriorityIcon className="h-4 w-4" />
              <span className="ml-1 capitalize">
                {selectedEmailDetails?.priority}
              </span>
            </Badge>
            <Badge
              variant="secondary"
              className={getEmailStatusColor(
                selectedEmailDetails?.status || ""
              )}
            >
              {selectedEmailDetails?.status?.replace("_", " ") || "Unknown"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 text-sm">
          {/* Email Date */}
          <div className="flex flex-col gap-1">
            <span className="font-medium text-gray-600">Created:</span>
            <p>{selectedEmailDetails?.createdAt}</p>
            {/* <p>{formatDate(selectedEmailDetails?.createdAt)}</p> */}
          </div>
          {/* Escalation Reason */}
          <div className="flex flex-col gap-1">
            <span className="font-medium text-gray-600">
              Escalation Reason:
            </span>
            <p className="capitalize">
              {selectedEmailDetails?.reason || "Unknown"}
            </p>
          </div>
          {/* Customer Account */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-gray-600">Customer Account:</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="!h-8 px-2 text-xs"
                // onClick={async () => {
                //   await handleViewCustomerAccount(
                //     selectedEmailDetails?.customerEmail
                //   );
                // }}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View in Store
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="font-medium text-gray-600">Quick Actions:</span>
            <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 w1440:!grid-cols-4 gap-2">
              <Button
                variant="outline"
                className="!h-8 px-3 text-xs bg-blue-50 hover:bg-blue-100 border-blue-200"
                // onClick={async () => {
                //   await handleSendOrderStatus(
                //     selectedEmailDetails?.customerEmail
                //   );
                // }}
                // disabled={sendOrderStatusMutation.isPending}
              >
                <Package className="h-3 w-3 mr-1" />
                {/* {sendOrderStatusMutation.isPending
                  ? "Sending..."
                  : "Send Order Status"} */}
                Send Order Status
              </Button>

              <Button
                variant="outline"
                className="!h-8 px-3 text-xs bg-purple-50 hover:bg-purple-100 border-purple-200"
                // onClick={async () => {
                //   await handleViewOrderHistory(
                //     selectedEmailDetails?.customerEmail
                //   );
                // }}
                // disabled={viewOrderHistoryMutation.isPending}
              >
                <History className="h-3 w-3 mr-1" />
                {/* {viewOrderHistoryMutation.isPending
                  ? "Loading..."
                  : "View Order History"} */}
                View Order History
              </Button>

              <div className="col-span-2 grid sm:grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Refund amount"
                  className="!h-8 text-xs"
                  // value={refundAmounts[selectedEmailDetails?.id] || ""}
                  // onChange={(e) => {
                  //   setRefundAmounts((prev) => ({
                  //     ...prev,
                  //     [selectedEmailDetails?.id]: e.target.value,
                  //   }));
                  // }}
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="!h-8 px-3 text-xs bg-green-50 hover:bg-green-100 border-green-200"
                  // onClick={async () => {
                  //   const amount = parseFloat(
                  //     refundAmounts[selectedEmailDetails?.id] || "0"
                  //   );
                  //   if (amount > 0) {
                  //     await handleQuickRefund(
                  //       selectedEmailDetails?.customerEmail,
                  //       amount
                  //     );
                  //   }
                  // }}
                  // disabled={
                  //   !refundAmounts[selectedEmailDetails?.id] ||
                  //   parseFloat(refundAmounts[selectedEmailDetails?.id]) <= 0 ||
                  //   quickRefundMutation.isPending
                  // }
                >
                  <CreditCard className="h-3 w-3 mr-1" />
                  {/* {quickRefundMutation.isPending
                    ? "Processing..."
                    : "Quick Refund"} */}
                  Quick Refund
                </Button>
              </div>
            </div>
          </div>

          {/* Order History Display */}
          {/* {showOrderHistory === selectedEmailDetails?.customerEmail && (
            <div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600">
                  Order History (Last 3 Orders):
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowOrderHistory(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="mt-2 space-y-2">
                {orderHistory.length === 0 ? (
                  <p className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                    No orders found for this customer
                  </p>
                ) : (
                  orderHistory.slice(0, 3).map((order, index) => (
                    <div
                      key={order.id || index}
                      className="p-3 bg-gray-50 rounded border text-xs"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">
                          #{order.orderNumber}
                        </span>
                        <span className="text-gray-600">{order.total}</span>
                      </div>
                      <div className="text-gray-600 space-y-1">
                        <div>
                          Status:{" "}
                          <span className="capitalize">{order.status}</span>
                        </div>
                        <div>
                          Date:{" "}
                          {new Date(order.dateCreated).toLocaleDateString()}
                        </div>
                        {order.trackingNumber && (
                          <div>Tracking: {order.trackingNumber}</div>
                        )}
                        <div className="text-gray-500">
                          Platform: {order.platform}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPreviewHeader;
