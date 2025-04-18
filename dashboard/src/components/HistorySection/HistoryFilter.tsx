interface HistoryFilterProps {
    currentFilter: "all" | "code" | "text";
    setFilter: (filter: "all" | "code" | "text") => void;
  }
  
  export const HistoryFilter: React.FC<HistoryFilterProps> = ({ currentFilter, setFilter }) => {
    const filters = ["all", "code", "text"];
  
    return (
      <div className="flex items-center gap-2">
        {filters.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType as "all" | "code" | "text")}
            className={`px-4 py-1 rounded-full text-sm ${
              currentFilter === filterType
                ? "bg-purple-500 text-white"
                : "border border-gray-300 text-gray-600"
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>
    );
  };
  