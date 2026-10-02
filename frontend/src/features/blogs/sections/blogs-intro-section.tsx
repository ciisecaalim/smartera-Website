import Image from "next/image";
import Link from "next/link";

const topics = ["News", "Insights", "Success Stories", "Events"];

export function BlogsIntroSection() {
  return <section className="flex min-h-screen items-center bg-white px-4 py-8 sm:px-6 lg:h-screen lg:px-8">
    <div className="relative mx-auto min-h-[560px] w-full max-w-[1400px] overflow-hidden rounded-[28px] bg-[#061B49] shadow-[0_20px_50px_rgba(6,27,73,.16)] lg:h-[calc(100%-4rem)]">
      <Image
        src="/images/home/ict-team.jpg"
        alt="Smartera Hub team collaborating on news, insights, and public content"
        fill
        priority
        sizes="(max-width:1440px) 100vw,1400px"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B519F]/95 via-[#1B519F]/78 to-[#1B519F]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B519F]/70 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[560px] max-w-3xl flex-col justify-center p-6 text-white sm:p-8 lg:h-full lg:min-h-0 lg:p-10">
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => <span key={topic} className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em] text-blue-50 backdrop-blur-sm">{topic}</span>)}
        </div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-[.18em] text-[#FFD08F] sm:text-xs">Stories, knowledge and public updates</p>
        <h1 className="mt-3 text-[clamp(2.8rem,5vw,4.6rem)] font-black leading-[.95] tracking-[-.055em]">Blogs &amp; News</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-50 sm:text-[15px] sm:leading-7">Stay updated with the latest news, announcements, professional insights, success stories, events, and useful content from Smartera Hub.</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href="#blogs-listing" className="inline-flex h-11 items-center rounded-xl bg-white px-6 text-sm font-black text-[#1B519F] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#EEF5FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Explore Articles</Link>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden border-l border-t border-white/20 bg-white/10 px-8 py-5 text-white backdrop-blur-md lg:block">
        <p className="text-[9px] font-black uppercase tracking-[.15em] text-blue-100">Discover</p>
        <p className="mt-1 text-sm font-black">Ideas that support growth</p>
      </div>
    </div>
  </section>;
}

