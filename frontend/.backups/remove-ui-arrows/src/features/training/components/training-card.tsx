import Image from "next/image";
import Link from "next/link";
import type { TrainingActivity } from "@/features/training/types/training.types";
import { TrainingStatusBadge } from "./training-status-badge";

/** Compact training preview; operational details remain on the dedicated detail page. */
export function TrainingCard({ training }: { training: TrainingActivity }) {
  return (
    <article className="training-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(8,43,87,.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F59223]/45 hover:bg-[#FFF7ED] hover:shadow-[0_22px_48px_rgba(8,43,87,.16)] motion-reduce:transform-none">
      <div className="training-card-media relative aspect-[3/2] overflow-hidden bg-slate-100">
        <Image
          src={training.coverImage}
          alt={training.coverImageAlt}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
          className="object-cover object-top transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-105 group-hover:saturate-110 motion-reduce:transform-none"
        />
        <div className="absolute left-3 top-3"><TrainingStatusBadge status={training.status} /></div>
      </div>

      <div className="relative flex flex-1 flex-col overflow-hidden p-4 before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-[#1B519F] before:transition-transform before:duration-700 before:ease-out group-hover:before:scale-y-100 motion-reduce:before:transition-none">
        {training.trainingType ? <p className="relative z-10 text-[10px] font-black uppercase tracking-[.12em] text-[#1B519F] transition-colors duration-500 group-hover:text-blue-100">{training.trainingType}</p> : null}
        <h2 className="relative z-10 mt-2 text-base font-black leading-5 text-[#1B519F] transition-colors duration-500 group-hover:text-white">{training.title}</h2>
        <p className="relative z-10 mb-4 mt-2 line-clamp-2 text-xs leading-5 text-slate-600 transition-colors duration-500 group-hover:text-blue-50">{training.shortDescription}</p>
        <Link
          href={`/opportunities/training/${training.slug}`}
          className="relative z-10 mt-auto inline-flex h-8 w-fit items-center justify-center rounded-lg border border-[#1B519F] px-3 text-[10px] font-black text-[#1B519F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1B519F] hover:text-white group-hover:border-white/70 group-hover:text-white group-hover:hover:bg-white group-hover:hover:text-[#1B519F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59223] motion-reduce:transform-none"
        >
          View Details <span className="ml-2" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
