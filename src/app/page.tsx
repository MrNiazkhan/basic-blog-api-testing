"use client";

import { useEffect, useState } from "react";
import { fetchArticles } from "../lib/api";
import { Article } from "../types";
import ArticleCard from "../components/ArticleCard";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetchArticles();
        if (res.success && res.data) {
          setArticles(res.data.slice(0, 6)); // Show 6 featured articles
        } else {
          setError("Failed to load articles.");
        }
      } catch (err) {
        setError("Something went wrong while fetching articles.");
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="space-y-12">
      
      <section className="bg-primary text-white rounded-lg p-8 md:p-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to KnowledgeSite</h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Explore articles, share knowledge, and grow your skills with our community.
        </p>
      </section>

    
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Featured Articles</h2>

        {loading && <p className="text-gray-500 animate-pulse">Loading articles...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && articles.length === 0 && (
          <p className="text-gray-500">No articles available right now. Check back later!</p>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
