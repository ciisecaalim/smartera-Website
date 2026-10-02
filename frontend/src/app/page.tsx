import type { Metadata } from "next";

import {
  EmploymentPreviewSection,
  FinalCtaSection,
  HeroSection,
  ImpactSection,
  JourneySection,
  OpportunityCategoriesSection,
} from "@/features/home";

import { HomePartnersSection } from "@/features/partners";

export const metadata: Metadata = {
  title: "Smartera Hub",
  description:
    "Smartera Hub connects practical learning, career development and opportunities for future-ready professionals.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OpportunityCategoriesSection />
      <JourneySection />
      <ImpactSection />
      <EmploymentPreviewSection />
      <HomePartnersSection />
      <FinalCtaSection />
    </>
  );
}
