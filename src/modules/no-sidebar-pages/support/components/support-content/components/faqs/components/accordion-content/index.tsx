import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useFAQSidebar } from "../../context/use-faq-sidebar";
import { Badge } from "@/components/ui/badge";
import { Book } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQsContent = () => {
  const { FILTERED_FAQs, searchedTerm, selectedCategory } = useFAQSidebar();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        <CardDescription>
          {FILTERED_FAQs.length}{" "}
          {FILTERED_FAQs.length === 1 ? "question" : "questions"} found
          {searchedTerm && ` for "${searchedTerm}"`}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Accordion
            //   key={faq.id}
            //   open={openItems.has(faq.id)}
            //   onOpenChange={() => toggleItem(faq.id)}
            collapsible
            type="single"
            className="space-y-2"
          >
            {FILTERED_FAQs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-none"
              >
                <AccordionTrigger className="w-full hover:cursor-pointer flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors rounded-b-none">
                  <div className="flex items-start gap-3 text-left">
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium text-gray-900">
                        {faq.question}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-xs rounded-full bg-gray-200"
                      >
                        {faq.category}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 border border-t-0 rounded-b-lg text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {FILTERED_FAQs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Book className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">No FAQs found</p>
              <p>Try adjusting your search terms or category filter</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQsContent;
