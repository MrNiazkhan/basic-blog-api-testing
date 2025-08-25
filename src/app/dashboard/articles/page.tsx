"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Article } from "../../../types";
import { fetchArticles } from "../../../lib/api";
import ArticleCard from "../../../components/ArticleCard";

export default function DashboardArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(100);

  useEffect(() => {
    const getUserArticles = async () => {
      if (!user) return;
      const res = await fetchArticles();
      if (res.success && res.data) {
        const userArticles = res.data.filter((a: Article) => a.author.id === user.id);
        setArticles(userArticles);
        setVisibleArticles(userArticles.slice(0, itemsToShow));
      }
      setLoading(false);
    };
    getUserArticles();
  }, [user]);

  const handleShowMore = () => {
    const nextItems = articles.slice(visibleArticles.length, visibleArticles.length + 100);
    setVisibleArticles([...visibleArticles, ...nextItems]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Articles</h1>

      {loading ? (
        <p className="text-gray-500">Loading your articles...</p>
      ) : visibleArticles.length === 0 ? (
        <p className="text-gray-500">You have not published any articles yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {visibleArticles.length < articles.length && (
            <div className="mt-6 text-center">
              <button
                onClick={handleShowMore}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
