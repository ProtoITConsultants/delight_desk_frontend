import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS } from "../../utils/constants";
import { useApprovalQueueContext } from "@/providers/approval-queue";
import { ApprovalQueueItemStatus } from "@/modules/protected-routes/approval-queue/utils/constants";

export const ApprovalQueueItemsFilter = () => {
  const { selectedItemStatus, setSelectedItemStatus } =
    useApprovalQueueContext();
  return (
    <Select
      defaultValue={APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS[0].value}
      value={selectedItemStatus}
      onValueChange={(value) =>
        setSelectedItemStatus(value as ApprovalQueueItemStatus)
      }
    >
      <SelectTrigger className="w-full !h-10 rounded-lg">
        <SelectValue placeholder="Select items status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Items Status</SelectLabel>
          {APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
