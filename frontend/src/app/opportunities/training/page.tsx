import type { Metadata } from "next";

import {
  TrainingIntroSection,
  TrainingProgramsSection,
} from "@/features/training";

export const metadata: Metadata = {
  title: "SWE Program | Smartera Hub",
  description:
    "Explore the Smartera Workplace Essential Program, practical learning activities, and professional development opportunities.",
};

export default function TrainingActivitiesPage() {
  return (
    <>
      <TrainingIntroSection />
      <TrainingProgramsSection />
    </>
  );
}
