import Image from "next/image";
import Link from "next/link";
import { seekerAsset } from "../data/seekers.data";
import type { Seeker } from "../types/seekers.types";

export function SeekerCard({ seeker }: { seeker: Seeker }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white text-black">
      <div className="relative h-40 shrink-0 bg-slate-100">
        <Image
          unoptimized
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
          className="object-cover"
          src={seekerAsset(seeker.profileImage)}
          alt={seeker.imageAlt || seeker.fullName}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-base font-semibold leading-6 text-black">
          {seeker.fullName}
        </h2>
        <p className="mt-1 text-sm leading-5 text-black">
          {seeker.professionalTitle}
          {seeker.location ? ` · ${seeker.location}` : ""}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-black">
          {seeker.shortBio}
        </p>
        <Link
          className="mt-auto self-start pt-3 text-sm font-medium text-black underline underline-offset-4 hover:no-underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          href={"/opportunities/seekers/" + seeker.slug}
          aria-label={`Read More... about ${seeker.fullName}`}
        >
          Read More...
        </Link>
      </div>
    </article>
  );
}
