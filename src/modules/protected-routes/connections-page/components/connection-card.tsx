import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Settings } from "lucide-react";

type ConnectionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

type CardItemProps = Omit<ConnectionCardProps, "children"> & {
  connectionEstablished: boolean;
  onCreateConnection: () => void;
  onManageConnection: () => void;
};

// Root Card Container
const Root = ({ title, description, icon, children }: ConnectionCardProps) => (
  <Card className="w-full gap-4 shadow-sm rounded-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
        {icon}
        {title}
      </CardTitle>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </CardContent>
  </Card>
);

// Card Items
const Item = ({
  title,
  description,
  icon,
  connectionEstablished,
  onCreateConnection,
  onManageConnection,
}: CardItemProps) => (
  <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors space-y-3">
    {/* Content */}
    <div className="flex items-center justify-between">
      {/* Connection Item Details */}
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      {/* Connection Status Card */}
      <div className="flex items-center gap-2">
        {connectionEstablished ? (
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700 rounded-full">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
          >
            <XCircle className="w-3 h-3 mr-1" />
            Not Connected
          </Badge>
        )}
      </div>
    </div>
    {/* Action Button */}
    {connectionEstablished ? (
      <Button
        variant="outline"
        size="sm"
        className="w-full h-9"
        onClick={() => onManageConnection()}
      >
        <Settings className="w-4 h-4 mr-2" />
        Manage Connection
      </Button>
    ) : (
      <Button
        size="sm"
        className="w-full h-9"
        onClick={() => onCreateConnection()}
      >
        Connect {title}
      </Button>
    )}
  </div>
);

const ConnectionCard = { Root, Item };

export default ConnectionCard;
