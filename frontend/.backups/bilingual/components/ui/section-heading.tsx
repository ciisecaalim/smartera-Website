import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export function SectionHeading({ eyebrow, title, description, centered = false, dark = false }: { eyebrow: string; title: string; description?: string; centered?: boolean; dark?: boolean }) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      <Badge dark={dark}>{eyebrow}</Badge>
      <h2 className={cn("mt-5 text-[clamp(1.9rem,3vw,2.9rem)] font-black leading-[1.1] tracking-[-.02em]", dark ? "text-white" : "text-[#1B519F]")}>{title}</h2>
      {description ? <p className={cn("mt-5 text-sm leading-7 sm:text-base sm:leading-8", centered && "mx-auto max-w-2xl", dark ? "text-blue-100" : "text-slate-600")}>{description}</p> : null}
    </div>
  );
}



