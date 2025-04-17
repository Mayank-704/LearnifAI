import { useNavigate } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import SingleQueryItem from "./SingleQueryItem";

const queries = [
  { title: "Explain async/await in JavaScript", time: "2 mins ago", type: "Code" },
  { title: "What are React hooks?", time: "Yesterday", type: "Doc" },
  { title: "Explain this SQL query", time: "Yesterday", type: "Code" },
  { title: "How does Docker containerization work?", time: "2 days ago", type: "Doc" },
];

const QueryList = () => {
  const navigate = useNavigate();

  const handleViewAllHistory = () => {
    const isAuthenticated = Boolean(localStorage.getItem("token"));
    if (isAuthenticated) {
      navigate("/history");
    } else {
      navigate("/login", { state: { redirectTo: "/history" } });
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden ">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold">Your Query History</h3>
        <div className="flex items-center gap-4">
          <FaSearch className="text-gray-400" />
          <FaCalendarAlt className="text-gray-400" />
        </div>
      </div>

      <ul className="divide-y divide-gray-700">
        {queries.map((query, index) => (
          <SingleQueryItem key={index} {...query} />
        ))}
      </ul>

      <div className="px-6 py-4 text-center">
        <button
          onClick={handleViewAllHistory}
          className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-500 font-medium">
          View All History
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default QueryList;
