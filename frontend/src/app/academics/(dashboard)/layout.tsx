import type { ReactNode } from "react";
import { AcademicsHeader } from "@/features/academics/components/academics-header";

export default function AcademicsDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-theme-root min-h-screen bg-[#F7F9FC] text-[#182230]">
      <AcademicsHeader />
      {children}
    </div>
  );
}
