"use client";

import { useMemo, useState } from "react";
import { CheckIcon } from "@/features/academics/components/icons";
import { VideoPlayer } from "@/features/academics/components/video-player";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import { getProgressPercent } from "@/features/academics/services/store.service";
import type { Course } from "@/features/academics/types/course.types";

const tabs = ["Overview", "Q&A", "Notes", "Announcements", "Reviews"] as const;

export function LearningPlayer({ course }: { course: Course }) {
  const { state, setLessonProgress, isEnrolled, enroll } = useAcademicsStore();
  const lectures = useMemo(() => course.sections.flatMap((section) => section.lectures), [course.sections]);
  const progress = state.progress.find((item) => item.courseId === course.id);
  const [lectureId, setLectureId] = useState(progress?.currentLectureId ?? lectures[0]?.id);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");

  const currentIndex = Math.max(0, lectures.findIndex((lecture) => lecture.id === lectureId));
  const current = lectures[currentIndex] ?? lectures[0];
  const completed = new Set(progress?.completedLectureIds ?? []);
  const percent = getProgressPercent(completed.size, lectures.length);

  if (!isEnrolled(course.id)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-[#0B1F3A]">Enroll to start learning</h1>
        <p className="mt-2 text-sm text-slate-600">This demo learning player unlocks after enrollment from the course page or cart.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => enroll(course.id)}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white"
          >
            Enroll for demo access
          </button>
        </div>
      </div>
    );
  }

  const goTo = (index: number, markComplete = false) => {
    const lecture = lectures[index];
    if (!lecture) return;
    setLectureId(lecture.id);
    setLessonProgress(course.id, lecture.id, markComplete);
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-bold sm:text-base">{course.title}</h1>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-white/70">Progress</p>
          <p className="text-sm font-bold">{percent}%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px]">
        <div className="bg-black">
          <VideoPlayer src={current?.videoUrl ?? course.previewVideo} poster={course.thumbnail} title={current?.title ?? course.title} className="rounded-none" />
          <div className="space-y-4 bg-white px-4 py-5 text-[#0B1F3A]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-black">{current?.title}</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={currentIndex <= 0}
                  onClick={() => goTo(currentIndex - 1)}
                  className="rounded-lg border border-[#E5EAF1] px-3 py-2 text-sm font-semibold disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => goTo(currentIndex, true)}
                  className="rounded-lg border border-[#1B519F] px-3 py-2 text-sm font-semibold text-[#1B519F]"
                >
                  Mark complete
                </button>
                <button
                  type="button"
                  disabled={currentIndex >= lectures.length - 1}
                  onClick={() => goTo(currentIndex + 1, true)}
                  className="rounded-lg bg-[#1B519F] px-3 py-2 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Next lecture
                </button>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Lesson details">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={tab === item}
                  onClick={() => setTab(item)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${tab === item ? "bg-[#1B519F] text-white" : "bg-[#F7F9FC] text-[#0B1F3A]"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-[#E5EAF1] bg-[#F7F9FC] p-4 text-sm leading-relaxed text-slate-600">
              {tab === "Overview" && course.shortDescription}
              {tab === "Q&A" && "Demo Q&A space. Future API integration can load learner questions here."}
              {tab === "Notes" && "Demo notes area for personal lesson notes."}
              {tab === "Announcements" && "No announcements in this demo course yet."}
              {tab === "Reviews" && "Open the course page to read sample learner reviews."}
            </div>
          </div>
        </div>

        <aside className="border-l border-white/10 bg-[#102844]">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-sm font-bold">Course content</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#F59223]" style={{ width: `${percent}%` }} />
            </div>
          </div>
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
            {course.sections.map((section) => (
              <div key={section.id} className="border-b border-white/10">
                <p className="px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white/60">{section.title}</p>
                <ul>
                  {section.lectures.map((lecture) => {
                    const active = lecture.id === current?.id;
                    const done = completed.has(lecture.id);
                    return (
                      <li key={lecture.id}>
                        <button
                          type="button"
                          onClick={() => goTo(lectures.findIndex((item) => item.id === lecture.id))}
                          className={`flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition ${active ? "bg-white/10" : "hover:bg-white/5"}`}
                        >
                          <span className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${done ? "border-[#F59223] bg-[#F59223] text-[#0B1F3A]" : "border-white/30"}`}>
                            {done ? <CheckIcon className="h-3.5 w-3.5" /> : null}
                          </span>
                          <span>
                            <span className="block font-semibold">{lecture.title}</span>
                            <span className="mt-0.5 block text-xs text-white/60">{lecture.durationMinutes} min</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
