"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchArticles } from "../../lib/api";
import { Article } from "../../types";
import ArticleCard from "../../components/ArticleCard";

export default function DashboardPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"date" | "title">("date");

  useEffect(() => {
    const loadArticles = async () => {
      if (!user) return;
      const res = await fetchArticles();
      if (res.success && res.data) {
        const userArticles = res.data.filter(a => a.author.id === user.id);
        setArticles(userArticles);
        setVisibleArticles(userArticles.slice(0, itemsToShow));
      }
      setLoading(false);
    };
    loadArticles();
  }, [user]);

  const handleShowMore = () => {
    const nextItems = articles.slice(visibleArticles.length, visibleArticles.length + itemsToShow);
    setVisibleArticles([...visibleArticles, ...nextItems]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = articles.filter(a =>
      a.title.toLowerCase().includes(query) || a.summary.toLowerCase().includes(query)
    );
    setVisibleArticles(filtered.slice(0, itemsToShow));
  };

  const handleSortChange = (option: "date" | "title") => {
    setSortOption(option);
    const sorted = [...articles].sort((a, b) => {
      if (option === "date") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return a.title.localeCompare(b.title);
    });
    setVisibleArticles(sorted.slice(0, visibleArticles.length));
  };

  return (
    <main className="flex-1 p-8 lg:ml-0 space-y-8 bg-gray-50">
      {/* Welcome */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-700">This is your personal dashboard. Manage articles, profile, settings, and view stats here.</p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
          <p className="text-gray-500 text-sm mb-1">Total Articles</p>
          <h3 className="text-xl font-bold text-gray-900">{articles.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
          <p className="text-gray-500 text-sm mb-1">Profile Completeness</p>
          <h3 className="text-xl font-bold text-gray-900">87%</h3>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
          <p className="text-gray-500 text-sm mb-1">Notifications Enabled</p>
          <h3 className="text-xl font-bold text-gray-900">Yes</h3>
        </div>
      </section>

      {/* Search & Sort */}
      <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value as "date" | "title")}
          className="w-full md:w-1/4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </section>

      {/* Recent Articles */}
      <section className="space-y-4">
        {loading ? (
          <p className="text-gray-500">Loading your articles...</p>
        ) : visibleArticles.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {visibleArticles.length < articles.length && (
          <div className="mt-4 text-center">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Show More
            </button>
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center cursor-pointer">
          <h3 className="font-semibold text-gray-900 mb-1">Profile</h3>
          <p className="text-gray-600 text-sm">Update your profile info</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center cursor-pointer">
          <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
          <p className="text-gray-600 text-sm">Manage account settings</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center cursor-pointer">
          <h3 className="font-semibold text-gray-900 mb-1">Create Article</h3>
          <p className="text-gray-600 text-sm">Add a new article</p>
        </div>
      </section>
    </main>
  );
}
