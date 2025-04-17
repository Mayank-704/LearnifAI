import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/HistorySection/Navbar";
import { SearchBar } from '../components/HistorySection/SearchBar';
import { QuestionCard } from "../components/HistorySection/QuestionCard";
import { HistoryFilter } from "../components/HistorySection/HistoryFilter";

interface Question {
  id: number;
  question: string;
  askedAt: string;
  answeredAt: string;
  answer: string;
  status: "answered" | "pending";
  type: "code" | "text"; // Add this if you want filtering to work!
}

const History: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "code" | "text">("all");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get<Question[]>("https://api.example.com/questions");
        setQuestions(res.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Filter based on searchQuery and filter
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || q.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-between mb-2 mt-2 gap-2 ml-auto px-6">
        <HistoryFilter currentFilter={filter} setFilter={setFilter} />
      </div>

      <div className="p-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      
      <div className="p-6 max-w-4xl mx-auto">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q.question}
              askedAt={q.askedAt}
              answeredAt={q.answeredAt}
              answer={q.answer}
              status={q.status}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No matching questions found.</div>
        )}
      </div>
    </div>
  );
};

export default History;

