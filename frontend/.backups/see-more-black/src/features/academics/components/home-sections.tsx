"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { InstructorCard } from "@/features/academics/components/instructor-card";
import { StarRating } from "@/features/academics/components/star-rating";
import { learningBenefits } from "@/features/academics/data/courses.data";
import { testimonials } from "@/features/academics/data/testimonials.data";
import type { Instructor } from "@/features/academics/types/course.types";
import { paginateItems } from "@/lib/pagination";

const INSTRUCTORS_PER_PAGE = 3;

export function FeaturedInstructors({ instructors }: { instructors: Instructor[] }) {
  const [page, setPage] = useState(1);
  const paginated = useMemo(() => paginateItems(instructors, page, INSTRUCTORS_PER_PAGE), [instructors, page]);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-[28px]">Learn from experienced instructors</h2>
        <p className="mt-2 text-sm text-slate-600">Sample instructor profiles for the Academics marketplace demo.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {paginated.items.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
      {paginated.totalPages > 1 ? <div className="flex flex-wrap items-center justify-center gap-4 [&>nav]:mt-0"><p className="text-sm font-bold text-slate-500">Current {paginated.items.length} / {INSTRUCTORS_PER_PAGE}</p><Pagination currentPage={paginated.page} totalPages={paginated.totalPages} onPageChange={setPage} ariaLabel="Featured instructors pagination" /></div> : null}
    </section>
  );
}

export function LearningBenefits() {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-[28px]">Why learn with Smartera Hub</h2>
        <p className="mt-2 text-sm text-slate-600">A practical learning experience designed for real skill building.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {learningBenefits.map((benefit) => (
          <div key={benefit.title} className="rounded-xl border border-[#E5EAF1] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B519F]/30 hover:shadow-[0_14px_30px_rgba(11,31,58,.09)] motion-reduce:transform-none">
            <h3 className="text-sm font-bold text-[#0B1F3A]">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="academics-testimonials space-y-5">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-[28px]">What learners say</h2>
        <p className="mt-2 text-sm text-slate-600">Short sample feedback from the Academics demo catalog.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {testimonials.map((item) => (
          <figure key={item.id} className="academics-testimonial-card rounded-xl border border-[#E5EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B519F]/30 hover:shadow-[0_14px_30px_rgba(11,31,58,.09)] motion-reduce:transform-none">
            <div className="flex items-center gap-3">
              <Image src={item.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
              <div>
                <figcaption className="academics-testimonial-name text-sm font-bold text-[#0B1F3A]">{item.name}</figcaption>
                <p className="academics-testimonial-course line-clamp-1 text-xs text-slate-500">{item.courseTitle}</p>
              </div>
            </div>
            <div className="mt-3">
              <StarRating rating={item.rating} />
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">“{item.quote}”</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function CertificateSection() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5EAF1] bg-gradient-to-br from-[#0B1F3A] via-[#1B519F] to-[#1B519F] px-6 py-10 text-white sm:px-10">
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl font-black tracking-tight sm:text-[32px]">Earn a certificate when you complete your course</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Showcase your progress with a professional completion credential you can add to your CV and share with employers.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-white/85">
            <li>• Completion certificate for finished courses</li>
            <li>• Shareable credential for LinkedIn and portfolios</li>
            <li>• Useful proof of practical skill development</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
          <div className="rounded-xl border border-dashed border-white/30 bg-white/5 px-5 py-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F59223]">Certificate of Completion</p>
            <p className="mt-4 text-2xl font-black">Smartera Hub Academics</p>
            <p className="mt-2 text-sm text-white/70">Presented for successful course completion</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessCta() {
  return (
    <section className="rounded-2xl border border-[#E5EAF1] bg-[#F7F9FC] px-6 py-10 sm:px-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-[28px]">Develop your team’s skills with Smartera Hub</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Give organizations structured learning paths, progress visibility, and practical training programs for teams.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <li>• Team learning programs</li>
            <li>• Employee progress tracking</li>
            <li>• Custom learning paths</li>
            <li>• Practical skills for work</li>
          </ul>
        </div>
        <Link
          href="/academics/business"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
        >
          Explore Smartera for Business
        </Link>
      </div>
    </section>
  );
}

export function InstructorCta() {
  return (
    <section className="rounded-2xl border border-[#E5EAF1] bg-white px-6 py-10 sm:px-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-[28px]">Teach on Smartera Hub</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Share your knowledge and help learners build practical skills through structured online courses.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#1B519F] px-5 text-sm font-bold text-[#1B519F] transition hover:bg-[#EEF5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
        >
          Become an Instructor
        </Link>
      </div>
    </section>
  );
}
