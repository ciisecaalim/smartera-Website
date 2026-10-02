"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listPublicAcademyCourses, listStudentEnrollments, requestStudentCourse } from "@/features/auth/services/web-auth.service";
import type { PublicAcademyCourse, PublicStudentEnrollment } from "@/features/auth/types/web-auth.types";

type Toast = { type: "success" | "error"; message: string };

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<PublicAcademyCourse[]>([]);
  const [enrollments, setEnrollments] = useState<PublicStudentEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [busy, setBusy] = useState<string>();

  useEffect(() => {
    Promise.all([listPublicAcademyCourses(), listStudentEnrollments()])
      .then(([courseItems, enrollmentItems]) => { setCourses(courseItems); setEnrollments(enrollmentItems); })
      .catch((error) => setToast({ type: "error", message: error instanceof Error ? error.message : "Unable to load courses." }))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function request(courseId: string) {
    setBusy(courseId);
    try {
      const created = await requestStudentCourse(courseId);
      setEnrollments((items) => [created, ...items]);
      setToast({ type: "success", message: "Course request submitted successfully. You may request another course." });
    } catch (error) {
      setToast({ type: "error", message: error instanceof Error ? error.message : "Unable to request course." });
    } finally {
      setBusy(undefined);
    }
  }

  return <main id="main-content" className="mx-auto max-w-6xl px-4 py-14">
    <Link href="/student" className="text-sm font-black text-[#1B519F]"> Student Dashboard</Link>
    <h1 className="mt-5 text-4xl font-black text-[#1B519F]">Academy Courses</h1>
    <p className="mt-2 text-slate-600">Request any available course. A pending request for one course never blocks requests for other courses.</p>
    {toast ? <div role={toast.type === "error" ? "alert" : "status"} className={`fixed right-5 top-5 z-[100] max-w-sm rounded-xl px-5 py-4 font-bold text-white shadow-xl ${toast.type === "error" ? "bg-red-600" : "bg-emerald-600"}`}>{toast.message}</div> : null}
    {loading ? <p className="mt-8 text-slate-500">Loading courses...</p> : <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{courses.map((course) => {
      const existing = enrollments.find((item) => item.course.id === course.id);
      return <article key={course.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {course.imageUrl ? <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${course.imageUrl})` }} /> : <div className="grid h-44 place-items-center bg-slate-100 text-slate-400">No course image</div>}
        <div className="p-5"><h2 className="text-xl font-black text-[#1B519F]">{course.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{course.description || "Course details will be provided by the Academy."}</p><p className="mt-3 font-black text-slate-900">{course.monthlyFee ? `$${course.monthlyFee} monthly` : "Fee not configured"}</p><button disabled={Boolean(existing) || busy === course.id} onClick={() => request(course.id)} className="mt-5 w-full rounded-xl bg-[#1B519F] px-4 py-3 text-sm font-black text-white disabled:bg-slate-300">{existing ? `${existing.status} for this course` : busy === course.id ? "Submitting..." : "Request Course"}</button></div>
      </article>;
    })}</div>}
    {!loading && !courses.length ? <div className="mt-8 rounded-xl border border-dashed p-8 text-center"><p className="font-bold text-slate-700">No Academy courses are published yet.</p><p className="mt-2 text-sm text-slate-500">The Academy team must create a course, configure its monthly fee, and enable public visibility.</p></div> : null}
  </main>;
}
