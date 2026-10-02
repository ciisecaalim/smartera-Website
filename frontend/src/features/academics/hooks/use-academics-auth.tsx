"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useWebAuth } from "@/features/auth/hooks/use-web-auth";
import { resolveAvatarUrl } from "@/features/auth/services/web-auth.service";
import type { AcademicsNotification, AcademicsStudent } from "@/features/academics/types/auth.types";

type AcademicsAuthApi = {
  user: AcademicsStudent | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  notifications: AcademicsNotification[];
  login: (email: string, password: string) => Promise<{ ok: true; status?: string } | { ok: false; error: string }>;
  logout: () => Promise<void>;
  markNotificationsRead: () => void;
};

const AcademicsAuthContext = createContext<AcademicsAuthApi | null>(null);

export function AcademicsAuthProvider({ children }: { children: ReactNode }) {
  const { user: webUser, resolving, login: webLogin, logout } = useWebAuth();
  const student = useMemo<AcademicsStudent | null>(() => {
    if (!webUser?.capabilities.includes("STUDENT")) return null;
    const name = webUser.studentProfile?.fullName || webUser.profile?.fullName || webUser.email;
    const parts = name.trim().split(/\s+/);
    return {
      id: webUser.id,
      firstName: parts[0] || name,
      lastName: parts.slice(1).join(" "),
      email: webUser.email,
      initials: parts.map((part) => part[0]).slice(0, 2).join("").toUpperCase(),
      avatarDataUrl: resolveAvatarUrl(webUser.studentProfile?.avatarUrl || webUser.profile?.avatarUrl) || undefined,
      studentStatus: webUser.studentProfile?.status,
      role: "STUDENT",
      interests: [],
      recentlyViewedCourseIds: [],
    };
  }, [webUser]);
  const value = useMemo<AcademicsAuthApi>(() => ({
    user: student,
    hydrated: !resolving,
    isAuthenticated: Boolean(student),
    notifications: [],
    async login(email, password) {
      try {
        const authenticated = await webLogin({ email, password });
        if (!authenticated.capabilities.includes("STUDENT")) return { ok: false, error: "This account does not have Student access." };
        return { ok: true, status: authenticated.studentProfile?.status };
      }
      catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Invalid email or password." }; }
    },
    logout,
    markNotificationsRead() {},
  }), [logout, resolving, student, webLogin]);
  return <AcademicsAuthContext.Provider value={value}>{children}</AcademicsAuthContext.Provider>;
}

export function useAcademicsAuth() {
  const context = useContext(AcademicsAuthContext);
  if (!context) throw new Error("useAcademicsAuth must be used within AcademicsAuthProvider");
  return context;
}

export function useOptionalAcademicsUser(): AcademicsStudent | null { return null; }
