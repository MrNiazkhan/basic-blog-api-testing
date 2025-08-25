"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function DashboardSettingsPage() {
  const { user, updateUser } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">(user?.theme || "light");
  const [notifications, setNotifications] = useState(user?.notifications ?? true);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    updateUser({ theme, notifications });
    setMessage("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5 accent-primary"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
