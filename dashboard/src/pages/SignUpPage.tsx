import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../components/firebase";
import SignInwithGoogle from "../components/SignInwithGoogle";

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value);
      const user = auth.currentUser;
      console.log("User Registered Successfully!");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-4xl shadow-xl w-full max-w-sm text-[#1F2937]">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#6B7280] text-white flex items-center justify-center rounded-md font-semibold text-sm">Logo</div>
        </div>

        <h2 className="text-center text-xl font-semibold mb-6">Sign Up</h2>

        <SignInwithGoogle />

        <form onSubmit={handleRegister} className="space-y-5">
          
          <div>
            <label htmlFor="email" className="text-sm block mb-1">E-Mail</label>
            <input
              type="email"
              id="email"
        
              className="w-full px-4 py-2 rounded-md bg-white text-[#1F2937] border border-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                
                className="w-full px-4 py-2 pr-10 rounded-md bg-white text-[#1F2937] border border-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              />
              <span
                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.107-3.592M6.282 6.282A10.012 10.012 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.01 10.01 0 01-4.032 5.148M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <div className="flex item-center justify-center">
          <button
            type="submit"
            className="w-50 mt-3 bg-[#10B981] hover:bg-green-700 text-white py-2 rounded-md transition duration-200"
          >
            Sign Up
          </button>
          </div>
         

          

          <p className="text-center text-sm text-[#1F2937]">
            Already have an account? <a href="/login" className="text-[#3B82F6] hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
