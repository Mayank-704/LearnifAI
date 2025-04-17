import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SignInwithGoogle from "../components/SignInwithGoogle";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1D]">
      <div className="bg-[#2D2D30] p-8 rounded-2xl shadow-md w-full max-w-sm text-white">
        <h2 className="text-center text-xl font-semibold mb-6">Login Your Account</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">E-Mail</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-md bg-[#1E1E1E] border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-md bg-[#1E1E1E] border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <div className="text-right mt-3">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            Forgot Password?
          </a>
        </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-md text-white font-medium"
          >
            Login
          </button>
        </form>

        <SignInwithGoogle/>

        

        <div className="text-center mt-5 text-sm text-gray-400">
          Don’t Have An Account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

