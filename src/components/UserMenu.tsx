"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

interface UserMenuProps {
  mobile?: boolean; 
}

const UserMenu: React.FC<UserMenuProps> = ({ mobile }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const menuItems = [
    { name: "Profile", href: `/dashboard/profile/${user.id}` },
    { name: "Dashboard", href: "/dashboard" },
  ];

  if (mobile) {
 
    return (
      <div className="flex flex-col space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="px-3 py-2 rounded-md hover:bg-gray-100">
            {item.name}
          </Link>
        ))}
        <button
          onClick={logout}
          className="px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 rounded-full hover:bg-gray-100 px-2 py-1 transition"
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
            {user.name[0]}
          </div>
        )}
        <FiChevronDown />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
