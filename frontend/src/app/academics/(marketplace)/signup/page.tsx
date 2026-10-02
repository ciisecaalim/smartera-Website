import type { Metadata } from "next";
import { AcademicsSignupPageClient } from "@/features/academics/components/signup-page";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Register a real Smartera Hub Academics Student account.",
};

export default function AcademicsSignupPage() {
  return <AcademicsSignupPageClient />;
}
