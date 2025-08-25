// app/articles/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  body: string;
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.slug}`);
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return <p className="text-center mt-10">Loading article...</p>;
  }

  if (!article) {
    return <p className="text-center mt-10 text-red-600">Article not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-700">{article.body}</p>
    </div>
  );
}
