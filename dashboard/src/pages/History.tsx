import { useState } from "react";
import { Navbar } from "../components/HistorySection/Navbar";
import { SearchBar } from "../components/HistorySection/SearchBar";
import { HistoryFilter } from "../components/HistorySection/HistoryFilter";
import { QuestionCard } from "../components/HistorySection/QuestionCard";

interface Question {
  id: number;
  type: "code" | "text";
  question: string;
  askedAt: string;
  answeredAt?: string;
  answer?: string;
  status: "answered" | "pending";
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    type: "code",
    question: "How do I implement authentication in a React application?",
    askedAt: "Apr 15, 2023 at 10:30 AM",
    answeredAt: "Apr 15, 2023 at 2:45 PM",
    answer: "You can use libraries like Firebase Authentication, Auth0, or implement your own using JWT tokens.",
    status: "answered",
  },
  {
    id: 2,
    type: "text",
    question: "What's the best way to manage global state in a large React application?",
    askedAt: "Apr 17, 2023 at 9:15 AM",
    answeredAt: "Apr 17, 2023 at 11:20 AM",
    answer: "Consider using Redux, Redux Toolkit, or Zustand for simpler needs.",
    status: "answered",
  },
  {
    id: 3,
    type: "code",
    question: "How to optimize React performance for large lists?",
    askedAt: "Apr 18, 2023 at 12:00 PM",
    answer: "",
    status: "pending",
  },
];

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "code" | "text">("all");

  const filteredQuestions = sampleQuestions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || q.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-between px-6 mt-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <HistoryFilter currentFilter={filter} setFilter={setFilter} />
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {filteredQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q.question}
            askedAt={q.askedAt}
            answeredAt={q.answeredAt || ""}
            answer={q.answer || ""}
            status={q.status}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
