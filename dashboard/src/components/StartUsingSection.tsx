import React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

const StartUsingSection: React.FC = () => {
  // const handleChromeClick = (): void => {
  //   window.open("https://www.youtube.com/", "_blank");
  // };

  const handleGitHubClick = (): void => {
    window.open("https://github.com/Mayank-704/LearnifAI", "_blank");
  };

  const handleTwitterClick = (): void => {
    window.open("https://x.com/_Mayank_704", "_blank");
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-16 flex flex-col items-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Start Using LearifAI Today
      </h2>
      <p className="text-gray-300 text-center max-w-xl mb-8">
        Join developers who are saving time and enhancing their understanding with voice-powered AI
        assistance. Installation takes less than a minute.
      </p>

      {/* <button
        onClick={handleChromeClick}
        className="bg-white text-gray-800 px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-gray-100 transition mb-8"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png"
          alt="Chrome"
          className="w-5 h-5"
        />
        Add to Chrome
      </button> */}

      <div className="flex gap-6">
        <FaGithub
          className="text-2xl cursor-pointer hover:text-gray-400 transition"
          onClick={handleGitHubClick}
        />
        <FaTwitter
          className="text-2xl cursor-pointer hover:text-blue-400 transition"
          onClick={handleTwitterClick}
        />
      </div>
    </div>
  );
};

export default StartUsingSection;
