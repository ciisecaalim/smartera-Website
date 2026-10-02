import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { fetchHeroMedia, heroAssetUrl } from "@/features/hero-media/hero-media.data";
import { IctIcon } from "../components/ict-icon";
import { IctProjectRequestForm } from "../components/ict-project-request-form";
import { TechnologyTabs } from "../components/technology-tabs";
import type { IctIconName } from "../types/ict-solutions.types";

const services: Array<{ title: string; description: string; icon: IctIconName; href: string; image: string; imageAlt: string }> = [
  { title: "Web Development", description: "Modern, responsive and SEO-friendly websites that represent your brand and engage your audience.", icon: "monitor", href: "/ict-solutions/web-development", image: "/images/ict-solutions/web-development.png", imageAlt: "Developer building and testing a responsive business website" },
  { title: "Mobile Apps & Websites", description: "We build fast, user-friendly mobile applications and websites tailored to your customers and business goals.", icon: "mobile", href: "/ict-solutions/web-applications", image: "/images/ict-solutions/mobile-web-development.png", imageAlt: "Software team building mobile applications and websites" },
  { title: "Management Systems", description: "Custom management systems to automate operations, manage teams and improve productivity.", icon: "layout", href: "/ict-solutions/web-applications", image: "/images/ict-solutions/ict-consultant.png", imageAlt: "ICT consultant planning a custom management system" },
  { title: "Business Automation", description: "Workflow automation that reduces manual tasks, saves time and improves efficiency.", icon: "process", href: "/ict-solutions/digital-transformation", image: "/images/home/ict-team.jpg", imageAlt: "Technology team designing automated business workflows" },
  { title: "Database Solutions", description: "Secure, scalable database design, development and management for reliable systems.", icon: "database", href: "/ict-solutions/database-data-solutions", image: "/images/ict-solutions/cloud-database-support.png", imageAlt: "Engineer managing secure cloud databases" },
  { title: "API Development", description: "Secure and well-documented APIs that connect your systems and extend functionality.", icon: "mobile", href: "/ict-solutions/web-applications", image: "/images/ict-solutions/api-development.png", imageAlt: "Backend engineer designing secure API integrations" },
  { title: "Deployment & Hosting", description: "Fast, secure and reliable deployment for your systems and applications.", icon: "cloud", href: "/ict-solutions/hosting-deployment", image: "/images/ict-solutions/ict-operations-hero.png", imageAlt: "ICT infrastructure prepared for application deployment and hosting" },
  { title: "Technical Support", description: "Ongoing technical support that keeps your essential systems running smoothly.", icon: "support", href: "/ict-solutions/it-support", image: "/images/ict-solutions/technical-support.png", imageAlt: "Technical support specialist helping a business customer" },
  { title: "System Maintenance", description: "Regular updates, backups and optimization that keep your systems healthy.", icon: "shield", href: "/ict-solutions/system-security", image: "/images/ict-solutions/system-maintenance.png", imageAlt: "Systems engineer performing secure server maintenance" },
];

const values: Array<[string, string, IctIconName]> = [
  ["Custom Solutions", "Solutions tailored to your unique needs and business goals.", "layout"],
  ["Modern Technology", "Modern tools and proven practices for scalable, secure systems.", "monitor"],
  ["Ongoing Support", "Continuous support to ensure your systems run smoothly.", "support"],
  ["Business-Focused Approach", "Real value that drives growth and operational efficiency.", "chart"],
];

const process: Array<[string, string, string, IctIconName]> = [
  ["1", "Discover", "We understand your challenges, goals and requirements.", "users"],
  ["2", "Plan", "We plan the solution, resources and timeline for success.", "briefcase"],
  ["3", "Design", "We design intuitive, user-friendly and scalable solutions.", "layout"],
  ["4", "Develop", "We build robust, secure and high-performing systems.", "monitor"],
  ["5", "Test", "We test thoroughly for quality, security and reliability.", "check"],
  ["6", "Deploy & Support", "We deploy and provide support for long-term success.", "cloud"],
];

const eyebrow = "text-center text-[11px] font-black uppercase tracking-[.16em] text-[#F59223]";

export async function IctSolutionsPage() {
  const media = await fetchHeroMedia("ict-solutions");
  const heroImage = heroAssetUrl(media?.imageUrl) || "/images/ict-solutions/ict-operations-hero.png";
  return <>
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#10213B] text-white lg:h-screen">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(27,81,159,.65),transparent_46%)]" />
      <Container className="relative grid w-full items-center gap-10 py-12 sm:py-16 lg:grid-cols-[.85fr_1.15fr] lg:py-20">
        <div className="z-10">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[#F59223]">ICT Solutions</p>
          <h1 className="mt-4 max-w-[13ch] text-4xl font-black leading-[1.08] tracking-[-.04em] sm:text-5xl lg:text-6xl">Innovative ICT Solutions for a Smarter Future</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80">We design, develop and support digital solutions that help businesses and organizations work smarter, grow faster and create a greater impact.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#request-solution" className="rounded-lg bg-[#F59223] px-6 py-3 text-sm font-black text-white transition hover:bg-[#D97808]">Request a Solution <span aria-hidden="true">-&gt;</span></Link>
            <Link href="#ict-services" className="rounded-lg border border-white/70 px-6 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#10213B]">Our Services</Link>
          </div>
        </div>
        <div className="relative min-h-[330px] overflow-hidden rounded-[28px] border border-white/10 lg:min-h-[440px]">
          <Image unoptimized src={heroImage} alt={media?.imageAlt || "Smartera Hub ICT solutions and digital infrastructure"} fill priority sizes="(max-width:1024px) 100vw,55vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10213B]/45 to-transparent" />
        </div>
      </Container>
    </section>

    <section id="ict-services" className="scroll-mt-28 bg-white py-16 lg:py-20">
      <Container>
        <p className={eyebrow}>Our ICT Services</p>
        <h2 className="mt-2 text-center text-3xl font-black tracking-[-.03em] text-[#10213B] sm:text-4xl">Solutions that power your business</h2>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <Link key={service.title} href={service.href} className="group flex min-h-[410px] flex-col overflow-hidden rounded-2xl border border-[#1B519F]/15 bg-white shadow-[0_8px_24px_rgba(27,81,159,.07)] transition hover:-translate-y-1.5 hover:border-[#1B519F]/35 hover:shadow-[0_16px_36px_rgba(27,81,159,.14)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#EAF1FA]">
              <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-[#1B519F] shadow-lg backdrop-blur"><IctIcon name={service.icon} /></span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-black text-[#10213B]">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#475569]">{service.description}</p>
              <span className="mt-auto pt-5 text-xs font-black text-[#1B519F]">Learn More <span aria-hidden="true">-&gt;</span></span>
            </div>
          </Link>)}
        </div>
      </Container>
    </section>

    <section className="bg-[#F7FAFE] py-16">
      <Container>
        <p className={eyebrow}>Technologies We Use</p>
        <h2 className="mt-2 text-center text-3xl font-black tracking-[-.03em] text-[#10213B]">Modern technologies for powerful solutions</h2>
        <TechnologyTabs />
      </Container>
    </section>

    <section className="bg-white py-16">
      <Container>
        <p className={eyebrow}>Why Choose Smartera Hub ICT</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {values.map(([title, description, icon]) => <article key={title} className="rounded-2xl border border-[#1B519F]/15 bg-white p-5 shadow-[0_8px_24px_rgba(27,81,159,.06)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F6FC] text-[#1B519F]"><IctIcon name={icon} className="h-5 w-5" /></span>
            <h3 className="mt-4 text-sm font-black text-[#10213B]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#475569]">{description}</p>
          </article>)}
        </div>
      </Container>
    </section>

    <section className="bg-[#F7FAFE] py-16">
      <Container>
        <p className={eyebrow}>How We Work</p>
        <ol className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-5 hidden border-t-2 border-dashed border-[#1B519F]/35 lg:block" />
          {process.map(([number, title, description, icon]) => <li key={number} className="relative z-10 text-center">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#1B519F] text-sm font-black text-white">{number}</span>
            <span className="mx-auto mt-3 block text-[#1B519F]"><IctIcon name={icon} className="mx-auto h-6 w-6" /></span>
            <h3 className="mt-2 text-sm font-black text-[#10213B]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#475569]">{description}</p>
          </li>)}
        </ol>
      </Container>
    </section>

    <section id="request-solution" className="scroll-mt-28 bg-white pb-16 pt-6">
      <Container>
        <div className="mb-10 grid overflow-hidden rounded-2xl border border-[#1B519F]/15 bg-[#F7FAFE] md:grid-cols-3">
          {[
            ["Reliable & Secure", "We build secure, reliable and compliant digital solutions.", "shield"],
            ["On-time Delivery", "We deliver quality solutions on time, every time.", "process"],
            ["Support & Maintenance", "Continuous support and maintenance you can trust.", "support"],
          ].map(([title, text, icon], index) => <div key={title} className={`flex gap-4 p-5 ${index ? "md:border-l md:border-[#1B519F]/15" : ""}`}><span className="text-[#1B519F]"><IctIcon name={icon as IctIconName} /></span><div><h3 className="text-sm font-black text-[#10213B]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#475569]">{text}</p></div></div>)}
        </div>
        <div className="overflow-hidden rounded-[28px] bg-[#10213B] shadow-[0_20px_55px_rgba(16,33,59,.18)] lg:grid lg:grid-cols-[.72fr_1.28fr]">
          <div className="relative flex min-h-96 flex-col justify-between overflow-hidden p-8 text-white lg:p-10">
            <div className="relative z-10"><p className="text-xs font-black uppercase tracking-[.16em] text-[#F59223]">Start Your Project</p><h2 className="mt-3 text-3xl font-black">Request a Solution</h2><p className="mt-3 max-w-sm text-sm leading-6 text-white/75">Tell us about your project and our team will help you bring your ideas to life.</p></div>
            <Image src="/images/ict-solutions/ict-consultant.png" alt="Smartera Hub ICT consultant ready to discuss a project" width={716} height={716} className="mt-8 w-full max-w-sm self-center rounded-2xl object-cover" />
          </div>
          <div className="bg-[#F7FAFE] p-6 sm:p-8 lg:p-10"><IctProjectRequestForm /></div>
        </div>
      </Container>
    </section>
  </>;
}



