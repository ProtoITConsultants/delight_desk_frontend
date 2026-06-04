type FAQ_TYPE = {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
};

interface FAQs_SIDEBAR_CONTEXT_TYPE {
  searchedTerm: string;
  setSearchedTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  FILTERED_FAQs: FAQ_TYPE[];
}

export type { FAQ_TYPE, FAQs_SIDEBAR_CONTEXT_TYPE };
