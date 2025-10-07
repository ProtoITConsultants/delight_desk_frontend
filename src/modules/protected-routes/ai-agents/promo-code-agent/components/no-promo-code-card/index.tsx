import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Settings } from "lucide-react";

type PROPS = {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoPromoCodeCard = ({ setIsDialogOpen }: PROPS) => {
  return (
    <Card data-testid="empty-state">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Settings className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          No Promo Code Configurations
        </h3>
        <p className="text-muted-foreground text-center mb-4">
          Create your first enhanced promo code configuration to enable
          sophisticated automation
        </p>
        <Button
          onClick={() => setIsDialogOpen(true)}
          data-testid="button-create-first"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Your First Configuration
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoPromoCodeCard;
