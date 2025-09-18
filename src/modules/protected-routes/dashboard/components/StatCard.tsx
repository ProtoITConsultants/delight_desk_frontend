import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Types
type StatCardProps = {
  label: string;
  value: number | string;
  colorClass: string;
  icon: React.ReactNode;
};

const StatCard = ({ label, value, colorClass, icon }: StatCardProps) => {
  return (
    <Card className="py-0 rounded-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className={cn("text-2xl font-bold", colorClass)}>{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
