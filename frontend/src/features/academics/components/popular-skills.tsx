import Link from "next/link";
import { popularSkills } from "@/features/academics/data/categories.data";

export function PopularSkills() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-[28px]">Popular Skills</h2>
        <p className="mt-2 text-sm text-slate-600">Jump into high-demand topics learners explore most.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {popularSkills.map((skill) => (
          <Link
            key={skill}
            href={`/academics/search?q=${encodeURIComponent(skill)}`}
            className="rounded-full border border-[#E5EAF1] bg-white px-4 py-2 text-sm font-semibold text-[#0B1F3A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B519F] hover:bg-[#EEF5FF] hover:text-[#1B519F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] motion-reduce:transform-none"
          >
            {skill}
          </Link>
        ))}
      </div>
    </section>
  );
}

