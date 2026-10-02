import type { Metadata } from "next";
import { MyLearningPageClient } from "@/features/academics/components/my-learning-page";
import { RequireAuth } from "@/features/academics/components/require-auth";

export const metadata: Metadata = {
  title: "My Learning",
  description: "Continue enrolled Academics courses and track demo progress.",
};

export default function MyLearningPage() {
  return (
    <RequireAuth>
      <MyLearningPageClient />
    </RequireAuth>
  );
}
