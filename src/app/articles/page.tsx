// app/articles/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  body: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        // Free API for articles (JSONPlaceholder)
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading articles...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Latest Articles</h1>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <a href={`/articles/${article.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {article.title}
            </a>
            <p className="mt-2 text-gray-700">{article.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
