import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";

const ReturnPolicyConfigRoot = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Shield className="h-5 w-5" />
          Return Policy Configuration
        </CardTitle>
        <CardDescription>
          Set up your return policy and automation preferences
        </CardDescription>
      </CardHeader>
      {/* Content */}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ReturnPolicyConfigRoot;
