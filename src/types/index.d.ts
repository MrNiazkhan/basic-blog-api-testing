export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;            
  role?: "admin" | "user";
  createdAt: string;
  updatedAt: string;
  theme?: "light" | "dark";    
  notifications?: boolean;     
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  author: User;
  categories: string[];
  tags?: string[];
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: string;
  replies?: Comment[];
  likes?: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void; // added
  loading: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface SearchResult {
  articles: Article[];
  total: number;
}

export interface DashboardStats {
  articlesCount: number;
  commentsCount: number;
  recentArticles: Article[];
}
