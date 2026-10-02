import type { Metadata } from "next";
import { AcademicsHomeClient } from "@/features/academics/components/academics-home";

export const metadata: Metadata = {
  title: "Academics | Learn Professional Skills",
  description:
    "Explore practical online courses on Smartera Hub Academics. Search topics, browse categories, and build career-ready skills.",
};

export default function AcademicsHomePage() {
  return <AcademicsHomeClient />;
}
