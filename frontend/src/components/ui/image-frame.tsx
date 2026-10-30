
import { div as Ldiv } from "@/i18n/elements";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function ImageFrame({ src, alt, priority = false, className, badge }: { src: string; alt: string; priority?: boolean; className?: string; badge?: string }) {
  return (
    <Ldiv className={cn("group relative min-w-0 overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_24px_70px_rgba(8,43,87,.14)]", className)}>
      <Image src={src} alt={alt} fill priority={priority} quality={90} sizes="(max-width: 1279px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055] motion-reduce:transform-none" />
      <Ldiv className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B519F]/28 via-transparent to-transparent" aria-hidden="true" />
      {badge ? <Ldiv className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/50 bg-white/90 px-4 py-3 text-xs font-extrabold text-[#1B519F] shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[80%]">{badge}</Ldiv> : null}
    </Ldiv>
  );
}



