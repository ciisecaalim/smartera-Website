import Link from "@/i18n/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ButtonLink({ href, children, variant = "primary", className }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "orange" | "ghost-dark"; className?: string }) {
  const variants = {
    primary: "bg-[#1B519F] text-white hover:bg-[#174783] shadow-[0_12px_26px_rgba(22,85,163,.18)]",
    secondary: "border border-[#1B519F]/20 bg-white text-[#1B519F] hover:border-[#F59223] hover:text-[#F59223]",
    orange: "bg-[#F59223] text-white hover:bg-[#F59223] shadow-[0_12px_26px_rgba(247,148,29,.18)]",
    "ghost-dark": "border border-white/25 bg-white/5 text-white hover:bg-white hover:text-[#1B519F]",
  } as const;
  return <Link href={href} className={cn("inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2.5 text-[13px] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 motion-reduce:transform-none", variants[variant], className)}>{children}</Link>;
}



