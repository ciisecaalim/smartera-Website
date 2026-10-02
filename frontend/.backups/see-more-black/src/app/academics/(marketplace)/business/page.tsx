import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smartera for Business",
  description: "Team learning and training programs with Smartera Hub Academics.",
};

export default function AcademicsBusinessPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1B519F]">Smartera for Business</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0B1F3A]">Develop your team’s skills with Smartera Hub</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Organizations can use Smartera Hub to structure team learning, practical training programs, and skill development pathways.
        This page prepares the Academics business experience for future integration with approved Training workflows.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-slate-600">
        <li>• Team learning and cohort-style programs</li>
        <li>• Employee progress visibility</li>
        <li>• Custom learning paths by role</li>
        <li>• Practical skills aligned to workplace needs</li>
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white">
          Contact for organizations
        </Link>
        <Link href="/opportunities/training" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#1B519F] px-5 text-sm font-bold text-[#1B519F]">
          Explore Training
        </Link>
      </div>
    </div>
  );
}

