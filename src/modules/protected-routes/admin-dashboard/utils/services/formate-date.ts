import { format } from "date-fns";

// Function to format date
const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "MMM dd, yyyy HH:mm");
  } catch {
    return "Never";
  }
};

export default formatDate;
