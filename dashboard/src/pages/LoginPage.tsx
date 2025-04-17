import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SignInwithGoogle from "../components/SignInwithGoogle";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white p-8 rounded-4xl shadow-xl w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-gray-300 rounded-md flex items-center justify-center text-sm font-medium text-[#1F2937]">Logo</div>
        </div>

        <h2 className="text-center text-[#1F2937] text-xl font-semibold mb-6">
          Login Your Account
        </h2>

        <SignInwithGoogle />

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-[#1F2937]">E-Mail</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-[#6B7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#1F2937]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-lg border border-[#6B7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
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
          <div className="flex item-center justify-center">
          <button
            type="submit"
            className=" w-50 mt-2 bg-[#10B981] hover:bg-[#0f9a74] transition-colors py-2 rounded-xl text-[#F9FAFB] font-medium"
          >
            Login
          </button>
          </div>
          
        </form>
        <div className="text-center mt-2">
              <a href="#" className="text-sm text-[#3B82F6] hover:underline">
                Forgot Password?
              </a>
            </div>

        <div className="text-center mt-3 text-sm text-[#1F2937]">
          Don’t Have An Account?{" "}
          <a href="/signup" className="text-[#3B82F6] hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
