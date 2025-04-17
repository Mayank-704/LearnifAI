// components/Navbar.tsx
import React from "react";
import { Plus } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b">
      {/* Left: Title + Beta tag */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">History</h1>
        
      </div>

      {/* Right: + New Question */}
      <button className="flex items-center gap-1 text-purple-600 font-medium hover:underline">
        <Plus className="w-4 h-4" />
        New Question
      </button>
    </header>
  );
};
