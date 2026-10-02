import type { Metadata } from "next";
import { IctSolutionsPage } from "@/features/ict-solutions";

export const metadata: Metadata = {
  title: "ICT Solutions",
  description: "Professional ICT services designed to improve organizational operations, data, systems, and digital delivery.",
};

export default function IctPage() {
  return <IctSolutionsPage />;
}
