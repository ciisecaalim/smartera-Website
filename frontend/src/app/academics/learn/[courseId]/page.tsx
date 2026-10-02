import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearningPlayer } from "@/features/academics/components/learning-player";
import { RequireAuth } from "@/features/academics/components/require-auth";
import { getCourseById } from "@/features/academics/services/course.service";

type LearnPageProps = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  if (!course) return { title: "Learning" };
  return {
    title: `Learning | ${course.title}`,
    description: `Continue learning ${course.title} on Smartera Hub Academics.`,
  };
}

export default async function LearnCoursePage({ params }: LearnPageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  if (!course) notFound();
  return (
    <RequireAuth>
      <LearningPlayer course={course} />
    </RequireAuth>
  );
}
