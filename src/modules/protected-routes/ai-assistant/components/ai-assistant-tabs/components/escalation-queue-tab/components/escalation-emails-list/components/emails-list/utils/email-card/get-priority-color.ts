import { getPriorityVariants } from "@/modules/protected-routes/ai-assistant/utils/palette";

const getPriorityColor = (priority: string) => getPriorityVariants(priority).softPill;

export default getPriorityColor;
