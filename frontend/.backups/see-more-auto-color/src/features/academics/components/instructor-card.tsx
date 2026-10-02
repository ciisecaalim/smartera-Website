import Image from "next/image";
import Link from "next/link";
import { StarRating } from "@/features/academics/components/star-rating";
import type { Instructor } from "@/features/academics/types/course.types";

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-[#E5EAF1] bg-white p-5 shadow-[0_8px_24px_rgba(11,31,58,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1B519F]/30 hover:shadow-[0_16px_36px_rgba(11,31,58,.11)] motion-reduce:transform-none">
      <div className="flex items-center gap-3">
        <Image src={instructor.avatar} alt="" width={56} height={56} className="h-14 w-14 rounded-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none" />
        <div>
          <h3 className="text-base font-bold text-[#0B1F3A]">{instructor.name}</h3>
          <p className="text-sm text-slate-500">{instructor.specialization}</p>
        </div>
      </div>
      <div className="mt-4">
        <StarRating rating={instructor.rating} />
      </div>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{instructor.bio}</p>
      <p className="mt-3 text-xs text-slate-500">
        {instructor.courseCount} courses | {instructor.studentCount.toLocaleString()} students
      </p>
      <Link
        href={`/academics/instructors/${instructor.id}`}
        className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] hover:underline !border-0 !bg-transparent !text-black hover:!bg-transparent hover:!text-black"
      >See More...</Link>
    </article>
  );
}
