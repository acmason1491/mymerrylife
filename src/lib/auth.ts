import { createClient } from "./supabase/client";
import type { User } from "@supabase/supabase-js";

export async function login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: error.message };
    return { user: data.user, error: null };
  } catch {
    return { user: null, error: "網路錯誤，請稍後再試" };
  }
}

export async function register(name: string, email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return { user: null, error: error.message };
    return { user: data.user, error: null };
  } catch {
    return { user: null, error: "網路錯誤，請稍後再試" };
  }
}

export async function logout(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function getUser(): Promise<User | null> {
  const supabase = createClient();
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch {
    return null;
  }
}

export async function getUserName(): Promise<string | null> {
  const user = await getUser();
  return user?.user_metadata?.name ?? user?.email ?? null;
}
