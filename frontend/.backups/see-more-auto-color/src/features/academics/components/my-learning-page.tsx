"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { CourseListControl } from "@/features/academics/components/course-list-control";
import { EmptyState } from "@/features/academics/components/empty-state";
import { StarIcon } from "@/features/academics/components/icons";
import { DEMO_STREAK } from "@/features/academics/data/mock-auth.data";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import { getCourseInstructor, getCoursesByIds } from "@/features/academics/services/course.service";
import { getProgressPercent } from "@/features/academics/services/store.service";
import type { Course, CourseList } from "@/features/academics/types/course.types";

const tabs = [
  "All courses",
  "My Lists",
  "Wishlist",
  "Certifications",
] as const;

type LearningTab = (typeof tabs)[number];

const emptyCopy: Record<
  Exclude<LearningTab, "All courses" | "Wishlist">,
  { title: string; description: string }
> = {
  "My Lists": {
    title: "No lists yet.",
    description: "Create course lists to organize what you want to learn next.",
  },
  Certifications: {
    title: "No certifications yet.",
    description: "Complete eligible courses to earn certificates you can showcase.",
  },
};

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M7.2 5.3a1 1 0 0 1 1.5-.85l7 4.7a1 1 0 0 1 0 1.7l-7 4.7a1 1 0 0 1-1.5-.85V5.3Z" />
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <path d="M12 3c2 3 1.5 5 .5 6.5C14 8 16 9.5 16 13a4 4 0 1 1-8 0c0-2.2 1.2-3.8 2.4-5C9.2 6.4 10 4.5 12 3Z" />
    </svg>
  );
}

function YourRating({ rating }: { rating?: number }) {
  const value = typeof rating === "number" ? rating : 0;
  return (
    <div className="text-right">
      <span className="flex items-center justify-end gap-0.5 text-[#F59223]" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} filled={index < Math.round(value)} className="h-3.5 w-3.5" />
        ))}
      </span>
      <p className="mt-0.5 text-[11px] text-slate-500">Your rating</p>
    </div>
  );
}

/** Compact learning card for the enrolled-course grid. */
function LearningCourseCard({
  course,
  percent,
  mode,
}: {
  course: Course;
  percent: number;
  mode: "learning" | "wishlist";
}) {
  const router = useRouter();
  const { beginCheckout } = useAcademicsStore();
  const instructor = getCourseInstructor(course);
  const href = mode === "wishlist" ? `/academics/courses/${course.slug}` : `/academics/learn/${course.id}`;

  const openCourse = () => {
    if (mode === "wishlist" && course.price > 0 && beginCheckout(course.id)) {
      router.push("/academics/checkout");
      return;
    }
    router.push(href);
  };

  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={openCourse}
        className="flex flex-1 flex-col rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
      >
        <div className="relative aspect-video overflow-hidden rounded-md bg-slate-100">
          <Image
            src={course.thumbnail}
            alt=""
            fill
            className="object-cover transition duration-200 group-hover:brightness-[0.97]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          <span
            className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1B519F] text-white shadow-sm transition-colors duration-200 group-hover:bg-[#174783]"
            title={mode === "learning" ? "Continue learning" : "View course"}
            aria-hidden="true"
          >
            <PlayIcon className="h-4 w-4" />
          </span>
          {instructor?.avatar ? (
            <span className="absolute -bottom-3 right-3 h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-sm">
              <Image src={instructor.avatar} alt="" width={32} height={32} className="h-full w-full object-cover" />
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <h2 className="line-clamp-2 text-[15px] font-bold leading-snug text-[#0B1F3A]">{course.title}</h2>
          <p className="mt-1.5 truncate text-xs text-slate-500">{instructor?.name ?? "Smartera Instructor"}</p>

          {mode === "learning" ? (
            <>
              <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#1B519F] transition-[width] duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-xs font-medium text-slate-600">{percent}% complete</p>
                <YourRating />
              </div>
            </>
          ) : (
            <p className="mt-3 text-xs font-semibold text-[#1B519F]">Saved to wishlist</p>
          )}
        </div>
      </button>
      {mode === "learning" ? <div className="mt-4"><CourseListControl courseId={course.id} /></div> : null}
    </article>
  );
}

/** Weekly learning motivation card (local UX only - not a backend streak system). */
function WeeklyStreakCard({ hasCourses }: { hasCourses: boolean }) {
  const weekLabel = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
    return `${fmt.format(start)} – ${fmt.format(end)}`;
  }, []);

  const circumference = 2 * Math.PI * 15;
  const minuteProgress = Math.min(1, DEMO_STREAK.weeklyMinutes / DEMO_STREAK.weeklyTargetMinutes);
  const dash = circumference * minuteProgress;

  return (
    <section className="rounded-xl border border-[#E5EAF1] bg-white px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[#0B1F3A]">
            {hasCourses ? "Start a weekly streak" : "Begin your learning streak"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Build a consistent learning habit this week.</p>
        </div>

        <div className="flex items-center gap-3 text-[#0B1F3A]">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF5FF] text-[#1B519F]">
            <FlameIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-base font-bold">{DEMO_STREAK.currentStreakWeeks} weeks</p>
            <p className="text-xs text-slate-500">Current streak</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0" role="img" aria-label="Weekly learning progress ring">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#E5EAF1" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#1B519F"
                strokeWidth="3"
                strokeDasharray={`${dash} ${circumference}`}
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#F59223]" aria-hidden="true" />
              {DEMO_STREAK.weeklyMinutes}/{DEMO_STREAK.weeklyTargetMinutes} course min
            </p>
            <p className="mt-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1B519F]" aria-hidden="true" />
              {DEMO_STREAK.weeklyVisits}/{DEMO_STREAK.weeklyVisitTarget} visit
            </p>
            <p className="mt-1.5 text-slate-400">{weekLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseListsPanel({ lists, onCreate, onDelete, onToggleCourse }: { lists: CourseList[]; onCreate: (name: string) => string; onDelete: (listId: string) => void; onToggleCourse: (listId: string, courseId: string) => void }) {
  const [name, setName] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    onCreate(cleanName);
    setName("");
  };

  return <section aria-label="Course lists">
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-lg border border-[#DCE6F3] bg-white p-4 shadow-[0_6px_20px_rgba(11,31,58,.04)] sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <label htmlFor="my-list-name" className="block text-sm font-bold text-[#0B1F3A]">Create a new list</label>
        <p className="mt-1 text-xs text-slate-500">Give your course collection a short, clear name.</p>
      </div>
      <input id="my-list-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} placeholder="Example: Learn next" className="h-11 min-w-0 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#0B1F3A] caret-[#1B519F] outline-none placeholder:text-slate-400 focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10 sm:max-w-md" />
      <button type="submit" disabled={!name.trim()} className="h-11 shrink-0 rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#174783] disabled:cursor-not-allowed disabled:opacity-50">Create list</button>
    </form>

    {lists.length ? <div className="mt-5 space-y-5">{lists.map((list) => {
      const courses = getCoursesByIds(list.courseIds);
      return <div key={list.id} className="rounded-lg border border-[#E5EAF1] bg-white p-4 shadow-[0_6px_20px_rgba(11,31,58,.04)] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF] text-sm font-black text-[#1B519F]" aria-hidden="true">{list.name.charAt(0).toUpperCase()}</span>
            <div className="min-w-0"><h3 className="truncate text-lg font-bold text-[#0B1F3A]">{list.name}</h3><p className="mt-0.5 text-xs font-medium text-slate-500">{courses.length} {courses.length === 1 ? "course" : "courses"}</p></div>
          </div>
          <button type="button" onClick={() => onDelete(list.id)} className="rounded-md px-2 py-1 text-xs font-bold text-[#B42318] underline decoration-transparent underline-offset-4 transition hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">Delete list</button>
        </div>
        {courses.length ? <ul tabIndex={0} aria-label={`${list.name} courses`} className="course-list-scroll mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">{courses.map((course) => <li key={course.id} className="group w-[86%] shrink-0 snap-start overflow-hidden rounded-lg border border-[#E5EAF1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#1B519F]/40 hover:shadow-[0_12px_28px_rgba(11,31,58,.10)] motion-reduce:transform-none motion-reduce:transition-none sm:w-[calc((100%-1rem)/2)] xl:w-[calc((100%-2rem)/3)]">
          <Link href={`/academics/courses/${course.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F59223]">
            <div className="relative aspect-video overflow-hidden bg-slate-100"><Image src={course.thumbnail} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition duration-300 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none" /></div>
            <div className="p-4"><p className="text-[11px] font-bold uppercase text-[#1B519F]">{course.category}</p><h4 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#0B1F3A]">{course.title}</h4></div>
          </Link>
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
            <Link href={`/academics/courses/${course.slug}`} className="text-xs font-bold underline decoration-transparent underline-offset-4 transition hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] hover:underline !border-0 !bg-transparent !text-black hover:!bg-transparent hover:!text-black">See More...</Link>
            <button type="button" onClick={() => onToggleCourse(list.id, course.id)} className="text-xs font-bold text-[#B42318] underline decoration-transparent underline-offset-4 transition hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">Remove</button>
          </div>
        </li>)}</ul> : <p className="mt-5 rounded-lg border border-dashed border-slate-300 bg-[#F8FAFC] p-5 text-sm text-slate-500">This list is empty. Open a course and choose Add to a list.</p>}
      </div>;
    })}</div> : <div className="mt-7 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center"><h3 className="font-bold text-[#0B1F3A]">No lists yet</h3><p className="mt-2 text-sm text-slate-500">Create your first list above, then add courses from any course detail page.</p></div>}
  </section>;
}

export function MyLearningPageClient() {
  const { state, createCourseList, deleteCourseList, toggleCourseInList } = useAcademicsStore();
  const [tab, setTab] = useState<LearningTab>("All courses");
  const enrolled = getCoursesByIds(state.enrolledIds);
  const wishlist = getCoursesByIds(state.wishlistIds);

  const courseList = tab === "All courses" ? enrolled : tab === "Wishlist" ? wishlist : [];
  const showCourseGrid = tab === "All courses" || tab === "Wishlist";
  const showStreak = tab === "All courses";
  const tabCounts: Record<LearningTab, number> = {
    "All courses": enrolled.length,
    "My Lists": state.courseLists.length,
    Wishlist: wishlist.length,
    Certifications: 0,
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F7F9FC] lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] flex-col bg-[#1B519F] text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/academics" className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-black text-[#1B519F]">S</span>
            <span><span className="block text-sm font-black">Smartera</span><span className="block text-xs text-white/55">Academics</span></span>
          </Link>
        </div>
        <div className="px-6 pb-4 pt-6"><p className="text-xs font-black uppercase text-[#F59223]">Dashboard</p><h1 className="mt-2 text-2xl font-black">My Learning</h1></div>
        <nav className="flex-1 px-3 py-2" role="tablist" aria-orientation="vertical" aria-label="My learning sections">
          {tabs.map((item) => {
            const selected = tab === item;
            return <button key={item} type="button" role="tab" aria-selected={selected} onClick={() => setTab(item)} style={{ outline: "none" }} className={`group relative flex min-h-12 w-full items-center justify-between gap-3 rounded-none border-0 px-4 text-left text-sm transition-colors duration-200 hover:bg-[#174783] hover:text-white focus-visible:bg-[#174783] focus-visible:text-white ${selected ? "bg-[#174783] font-black text-white before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:bg-[#F59223]" : "font-semibold text-white/80"}`}>
              <span>{item}</span><span className="inline-flex min-w-6 justify-center rounded-full bg-white/10 px-1.5 py-0.5 text-[11px] font-bold text-white/80 transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">{tabCounts[item]}</span>
            </button>;
          })}
        </nav>
        <div className="space-y-2 border-t border-white/10 p-4">
          <Link href="/academics" className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#F59223] px-3 text-sm font-black text-[#0B1F3A] transition hover:bg-[#FFA43A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Browse courses</Link>
          <Link href="/academics/profile" className="inline-flex min-h-10 w-full items-center justify-center text-sm font-bold text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">Profile settings</Link>
        </div>
      </aside>

      <div className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
        <div className="mb-6 lg:hidden"><h1 className="text-3xl font-black text-[#0B1F3A]">My Learning</h1></div>
        <div className="mb-7 flex gap-2 overflow-x-auto border-b border-[#DCE6F3] pb-3 lg:hidden" role="tablist" aria-label="My learning sections">
          {tabs.map((item) => {
            const selected = tab === item;
            return <button key={item} type="button" role="tab" aria-selected={selected} onClick={() => setTab(item)} className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] ${selected ? "border-[#1B519F] bg-[#1B519F] text-white" : "border-[#DCE6F3] bg-white text-[#334155]"}`}>{item}<span className={`ml-2 text-xs ${selected ? "text-white/75" : "text-slate-400"}`}>{tabCounts[item]}</span></button>;
          })}
        </div>

          <main className="mx-auto min-w-0 max-w-[1500px] space-y-8" aria-live="polite">
            <div className="border-b border-[#DCE6F3] pb-4">
              <h2 className="text-2xl font-black text-[#0B1F3A]">{tab}</h2>
              <p className="mt-1 text-sm text-slate-500">{tabCounts[tab]} {tab === "My Lists" ? "saved lists" : tab === "Certifications" ? "earned certificates" : "courses"}</p>
            </div>

            {showStreak ? <WeeklyStreakCard hasCourses={enrolled.length > 0} /> : null}

            {tab === "My Lists" ? <CourseListsPanel lists={state.courseLists} onCreate={createCourseList} onDelete={deleteCourseList} onToggleCourse={toggleCourseInList} /> : null}

            {tab === "Certifications" ? (
              <EmptyState title={emptyCopy[tab].title} description={emptyCopy[tab].description} actionHref="/academics" actionLabel="Browse courses" />
            ) : null}

            {showCourseGrid ? (
              courseList.length === 0 ? (
                <EmptyState title={tab === "Wishlist" ? "Your wishlist is empty." : "You haven't enrolled in any courses yet."} description={tab === "Wishlist" ? "Save courses from the marketplace to keep them here." : "Enroll from a course page or complete checkout from your cart."} actionHref="/academics" actionLabel="Browse courses" />
              ) : (
                <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
              {courseList.map((course) => {
                const total = course.sections.reduce((sum, section) => sum + section.lectures.length, 0);
                const progress = state.progress.find((item) => item.courseId === course.id);
                const percent = getProgressPercent(progress?.completedLectureIds.length ?? 0, total);
                return (
                  <LearningCourseCard
                    key={course.id}
                    course={course}
                    percent={percent}
                    mode={tab === "Wishlist" ? "wishlist" : "learning"}
                  />
                );
              })}
                </div>
              )
            ) : null}
          </main>
      </div>
    </div>
  );
}
