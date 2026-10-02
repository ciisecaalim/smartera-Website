"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState, type FormEvent } from "react";
import { useAcademicsAuth } from "@/features/academics/hooks/use-academics-auth";

export function AcademicsLoginPageClient() {
  const { login, isAuthenticated } = useAcademicsAuth();
  const router = useRouter();
  const params = useSearchParams();
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(() =>
    params.get("registered") === "1"
      ? {
          type: "success",
          message: "Student registration submitted successfully. Log in to view verification status.",
        }
      : null,
  );
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = params.get("redirect") || "/academics";
  const safeRedirect = redirectTo.startsWith("/academics") ? redirectTo : "/academics";

  useEffect(() => {
    if (isAuthenticated) router.replace("/student");
  }, [isAuthenticated, router, safeRedirect]);

  useEffect(() => {
    if (params.get("registered") === "1") {
      router.replace("/academics/login", { scroll: false });
    }
  }, [params, router]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    const result = await login(email.trim().toLowerCase(), password);
    if (!result.ok) {
      setToast({ type: "error", message: result.error });
      setSubmitting(false);
      return;
    }
    router.replace(result.status === "ACTIVE" && safeRedirect !== "/academics" ? safeRedirect : "/student");
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-3xl font-black tracking-tight text-[#0B1F3A]">Log in</h1>
      <p className="mt-2 text-sm text-slate-500">Access your Academics learning experience.</p>
      {toast ? <div role={toast.type === "error" ? "alert" : "status"} className={`fixed right-5 top-5 z-[100] max-w-sm rounded-xl px-5 py-4 font-bold text-white shadow-xl ${toast.type === "error" ? "bg-red-600" : "bg-emerald-600"}`}>{toast.message}</div> : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor={emailId} className="block text-sm font-semibold text-[#0B1F3A]">
            Email
          </label>
          <input
            id={emailId}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[#D0D5DD] px-3 py-2.5 text-sm text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            required
          />
        </div>
        <div>
          <label htmlFor={passwordId} className="block text-sm font-semibold text-[#0B1F3A]">
            Password
          </label>
          <input
            id={passwordId}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[#D0D5DD] px-3 py-2.5 text-sm text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#1B519F] px-4 text-sm font-bold text-white hover:bg-[#174783] disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/academics/signup" className="font-extrabold text-[#0B3B7A] underline decoration-2 decoration-[#0B3B7A] underline-offset-4 transition-colors hover:text-[#F59223] hover:decoration-[#F59223] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">
          Sign up
        </Link>
      </p>
    </div>
  );
}

