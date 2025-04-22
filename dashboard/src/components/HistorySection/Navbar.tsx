import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="top-0 left-0 right-0 z-50 flex justify-between items-center p-2 shadow-md bg-white">

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/landing")}
      >
        <div className="flex items-center justify-center  bg-white pb-2 mr-4">
          <div className="flex items-center">
            <Mic className="w-12 h-12 text-blue-500" />
            <h1 className="text-4xl font-bold text-blue-900">
              Learnif<span className="text-blue-700">AI</span>
            </h1>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 items-center absolute left-1/2 transform -translate-x-1/2">
        History
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
      >
        Back
      </button>
    </header>
  );
};
