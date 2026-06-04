import { getStatusVariants } from "@/modules/protected-routes/ai-assistant/utils/palette";

// Backend uses the `progress` enum value but historical UI mapped `in_progress`
// to the same hue family — normalize either to the canonical pending/progress/
// resolved palette.
const normalizeStatus = (status: string): string =>
  status === "in_progress" ? "progress" : status;

const getEmailStatusColor = (status: string) =>
  getStatusVariants(normalizeStatus(status)).softPill;

export default getEmailStatusColor;
