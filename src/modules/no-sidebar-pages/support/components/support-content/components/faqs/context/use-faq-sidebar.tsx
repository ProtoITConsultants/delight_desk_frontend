import React, { createContext, useContext, useState } from "react";
import { FAQs_DATA } from "../constants";
import { FAQs_SIDEBAR_CONTEXT_TYPE } from "../types";

export const FAQSidebarContext = createContext<
  FAQs_SIDEBAR_CONTEXT_TYPE | undefined
>(undefined);

export const FAQSidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchedTerm, setSearchedTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const FILTERED_FAQs = FAQs_DATA.filter((faq) => {
    const matchesSearch =
      searchedTerm === "" ||
      faq.question.toLowerCase().includes(searchedTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchedTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchedTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <FAQSidebarContext.Provider
      value={{
        searchedTerm,
        setSearchedTerm,
        selectedCategory,
        setSelectedCategory,
        FILTERED_FAQs,
      }}
    >
      {children}
    </FAQSidebarContext.Provider>
  );
};

export const useFAQSidebar = () => {
  const context = useContext(FAQSidebarContext);
  if (!context) {
    throw new Error("useFAQSidebar must be used inside FAQSidebarProvider");
  }
  return context;
};
