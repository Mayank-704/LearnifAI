import { useEffect, useState } from "react";
import { QuestionCard } from "../components/HistorySection/QuestionCard";
import Cookies from "js-cookie";
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
      setHistory(data.history || []);
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
    <div className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-between px-6 mt-4">
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
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {loading && <div className="text-white text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && !error && filteredQuestions.length === 0 && (
          <div className="text-gray-400 text-center">No history found. Save your responses from extension to get history of your asked questions.</div>
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
