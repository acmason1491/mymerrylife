import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (cachedClient) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    // Return a client that can't actually query (fall through to localStorage)
    cachedClient = createSupabaseClient("https://placeholder.supabase.co", "placeholder");
    return cachedClient;
  }
  cachedClient = createSupabaseClient(url, key);
  return cachedClient;
}
