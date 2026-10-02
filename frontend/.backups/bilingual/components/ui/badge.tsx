import type { ReactNode } from "react";
export function Badge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span data-theme-surface="eyebrow" className={`standard-eyebrow-badge inline-flex h-10 w-full max-w-[480px] items-center justify-center overflow-hidden rounded-full border border-[#F59223]/35 px-4 shadow-sm sm:max-w-[460px] ${dark ? "bg-white/10" : "bg-orange-50/95"}`}>
      <span data-theme-text="eyebrow" className="smartera-eyebrow-shimmer whitespace-nowrap text-[11px] font-extrabold uppercase tracking-[.14em]">
        {children}
      </span>
    </span>
  );
}
