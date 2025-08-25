"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUser, FiFileText, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    { name: "Home", icon: <FiHome />, href: "/dashboard" },
    { name: "Profile", icon: <FiUser />, href: "/dashboard/profile/1" },
    { name: "My Articles", icon: <FiFileText />, href: "/dashboard/articles" },
    { name: "Settings", icon: <FiSettings />, href: "/dashboard/settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-md sticky top-0 h-screen">
      
      <div className="px-6 py-8 flex flex-col flex-grow overflow-y-auto">
        <h2 className="text-2xl font-bold text-primary mb-8">Dashboard</h2>
        <nav className="flex flex-col flex-grow space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-colors ${
                  isActive ? "bg-primary text-white" : "text-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

     
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white rounded-md transition-colors"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
