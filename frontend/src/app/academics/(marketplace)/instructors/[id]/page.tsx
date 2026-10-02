import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseCard } from "@/features/academics/components/course-card";
import { StarRating } from "@/features/academics/components/star-rating";
import { getCourses, getInstructor } from "@/features/academics/services/course.service";

type InstructorPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: InstructorPageProps): Promise<Metadata> {
  const { id } = await params;
  const instructor = getInstructor(id);
  if (!instructor) return { title: "Instructor" };
  return {
    title: `${instructor.name} | Instructor`,
    description: instructor.bio,
  };
}

export default async function InstructorProfilePage({ params }: InstructorPageProps) {
  const { id } = await params;
  const instructor = getInstructor(id);
  if (!instructor) notFound();

  const courses = getCourses().filter((course) => course.instructorId === instructor.id);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-5 xl:px-6">
      <nav className="text-sm text-slate-500">
        <Link href="/academics" className="hover:text-[#1B519F]">Academics</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0B1F3A]">Instructor</span>
      </nav>

      <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-[#E5EAF1] bg-white p-6 sm:flex-row sm:items-start">
        <Image src={instructor.avatar} alt="" width={96} height={96} className="h-24 w-24 rounded-full" />
        <div>
          <h1 className="text-3xl font-black text-[#0B1F3A]">{instructor.name}</h1>
          <p className="mt-1 text-sm text-slate-500">{instructor.specialization}</p>
          <div className="mt-3">
            <StarRating rating={instructor.rating} />
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {instructor.courseCount} courses | {instructor.studentCount.toLocaleString()} students
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">{instructor.bio}</p>
        </div>
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-black text-[#0B1F3A]">Courses by {instructor.name}</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}


