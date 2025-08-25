"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SignupPage() {
  const { signup, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await signup(name, email, password);
      router.push("/dashboard");
    } catch {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className=" flex items-center justify-center  px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl p-10"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Create Account
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
          <div>
            <label className="block text-gray-700 mb-2 font-medium text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-sm placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-sm placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-sm"
            />
            <span
              className="absolute right-3 top-[50%] -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition"
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
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition shadow-md"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
