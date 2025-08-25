"use client";

import { fetchArticles } from "../../lib/api";
import { Article } from "../../types";


export async function getArticles(): Promise<Article[]> {
  const res = await fetchArticles();
  if (!res.success || !res.data) throw new Error(res.message || "Failed to fetch articles");
  return res.data;
}
