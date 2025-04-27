import { useEffect, useState } from "react";
import { QuestionCard } from "../components/HistorySection/QuestionCard";
import Cookies from "js-cookie";
import { Search } from "lucide-react"; // Import the search icon

interface HistoryItem {
  _id: string;
  userId: string;
  question: string;
  answer: string;
  timestamp: string;
  __v: number;
}

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    const token = Cookies.get("token");

    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://learnifai-1.onrender.com/api/history/gethistory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      setHistory(data || []);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredQuestions = history.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border rounded-2xl border-gray-700  bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        )}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && !error && filteredQuestions.length === 0 && (
          <div className="text-gray-400 text-center">
            No history found. Save your responses from extension to get history of your asked questions.
          </div>
        )}
        {!loading && !error && filteredQuestions.map((q) => (
          <QuestionCard
            key={q._id}
            question={q.question}
            askedAt={new Date(q.timestamp).toLocaleString()}
            answer={q.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
