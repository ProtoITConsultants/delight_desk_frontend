import { TIMEZONES } from "../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimezoneSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  label?: string;
  description?: string;
}

export function TimezoneSelect({
  value,
  onValueChange,
  disabled = false,
  placeholder = "Select timezone...",
  required = false,
  label = "Timezone",
  description,
}: TimezoneSelectProps) {
  return (
    <div className="space-y-2 w-full">
      <Label className="gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger className="w-full !h-10">
          <SelectValue placeholder={placeholder} className="!text-sm" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {TIMEZONES.map((timezone) => (
            <SelectItem key={timezone.value} value={timezone.value}>
              <div className="flex flex-col items-start">
                <span className="font-medium text-xs">{timezone.label}</span>
                <span className="text-[10px] text-gray-500">
                  {timezone.offset}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
}
