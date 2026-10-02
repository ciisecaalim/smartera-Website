"use client";

import { useState } from "react";
import { ChevronIcon, PlayIcon } from "@/features/academics/components/icons";
import { formatMinutes, getSectionDurationMinutes } from "@/features/academics/services/course.service";
import type { Course } from "@/features/academics/types/course.types";

export function CourseCurriculum({ course }: { course: Course }) {
  const [openId, setOpenId] = useState<string | undefined>(course.sections[0]?.id);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-black text-[#0B1F3A]">Course content</h2>
        <p className="text-sm text-slate-500">
          {course.sections.length} sections | {course.totalLectures} lectures | {course.durationHours}h total
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#E5EAF1]">
        {course.sections.map((section) => {
          const open = openId === section.id;
          return (
            <div key={section.id} className="border-b border-[#E5EAF1] last:border-b-0">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? undefined : section.id)}
                className="flex w-full items-center justify-between gap-3 bg-[#F7F9FC] px-4 py-3 text-left transition hover:bg-[#EEF5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F59223]"
              >
                <span>
                  <span className="block text-sm font-bold text-[#0B1F3A]">{section.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {section.lectures.length} lectures | {formatMinutes(getSectionDurationMinutes(section))}
                  </span>
                </span>
                <ChevronIcon open={open} className="h-4 w-4 text-slate-500" />
              </button>
              {open ? (
                <ul className="divide-y divide-[#E5EAF1] bg-white">
                  {section.lectures.map((lecture) => (
                    <li key={lecture.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                      <span className="flex items-center gap-2 text-[#0B1F3A]">
                        <PlayIcon className="h-4 w-4 text-slate-400" />
                        {lecture.title}
                        {lecture.preview ? (
                          <span className="rounded bg-[#EEF5FF] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#1B519F]">
                            Preview
                          </span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-xs text-slate-500">{lecture.durationMinutes} min</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

