"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && params.id === user.id) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar || "");
    }
  }, [user, params.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, avatar });
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
