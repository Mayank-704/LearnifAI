interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center gap-2 mx-auto w-full max-w-lg">
      <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow border p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="text-sm text-gray-600"
        >
          Clear
        </button>
      )}
    </div>
  );
};
