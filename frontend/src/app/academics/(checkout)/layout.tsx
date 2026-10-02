import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

/** Minimal chrome for checkout - keeps learners focused on purchase steps. */
export default function AcademicsCheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-theme-root min-h-screen bg-white text-[#182230]">
      <header className="border-b border-[#E5EAF1] bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 lg:px-6">
          <Link
            href="/academics"
            className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
          >
            <Image src="/images/brand/logo-mark.png" alt="" width={36} height={36} className="object-contain" style={{ width: "36px", height: "auto" }} />
            <span className="text-[15px] font-black tracking-tight text-[#1B519F]">Smartera</span>
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
          <Link
            href="/academics/cart"
            className="text-sm font-bold text-[#1B519F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
          >
            Cancel
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
