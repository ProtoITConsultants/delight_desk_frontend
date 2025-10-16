const getEmailStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-orange-600 bg-orange-50";
    case "in_progress":
      return "text-blue-600 bg-blue-50";
    case "resolved":
      return "text-green-600 bg-green-50";
    case "closed":
      return "text-gray-600 bg-gray-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export default getEmailStatusColor;
