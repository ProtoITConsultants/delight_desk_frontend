"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { FAQs_CATEGORIES } from "../../constants";
import { useFAQSidebar } from "../../context/use-faq-sidebar";

const FAQsSidebar = () => {
  const {
    searchedTerm,
    setSearchedTerm,
    selectedCategory,
    setSelectedCategory,
  } = useFAQSidebar();

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl gap-2">
          <Search className="h-5 w-5" />
          Search & Filter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder="Search FAQs..."
            value={searchedTerm}
            onChange={(e) => setSearchedTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Category
          </label>
          <div className="space-y-2">
            {FAQs_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:cursor-pointer ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQsSidebar;
