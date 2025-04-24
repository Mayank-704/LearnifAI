import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  darkMode?: boolean; // Optional prop to toggle dark mode
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, darkMode = true }) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 text-center hover:shadow-lg transition ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full ${
          darkMode ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"
        }`}
      >
        {icon}
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
        {title}
      </h3>
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
    </div>
  );
};

export default FeatureCard;
