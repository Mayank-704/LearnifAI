import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface LoginForm {
  email: string;
  password: string;
}

function LoginPage({ onAuthChange }: { onAuthChange: () => void }) {
  const [showPassword, setPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const login = useAuthStore((state) => state.login);
const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (data: LoginForm): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!data.email || !data.password) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (!passwordRegex.test(data.password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one letter, one number, and one special character"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoggingIn || loading) return;

    if (!validateForm(formData)) return;

    setLoading(true);
    try {
      await login(formData);
      onAuthChange();
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-auto md:h-[90vh] w-full flex justify-center items-center p-6 bg-gray-900 text-gray-200">
      {/* Form Container */}
      <div className="relative z-10 bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-4 focus:ring-purple-500 focus:ring-offset-2"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-4 focus:ring-purple-500 focus:ring-offset-2"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
                onClick={() => setPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>

          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-purple-400 hover:underline">
                Sign up
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
