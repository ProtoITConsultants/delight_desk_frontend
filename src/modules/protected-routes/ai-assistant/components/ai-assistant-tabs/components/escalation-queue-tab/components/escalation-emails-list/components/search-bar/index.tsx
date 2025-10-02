"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEscalationEmails } from "../../utils/context/escalation-emails-filters";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useEscalationEmails();
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Search emails..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default SearchBar;
