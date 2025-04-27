import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.ts";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);
  const navigate = useNavigate(); // Use React Router's navigate for redirection

  const validateForm = () => {
    if (!formData.fullName) {
      toast.error("Full Name is required");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("Invalid password format");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signup(formData); // Await the signup function
      // toast.success("Signup successful!");
      navigate("/"); // Redirect to the home page after successful signup
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="dark">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-300"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <NavLink to="/login" className="text-indigo-400 hover:underline">
              Log In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;