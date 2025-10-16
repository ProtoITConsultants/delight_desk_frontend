import { Building, Mail, Package } from "lucide-react";

const FULLFILLMENT_METHODS = [
  {
    id: "warehouse_email",
    title: "Warehouse Email Coordination",
    description:
      "Send emails to your warehouse team for manual address changes",
    icon: Mail,
    color:
      "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    features: [
      "Email coordination",
      "Manual warehouse workflow",
      "Human oversight",
    ],
  },
  {
    id: "shipbob",
    title: "ShipBob API Integration",
    description:
      "Automatically change addresses through ShipBob API before fulfillment",
    icon: Package,
    color:
      "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
    features: [
      "Automatic API updates",
      "Real-time address sync",
      "Instant confirmation",
    ],
  },
  {
    id: "self_fulfillment",
    title: "Self-Fulfillment Management",
    description: "Manage address changes for orders you fulfill in-house",
    icon: Building,
    color:
      "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    features: [
      "Direct WooCommerce integration",
      "Automatic address updates",
      "Order status sync",
    ],
  },
];

export default FULLFILLMENT_METHODS;
