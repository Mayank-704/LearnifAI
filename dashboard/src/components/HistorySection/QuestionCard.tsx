import { MessageSquare, CheckCircle, Clock } from "lucide-react";

interface QuestionCardProps {
  question: string;
  askedAt: string;
  answeredAt?: string;
  answer?: string;
  status: "answered" | "pending";
  darkMode?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  askedAt,
  answeredAt,
  answer,
  status,
  darkMode = true,
}) => {
  return (
    <div
      className={`p-6 rounded-xl shadow border mb-6 hover:shadow-lg ${
        darkMode
          ? "bg-gray-800 text-gray-200 border-gray-700"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold">{question}</h2>
        {status === "answered" ? (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
              darkMode
                ? "text-green-400 bg-green-900"
                : "text-green-600 bg-green-100"
            }`}
          >
            <CheckCircle size={16} /> Answered
          </div>
        ) : (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
              darkMode
                ? "text-yellow-400 bg-yellow-900"
                : "text-yellow-600 bg-yellow-100"
            }`}
          >
            <Clock size={16} /> Not Answered
          </div>
        )}
      </div>

      <div
        className={`flex items-center gap-6 text-sm mt-2 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div className="flex items-center gap-1">
          <MessageSquare size={16} />
          Asked {askedAt}
        </div>
        {answeredAt && (
          <div className="flex items-center gap-1">
            <CheckCircle size={16} />
            Answered {answeredAt}
          </div>
        )}
      </div>

      <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {answer || "No answer yet."}
      </p>
    </div>
  );
};
