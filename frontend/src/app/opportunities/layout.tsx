import type { Metadata } from "next";

export const metadata: Metadata = { title: "Opportunities", description: "Explore training, jobs, internships, and professional opportunities." };

export default function OpportunitiesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
