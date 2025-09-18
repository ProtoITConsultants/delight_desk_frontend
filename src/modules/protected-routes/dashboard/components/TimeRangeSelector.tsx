import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DASHBOARD from "@/constants/dashboard";

// Types
type TimeRangeSelectorProps = {
  timeRange: string;
  setTimeRange: React.Dispatch<React.SetStateAction<string>>;
};

const TimeRangeSelector = ({
  timeRange,
  setTimeRange,
}: TimeRangeSelectorProps) => {
  return (
    <Select value={timeRange} onValueChange={setTimeRange}>
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
