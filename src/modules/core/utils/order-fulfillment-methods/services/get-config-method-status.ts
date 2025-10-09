const getConfigMethodStatus = ({
  isCurrent,
  isEnabled,
}: {
  isCurrent: boolean;
  isEnabled: boolean;
}) => {
  if (isCurrent && isEnabled) return "Active";
  if (!isCurrent && isEnabled) return "Available";
  return "Not Configured";
};

export default getConfigMethodStatus;
