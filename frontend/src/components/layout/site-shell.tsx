"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

/**
 * Uses the global marketing chrome everywhere except Academics marketplace routes,
 * which provide their own header and footer treatment.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAcademics = pathname.startsWith("/academics");

  if (isAcademics) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
