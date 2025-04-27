import React from "react";
import { Button } from "./Button";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-full mt-12 bg-gray-900 text-gray-100">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 mx-auto max-w-lg">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-800 text-blue-300">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
            </span>
            Voice-Powered Doc Buddy
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-100">
            Understand Code with Your <span className="text-blue-400">Voice</span>
          </h1>

          <p className="text-xl text-gray-400">
            A Chrome extension that helps developers understand anything on their screen with voice commands. Select,
            speak, and get instant explanations using Groq's LLM.
          </p>

          {/* Note Section */}
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mt-8">
            <p className="text-lg font-medium">
              Note: The extension is currently under review in the Chrome Store. In the meantime, you can download the
              extension folder to use it locally.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-5 mt-4">

            {/* Download Button */}
            <a href="/extension.zip" download>
              <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
              Download Extension
              </Button>
            </a>


            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 ">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/YouTube_icon_%282013-2017%29.png/120px-YouTube_icon_%282013-2017%29.png"
                alt="YouTube"
                className="w-5 h-5"
              />
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                How to use
              </a>
            </Button>




          </div>
        </div>

        {/* Right Section */}
        <div className="relative">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md mx-auto">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-auto text-sm text-gray-400">Chrome Extension</div>
            </div>

            <div className="bg-gray-700 text-gray-100 p-4 rounded-md font-mono text-sm mb-6">
              <pre>{`function processData(data) {
  return data.map(item => {
    return transform(item);
  }).filter(valid);
}`}</pre>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white hover:text-blue-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium">"Explain this code"</span>
            </div>

            <div className="bg-gray-700 p-4 rounded-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">LearnifAI Response</span>
              </div>
              <p className="text-gray-400 text-sm">
                This code first accepts an array called data. It processes each item in the array by applying a transform function to it. After transforming all items, it uses a filter function to remove any items that do not meet certain validation criteria. Finally, it returns a new array containing only the transformed items that passed the validation check. In short, it transforms and filters the original data to create a clean, valid output array.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
