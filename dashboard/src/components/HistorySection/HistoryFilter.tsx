
import { Button } from "../Button";

interface HistoryFilterProps {
  currentFilter: "all" | "code" | "text";
  setFilter: (filter: "all" | "code" | "text") => void;
}

export const HistoryFilter: React.FC<HistoryFilterProps> = ({ currentFilter, setFilter }) => {
  return (
    <div className="flex items-center gap-2">
      {["all", "code", "text"].map((type) => (
        <Button
          key={type}
          variant={currentFilter === type ? "default" : "ghost"}
          onClick={() => setFilter(type as "all" | "code" | "text")}
          className={currentFilter === type ? "bg-purple-500 hover:bg-purple-600 text-white" : "text-gray-500"}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      ))}
    </div>
  );
};
