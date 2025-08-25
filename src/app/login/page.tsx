"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="  flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-[1000px] max-w-sm bg-white rounded-3xl p-10 border border-gray-200 flex flex-col justify-center"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Welcome Back
        </h1>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mb-4 text-center font-medium text-sm"
          >
            {error}
          </motion.p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
         
          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-sm placeholder-gray-400"
            />
          </div>

       
          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium text-sm">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-sm pr-12"
            />
            <span
              className="absolute right-3 top-[50%] -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition mt-3.5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </span>
          </div>

         
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 font-medium hover:underline transition"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
