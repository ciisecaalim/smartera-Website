import type { Metadata } from "next";

import { TrainerApplicationForm } from "@/features/trainers/components/trainer-application-form";

export const metadata: Metadata = {
  title: "Apply as a Trainer | Smartera Hub",
  description:
    "Apply to join Smartera Hub as a professional trainer.",
};

export default function TrainerApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <TrainerApplicationForm />
        </div>
      </section>
    </main>
  );
}