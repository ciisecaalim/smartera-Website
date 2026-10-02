import Image from "next/image";
import Link from "next/link";
import { seekerAsset } from "../data/seekers.data";
import type { Seeker } from "../types/seekers.types";
const label = (v: Seeker["seeking"]) =>
  v === "BOTH"
    ? "Employment & Internship"
    : v === "EMPLOYMENT"
      ? "Employment"
      : "Internship";
export function SeekerCard({ seeker }: { seeker: Seeker }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          unoptimized
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover"
          src={seekerAsset(seeker.profileImage)}
          alt={seeker.imageAlt}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#c66b08]">
          {label(seeker.seeking)}
        </span>
        <h2 className="mt-3 text-xl font-black text-[#1B519F]">
          {seeker.fullName}
        </h2>
        <p className="font-bold text-slate-700">{seeker.professionalTitle}</p>
        <p className="mt-1 text-sm text-slate-500">
          {seeker.specialization} · {seeker.location}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {seeker.yearsExperience}{" "}
          {seeker.yearsExperience === 1 ? "Year" : "Years"} Experience
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {seeker.skills.slice(0, 4).map((s) => (
            <li
              key={s}
              className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#1B519F]"
            >
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {seeker.shortBio}
        </p>
        <Link
          className="mt-auto pt-5 font-black text-[#1B519F] hover:underline"
          href={"/opportunities/seekers/" + seeker.slug}
        >
          View Profile 
        </Link>
      </div>
    </article>
  );
}
