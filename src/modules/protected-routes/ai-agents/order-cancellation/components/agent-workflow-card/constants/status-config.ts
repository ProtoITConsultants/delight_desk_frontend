import { AlertCircle, CheckCircle, Clock, Mail, XCircle } from "lucide-react";

const STATUS_CONFIG = {
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    icon: Clock,
  },
  awaiting_warehouse: {
    label: "Awaiting Response",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: Mail,
  },
  canceled: {
    label: "Completed",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle,
  },
  cannot_cancel: {
    label: "Too Late",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    icon: AlertCircle,
  },
  failed: {
    label: "Failed",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: XCircle,
  },
  escalated: {
    label: "Escalated",
    color: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
    icon: AlertCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle,
  },
};

export default STATUS_CONFIG;
