"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
         
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              KnowledgeSite
            </Link>
          </div>

         
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/articles" className="text-gray-700 hover:text-primary transition">
              Articles
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-primary transition">
              Dashboard
            </Link>

            <SearchBar />

            {!user && (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition"
                >
                  Signup
                </Link>
              </div>
            )}

            {user && <UserMenu />}
          </div>

         
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

   
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/articles"
            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Articles
          </Link>
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>

          {!user && (
            <>
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-white bg-primary hover:bg-blue-700 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}

          {user && <UserMenu mobile />}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
