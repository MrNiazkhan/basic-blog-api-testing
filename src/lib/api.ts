import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse, Article, User } from "../types";


export const loginUser = async (email: string, password: string): Promise<ApiResponse<User>> => {
  await new Promise((res) => setTimeout(res, 1000)); 
  const user: User = {
    id: "1",
    name: "John Doe",
    email,      
    avatar: "/images/avatar.png",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    theme: "light",
    notifications: true,
  };

  return { success: true, data: user };
};

export const signupUser = async (name: string, email: string, password: string): Promise<ApiResponse<User>> => {
  await new Promise((res) => setTimeout(res, 1000));

  const newUser: User = {
    id: String(Date.now()),
    name,
    email,
    avatar: "/images/avatar.png",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    theme: "light",
    notifications: true,
  };

  return { success: true, data: newUser };
};


interface PlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const demoAuthor: User = {
  id: "1",
  name: "Demo Author",
  email: "demo@example.com",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  theme: "light",
  notifications: true,
};

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});


export const fetchArticles = async (): Promise<ApiResponse<Article[]>> => {
  try {
    const response = await apiClient.get<PlaceholderPost[]>("/posts");
    const originalPosts = response.data; 
    const data: Article[] = [];

   
    let counter = 1;
    while (data.length < 3000) {
      for (const item of originalPosts) {
        if (data.length >= 3000) break;
        const newId = counter++;
        data.push({
          id: String(newId),
          slug: `article-${newId}`,
          title: item.title + ` (${newId})`,
          summary: item.body.substring(0, 1000) + "...",
          content: item.body,
          author: demoAuthor,
          categories: ["General"],
          tags: ["demo", "placeholder"],
          coverImage: `https://picsum.photos/seed/${newId}/600/400`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          comments: [],
        });
      }
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("fetchArticles Error:", error);
    return { success: false, message: "Failed to fetch articles" };
  }
};


export const fetchArticleBySlug = async (slug: string): Promise<ApiResponse<Article>> => {
  try {
    const id = slug.replace("article-", "");
    const response = await apiClient.get<PlaceholderPost>(`/posts/${Number(id) % 100 || 1}`);
    const data: Article = {
      id,
      slug,
      title: response.data.title + ` (${id})`,
      summary: response.data.body.substring(0, 1000) + "...",
      content: response.data.body,
      author: demoAuthor,
      categories: ["General"],
      tags: ["single", "demo"],
      coverImage: `https://picsum.photos/seed/${id}/600/400`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };
    return { success: true, data };
  } catch (error: unknown) {
    console.error("fetchArticleBySlug Error:", error);
    return { success: false, message: "Article not found" };
  }
};


export const searchArticles = async (query: string): Promise<ApiResponse<Article[]>> => {
  try {
    const response = await apiClient.get<PlaceholderPost[]>("/posts");
    const originalPosts = response.data;

  
    const filtered: Article[] = [];
    let counter = 1;
    while (filtered.length < 3000) {
      for (const item of originalPosts) {
        if (filtered.length >= 3000) break;
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          const newId = counter++;
          filtered.push({
            id: String(newId),
            slug: `article-${newId}`,
            title: item.title + ` (${newId})`,
            summary: item.body.substring(0, 1000) + "...",
            content: item.body,
            author: demoAuthor,
            categories: ["Search"],
            tags: ["search", "demo"],
            coverImage: `https://picsum.photos/seed/${newId}/600/400`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            comments: [],
          });
        }
      }
    }

    return { success: true, data: filtered };
  } catch (error: unknown) {
    console.error("searchArticles Error:", error);
    return { success: false, message: "Search failed" };
  }
};


export const postData = async <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("postData Error:", error);
    return { success: false, message: "Request failed" };
  }
};
