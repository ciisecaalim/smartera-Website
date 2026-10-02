"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { PlayIcon } from "@/features/academics/components/icons";
import { PriceDisplay } from "@/features/academics/components/price-display";
import { StarRating } from "@/features/academics/components/star-rating";
import { WishlistButton } from "@/features/academics/components/wishlist-button";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import { getCourseInstructor } from "@/features/academics/services/course.service";
import type { Course } from "@/features/academics/types/course.types";
import { cn } from "@/lib/cn";

/** Marketplace course card with wishlist, badges, and desktop hover preview. */
export function CourseCard({ course, className, checkoutOnClick = false }: { course: Course; className?: string; checkoutOnClick?: boolean }) {
  const router = useRouter();
  const instructor = getCourseInstructor(course);
  const { addToCart, beginCheckout, enroll, isInCart, isEnrolled } = useAcademicsStore();
  const [hover, setHover] = useState(false);
  const href = `/academics/courses/${course.slug}`;
  const enrolled = isEnrolled(course.id);
  const inCart = isInCart(course.id);
  const isFree = course.price <= 0;

  const handleCourseClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!checkoutOnClick || isFree || enrolled) return;
    event.preventDefault();
    if (beginCheckout(course.id)) router.push("/academics/checkout");
  };

  return (
    <article
      className={cn("group relative flex h-full min-w-[260px] max-w-full flex-col", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={href}
        onClick={handleCourseClick}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E5EAF1] bg-white shadow-[0_8px_24px_rgba(11,31,58,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,31,58,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] motion-reduce:transform-none"
      >
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <Image
            src={course.thumbnail}
            alt=""
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1280px) 33vw, 280px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transform-none"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-[#0B1F3A]/0 opacity-0 transition group-hover:bg-[#0B1F3A]/25 group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1B519F] shadow-lg">
              <PlayIcon className="h-5 w-5" />
            </span>
          </span>
          {course.bestseller ? (
            <span className="absolute left-3 top-3 rounded-md bg-[#F59223] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
              Bestseller
            </span>
          ) : course.isNew ? (
            <span className="absolute left-3 top-3 rounded-md bg-[#1B519F] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
              New
            </span>
          ) : null}
          <span className="absolute right-3 top-3" onClick={(event) => event.preventDefault()}>
            <WishlistButton courseId={course.id} />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1B519F]">{course.subcategory}</p>
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-[#0B1F3A]">{course.title}</h3>
          <p className="text-xs text-slate-500">{instructor?.name ?? "Smartera Instructor"}</p>
          <StarRating rating={course.rating} reviewCount={course.reviewCount} />
          <div className="mt-auto pt-1">
            <PriceDisplay price={course.price} originalPrice={course.originalPrice} size="sm" />
          </div>
        </div>
      </Link>

      {hover ? (
        <div className="pointer-events-none absolute left-1/2 top-4 z-20 hidden w-[300px] -translate-x-1/2 rounded-xl border border-[#E5EAF1] bg-white p-4 shadow-[0_24px_60px_rgba(11,31,58,0.18)] lg:pointer-events-auto lg:block">
          <p className="text-sm font-bold text-[#0B1F3A]">{course.title}</p>
          <p className="mt-1 text-xs text-slate-500">
            Updated {course.lastUpdated} | {course.level}
          </p>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{course.shortDescription}</p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
            {course.skills.slice(0, 3).map((skill) => (
              <li key={skill}>• {skill}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {enrolled ? (
              <Link
                href={`/academics/learn/${course.id}`}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1B519F] px-3 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              >
                Continue learning
              </Link>
            ) : isFree ? (
              <button
                type="button"
                onClick={() => enroll(course.id)}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1B519F] px-3 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              >
                Enroll for Free
              </button>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(course.id)}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1B519F] px-3 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              >
                {inCart ? "Added to cart" : "Add to cart"}
              </button>
            )}
            <div className="flex gap-2">
              <Link
                href={href}
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] border-0 bg-transparent text-black hover:text-black hover:underline"
              >See More...</Link>
              <WishlistButton courseId={course.id} />
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
