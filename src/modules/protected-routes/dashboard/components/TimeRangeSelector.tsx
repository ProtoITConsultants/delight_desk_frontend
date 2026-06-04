import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DASHBOARD from "@/constants/dashboard";
import { DASHBOARD_ANALYTICS_RANGE } from "@/services/dashboard/types";

// Types
type TimeRangeSelectorProps = {
  timeRange: DASHBOARD_ANALYTICS_RANGE;
  setTimeRange: (range: DASHBOARD_ANALYTICS_RANGE) => void;
};

const TimeRangeSelector = ({
  timeRange,
  setTimeRange,
}: TimeRangeSelectorProps) => {
  return (
    <Select
      value={timeRange}
      onValueChange={(value) => setTimeRange(value as DASHBOARD_ANALYTICS_RANGE)}
    >
      <SelectTrigger className="w-full sm:w-[180px] hover:cursor-pointer bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {DASHBOARD.TIME_RANGE_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="hover:cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeRangeSelector;
