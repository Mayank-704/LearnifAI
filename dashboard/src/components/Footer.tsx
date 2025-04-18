import React from 'react';
import { Mic } from "lucide-react";


const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t text-sm text-gray-600 max-w-screen mx-full">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div className="space-y-3">
          <div className="flex items-center cursor-pointer" onClick={scrollToTop}>
            <div className="flex items-center justify-center  bg-white pb-4 mr-4">
              <div className="flex items-center">
                <Mic className="w-12 h-12 text-blue-500" />
                <h1 className="text-sm font-bold text-blue-900">
                  Learnif<span className="text-blue-700">AI</span>
                </h1>
              </div>

            </div>
          </div>

          <p className="text-[#6B7280]">
            Your Voice-Powered Doc Buddy that makes understanding code and documentation easier than ever.
          </p>
        </div>


        <div>
          <h3 className="text-[#1F2937] font-semibold mb-3">Product</h3>
          <ul className="space-y-2">
            <li><a className="hover:underline">Features</a></li>
            <li><a className="hover:underline">Dashboard</a></li>
            <li><a className="hover:underline">Privacy</a></li>
            <li><a className="hover:underline">Security</a></li>
          </ul>
        </div>


        <div>
          <h3 className="text-[#1F2937] font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a className="hover:underline">Documentation</a></li>
            <li><a className="hover:underline">API</a></li>
            <li><a className="hover:underline">Guides</a></li>
            <li><a className="hover:underline">Support</a></li>
          </ul>
        </div>


        <div>
          <h3 className="text-[#1F2937] font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li><a className="hover:underline">About</a></li>
            <li><a className="hover:underline">Blog</a></li>
            <li><a className="hover:underline">Careers</a></li>
            <li><a className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-6 py-4 px-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 max-w-7xl mx-auto">
        <p>
          © 2025 <span className="text-blue-600 cursor-pointer" onClick={scrollToTop}>LearnifAI</span>. All rights reserved.
        </p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;