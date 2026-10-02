import type { Metadata } from "next";
import { Suspense } from "react";
import { AcademicsLoginPageClient } from "@/features/academics/components/login-page";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Smartera Hub Academics using your Web account.",
};

export default function AcademicsLoginPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center text-slate-500">Loading...</div>}>
      <AcademicsLoginPageClient />
    </Suspense>
  );
}
