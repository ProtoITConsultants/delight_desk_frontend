"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

const FaqAndDocumentationCard = () => {
  return (
    <Card className="text-center p-0">
      <CardContent className="p-6 flex flex-col gap-4 items-center justify-between h-full">
        <div className="space-y-4">
          <Book className="h-12 w-12 text-blue-600 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">FAQ & Documentation</h3>
            <p className="text-gray-600">
              Find answers to common questions and setup guides
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            document
              .getElementById("faq-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Browse FAQ
        </Button>
      </CardContent>
    </Card>
  );
};

export default FaqAndDocumentationCard;
