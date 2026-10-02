import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const domains = [
  ["Training", "Practical skills iyo professional development.", "/opportunities/training", "/images/training/training.jpg"],
  ["Jobs", "Published professional job opportunities.", "/opportunities/jobs", "/images/employment/employment.jpg"],
  ["Academics", "Online courses, skills iyo learning marketplace.", "/academics", "/images/academy/academy.jpg"],
  ["Internships", "Real-world exposure, projects iyo mentorship.", "/opportunities/internships", "/images/internships/internships.jpg"],
] as const;

export function OpportunitiesGridSection() {
  return <section id="opportunity-domains" className="scroll-mt-28 bg-white py-16 lg:py-20"><Container><SectionHeading eyebrow="Four Paths" title="Dooro fursadda ku habboon." description="Training, Jobs, Academics iyo Internships waxay kuu keenayaan waddo cad oo aad ku barato ama ku shaqayso." centered /><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{domains.map(([title, description, href, image]) => <Link key={title} href={href} className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"><div className="relative aspect-[16/10] overflow-hidden"><Image src={image} alt="" fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" /></div><div className="p-5"><h3 className="font-black text-[#1B519F]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p><span className="mt-4 inline-flex text-sm font-extrabold text-[#1B519F]">Explore <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></span></div></Link>)}</div></Container></section>;
}

