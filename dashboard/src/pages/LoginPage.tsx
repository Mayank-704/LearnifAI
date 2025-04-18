import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SignInwithGoogle from "../components/SignInwithGoogle";
import { Mic } from "lucide-react";
import { Link } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">

        <div className="flex items-center justify-center  bg-white pb-4 mr-4">
          <Link to="/landing" className="hover:text-blue-800">
            <div className="flex items-center">
              <Mic className="w-12 h-12 text-blue-500" />
              <h1 className="text-4xl font-bold text-blue-900">
                Learnif<span className="text-blue-700">AI</span>
              </h1>
            </div>
          </Link>
        </div>



        <h2 className="text-center text-xl font-semibold mb-6">Login Your Account</h2>

        <SignInwithGoogle />

        <form className="space-y-4">
          <div>
            <label className="text-sm block mb-1">E-Mail</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-gray-400 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-sm block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-lg border border-gray-400 text-sm"
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-2"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
