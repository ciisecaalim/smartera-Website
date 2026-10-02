"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getCurrentWebUser, loginWebUser, logoutWebUser } from "@/features/auth/services/web-auth.service";
import type { WebAuthUser } from "@/features/auth/types/web-auth.types";

type WebAuthContextValue = {
  user: WebAuthUser | null;
  resolving: boolean;
  login: (input: { email: string; password: string }) => Promise<WebAuthUser>;
  logout: () => Promise<void>;
  setUser: (user: WebAuthUser) => void;
};

const WebAuthContext = createContext<WebAuthContextValue | null>(null);

export function WebAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<WebAuthUser | null>(null);
  const [resolving, setResolving] = useState(true);

  useEffect(() => {
    getCurrentWebUser().then(setUser).catch(() => setUser(null)).finally(() => setResolving(false));
  }, []);

  const value = useMemo<WebAuthContextValue>(() => ({
    user,
    resolving,
    async login(input) { const result = await loginWebUser(input); setUser(result.user); return result.user; },
    async logout() { try { await logoutWebUser(); } finally { setUser(null); } },
    setUser,
  }), [resolving, user]);

  return <WebAuthContext.Provider value={value}>{children}</WebAuthContext.Provider>;
}

export function useWebAuth() {
  const context = useContext(WebAuthContext);
  if (!context) throw new Error("useWebAuth must be used within WebAuthProvider");
  return context;
}
