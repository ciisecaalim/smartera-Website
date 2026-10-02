import Image from "next/image";
import Link from "@/i18n/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { h3 as Lh3, p as Lp, span as Lspan } from "@/i18n/elements";

const domains = [
  ["Academics", "Online courses, skills, and a practical learning marketplace.", "/academics", "/images/training/swe-program-hero.jpg"],
  ["Training", "Build practical skills and professional confidence.", "/opportunities/training", "/images/training/training-intro.jpg"],
  ["Internships", "Real-world exposure, projects, and mentorship.", "/opportunities/internships", "/images/internships/internships.jpg"],
  ["Jobs", "Published professional job opportunities.", "/opportunities/jobs", "/images/training/workplace-essentials.jpg"],
] as const;

export function OpportunitiesGridSection() {
  return (
    <section id="opportunity-domains" className="scroll-mt-28 bg-white py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow="Four Paths" title="Choose the opportunity that fits you." description="Academics, Training, Internships, and Jobs give you a clear path to learn, grow, or work." centered />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map(([title, description, href, image]) => (
            <Link key={title} href={href} className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">
              <div className="relative aspect-[16/10] overflow-hidden"><Image src={image} alt="" fill unoptimized sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" /></div>
              <div className="p-5"><Lh3 className="font-black text-[#1B519F]">{title}</Lh3><Lp className="mt-2 text-sm leading-6 text-slate-600">{description}</Lp><Lspan className="mt-4 inline-flex text-sm font-extrabold text-[#1B519F]">Read More...</Lspan></div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}