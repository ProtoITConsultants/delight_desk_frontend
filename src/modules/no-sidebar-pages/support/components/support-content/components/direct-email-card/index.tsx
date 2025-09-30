"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const DirectEmailSupportCard = () => {
  return (
    <Card className="text-center p-0">
      <CardContent className="p-6">
        <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Direct Email Support</h3>
        <p className="text-gray-600 mb-4">
          Get personalized help from our support team within 24 hours
        </p>
        <Button
          className="w-full"
          onClick={() =>
            document
              .getElementById("contact-form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Contact Support
        </Button>
      </CardContent>
    </Card>
  );
};

export default DirectEmailSupportCard;
