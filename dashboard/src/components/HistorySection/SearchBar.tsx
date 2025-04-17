

import { Search } from "lucide-react";
import { Button } from "../Button";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-16 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          // size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-2 text-muted-foreground"
          onClick={() => setSearchQuery("")}
        >
          Clear
        </Button>
      )}
    </div>
  );
};
