import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
      <header className="top-0 left-0 right-0 z-50 flex justify-between items-center p-4 shadow-md bg-white">

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")} 
      >
        <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-800">LearnifAI</h1>
      </div>

      <h1 className="text-2xl font-bold text-gray-800">
        History
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
      >
        + New Question
      </button>
    </header>
  );
};
