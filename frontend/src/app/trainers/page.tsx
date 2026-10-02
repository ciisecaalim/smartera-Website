import type { Metadata } from "next";

import {
  getPublishedTrainers,
  TrainersBrowser,
  TrainersHeroSection,
} from "@/features/trainers";

import { TrainerApplyCtaSection } from "@/features/trainers/components/trainer-apply-cta-section";

export const metadata: Metadata = {
  title: "Smartera Trainers | Smartera Hub",
  description:
    "Learn from experienced professionals who combine practical skills with real-world industry experience.",
};

export default async function TrainersPage() {
  const trainers = await getPublishedTrainers();

  return (
    <main className="trainers-surface min-h-screen">
      <TrainersHeroSection />

      <TrainersBrowser
        trainers={trainers || []}
        failed={trainers === null}
      />

      <TrainerApplyCtaSection />
    </main>
  );
}