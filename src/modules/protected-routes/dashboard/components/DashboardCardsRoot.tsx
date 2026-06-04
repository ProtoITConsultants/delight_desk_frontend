import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardCardsRootProps = {
  title: string | React.ReactNode;
  description: string;
  headerRightSection?: React.ReactNode; // Right Section for Card Header
  children: React.ReactNode;
};

const DashboardCardsRoot = ({
  title,
  description,
  headerRightSection,
  children,
}: DashboardCardsRootProps) => {
  return (
    <Card className="py-4 rounded-lg">
      <CardHeader className="gap-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {headerRightSection}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">{children}</div>
      </CardContent>
    </Card>
  );
};

export default DashboardCardsRoot;
