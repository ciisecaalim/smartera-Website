"use client";

import { useState, type FormEvent } from "react";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";

/** Local-only list manager used to demonstrate course organization without a backend. */
export function CourseListControl({ courseId }: { courseId: string }) {
  const { state, createCourseList, toggleCourseInList } = useAcademicsStore();
  const [name, setName] = useState("");
  const includedInAnyList = state.courseLists.some((list) => list.courseIds.includes(courseId));

  const create = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    const listId = createCourseList(cleanName);
    toggleCourseInList(listId, courseId);
    setName("");
  };

  if (includedInAnyList) {
    return (
      <div
        role="status"
        className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-700"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4">
          <path d="m4 10 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Added to My Lists
      </div>
    );
  }

  return (
    <details className="rounded-lg border border-[#D0D5DD] bg-white">
      <summary className="cursor-pointer list-none px-4 py-3 text-center text-sm font-bold text-[#1B519F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">Add to a list</summary>
      <div className="border-t border-slate-200 p-4">
        {state.courseLists.length ? <div className="space-y-2">{state.courseLists.map((list) => {
          const included = list.courseIds.includes(courseId);
          return <label key={list.id} className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#F7F9FC] px-3 py-2.5 text-sm font-semibold text-[#0B1F3A]">
            <input type="checkbox" checked={included} onChange={() => toggleCourseInList(list.id, courseId)} className="h-4 w-4 accent-[#1B519F]" />
            <span className="min-w-0 flex-1 truncate">{list.name}</span>
          </label>;
        })}</div> : <p className="text-xs leading-5 text-slate-500">No lists yet. Create one below and this course will be added automatically.</p>}

        <form onSubmit={create} className="mt-3 flex gap-2">
          <label htmlFor={`new-list-${courseId}`} className="sr-only">New list name</label>
          <input id={`new-list-${courseId}`} value={name} onChange={(event) => setName(event.target.value)} maxLength={60} placeholder="New list name" className="h-10 min-w-0 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#0B1F3A] caret-[#1B519F] outline-none placeholder:text-slate-400 focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10" />
          <button type="submit" disabled={!name.trim()} className="h-10 rounded-lg bg-[#1B519F] px-3 text-xs font-bold text-white transition-colors hover:bg-[#174783] disabled:cursor-not-allowed disabled:opacity-50">Create</button>
        </form>
      </div>
    </details>
  );
}
