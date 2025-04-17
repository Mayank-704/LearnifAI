
import { MessageSquare, CheckCircle } from "lucide-react";

interface QuestionCardProps {
  question: string;
  askedAt: string;
  answeredAt: string;
  answer: string;
  status: "answered" | "pending";
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, askedAt, answeredAt, answer, status }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-black mb-6">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold">{question}</h2>
        {status === "answered" && (
          <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
            <CheckCircle size={16} /> Answered
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 text-gray-500 text-sm mt-2">
        <div className="flex items-center gap-1">
          <MessageSquare size={16} />
          Asked {askedAt}
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle size={16} />
          Answered {answeredAt}
        </div>
      </div>

      <p className="text-gray-700 mt-4">{answer}</p>
    </div>
  );
};
