"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    router.push(`/articles?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary"
    >
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 w-48 sm:w-64 md:w-80 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-primary px-4 py-2 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
