import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { auth } from "../components/firebase";
import SignInwithGoogle from "../components/SignInwithGoogle";
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Registered Successfully!");
    } catch (error: any) {
      console.error("Sign Up Error:", error.message);
    }
  };

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

        <h2 className="text-center text-xl font-semibold mb-6">Sign Up</h2>

        <SignInwithGoogle />

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm block mb-1">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 rounded-lg border border-gray-400 text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-3 py-2 rounded-lg border border-gray-400 text-sm"
                required
              />
              <span
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-2"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
