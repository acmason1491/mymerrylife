"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getUser, logout as authLogout } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  userName: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userName: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const u = await getUser();
    setUser(u);
    setUserName(u?.user_metadata?.name as string ?? u?.email ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await authLogout();
    setUser(null);
    setUserName(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userName, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
