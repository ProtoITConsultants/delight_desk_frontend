import { AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";

const getEmailPriorityIcon = (priority: string) => {
  switch (priority) {
    case "urgent":
    case "high":
      return ArrowUp;
    case "low":
      return ArrowDown;
    default:
      return AlertTriangle;
  }
};

export default getEmailPriorityIcon;
