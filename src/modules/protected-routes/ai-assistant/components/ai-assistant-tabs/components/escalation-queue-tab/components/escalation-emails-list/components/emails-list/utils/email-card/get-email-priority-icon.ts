import { getPriorityIcon } from "@/modules/protected-routes/ai-assistant/utils/palette";

const getEmailPriorityIcon = (priority: string) => getPriorityIcon(priority);

export default getEmailPriorityIcon;
