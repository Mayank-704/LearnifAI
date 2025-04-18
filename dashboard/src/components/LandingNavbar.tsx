import { Link } from 'react-router-dom';

const LandingNavbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 shadow-md bg-white">
      {/* Logo and Title */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/" className="hover:text-blue-800">
          LearnifAI
        </Link>
      </div>

      <nav className="flex items-center space-x-6 gap-4">
        <Link to="/features" className="text-gray-700 hover:text-blue-500">
          Features
        </Link>
        <Link to="/history" className="text-gray-700 hover:text-blue-500">
          Dashboard
        </Link>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-500"
        >
          Get Started
        </a>
      </nav>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
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

export default LandingNavbar;
