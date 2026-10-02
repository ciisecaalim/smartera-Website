import type { ReactNode } from "react";
export function InteractiveCard({ children }: { children: ReactNode }) {
  return <div className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-[#F59223]/40 hover:shadow-xl motion-reduce:transform-none">{children}</div>;
}



