import { Link, NavLink } from 'react-router-dom';
import { Mic } from "lucide-react";
import { usePathStore } from '../store/usePathStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar: React.FC = () => {
  const currentPath = usePathStore((state) => state.currentPath);
  const location = useLocation();
  const setCurrentPath = usePathStore((state) => state.setCurrentPath);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname, setCurrentPath]);

  const handleScrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-2 shadow-md bg-gray-900 text-white">

      <div className="flex items-center justify-center bg-gray-900 pb-2 mr-4">
        <Link to="/" className="hover:text-blue-400">
          <div className="flex items-center">
            <Mic className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Learnif<span className="text-blue-400">AI</span>
            </h1>
          </div>
        </Link>
      </div>

      <nav className="flex items-center space-x-6 gap-4">
        {currentPath !== "/history" ? (
          <div className="flex gap-3">
            <button
              onClick={handleScrollToFeatures}
              className="text-gray-300 hover:text-blue-400"
            >
              Features
            </button>
            <NavLink
              to="/history"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-400 font-bold underline"
                  : "text-gray-300 hover:text-blue-400";
              }}
            >
              History
            </NavLink>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400"
            >
              Get Started
            </a>
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-gray-200 items-center absolute left-1/2 transform -translate-x-1/2">
            History
          </h1>
        )}
      </nav>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 border border-blue-400 text-blue-400 rounded-full hover:bg-blue-800">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
            Sign Up
          </button>
        </Link>
        <a
          href="https://chrome.google.com/webstore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
            Install Extension
          </button>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
