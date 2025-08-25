"use client";

import { loginUser, signupUser } from "../../lib/api";
import { User } from "../../types";
export async function login(email: string, password: string): Promise<User> {
  const res = await loginUser(email, password);
  if (!res.success || !res.data) throw new Error(res.message || "Login failed");
  return res.data;
}

export async function signup(name: string, email: string, password: string): Promise<User> {
  const res = await signupUser(name, email, password);
  if (!res.success || !res.data) throw new Error(res.message || "Signup failed");
  return res.data;
}
