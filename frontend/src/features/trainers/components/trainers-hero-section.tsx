import Image from "next/image";
import { Container } from "@/components/ui/container";
import { fetchHeroMedia, heroAssetUrl } from "@/features/hero-media/hero-media.data";

export async function TrainersHeroSection() {
  const media = await fetchHeroMedia("trainers");
  const image = heroAssetUrl(media?.imageUrl) || "/images/training/training-intro.jpg";

  return (
    <section className="relative isolate mt-0 min-h-screen overflow-hidden bg-[#0B2A4A] lg:h-screen lg:min-h-[660px]">
      {/* Background glow and subtle ambient radial gradients */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(27,81,159,0.9), transparent 35%), radial-gradient(circle at 85% 80%, rgba(245,146,35,0.22), transparent 30%), radial-gradient(circle at 50% 50%, rgba(11,42,74,0.8), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-px bg-white/10 lg:block"
        aria-hidden="true"
      />

      <Container className="grid min-h-screen items-center gap-0 py-16 lg:h-full lg:min-h-0 lg:grid-cols-[1.08fr_.92fr] lg:py-14">
        {/* Visual Hero Media Showcase */}
        <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/15 bg-[#1B519F] shadow-2xl transition duration-500 hover:border-white/25 sm:min-h-[460px] lg:h-[68vh] lg:max-h-[650px] lg:min-h-[500px]">
          <Image
            unoptimized
            src={image}
            alt={media?.imageAlt || "Smartera Hub professional trainers and instructors"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/90 via-[#0B2A4A]/20 to-transparent"
            aria-hidden="true"
          />

          {/* Floating Pill Highlight */}
          <div className="absolute left-6 top-6 hidden items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-4 py-1.5 backdrop-blur-md sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#F59223]" />
            <span className="text-xs font-bold tracking-wider text-white">
              INDUSTRY EXPERTS & MENTORS
            </span>
          </div>

          {/* Bottom Card Overlay */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#0B2A4A]/85 px-6 py-5 text-white backdrop-blur-md sm:px-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#F59223]" />
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#F59223]">
                Practical Mentorship
              </p>
            </div>
            <p className="mt-2 max-w-md text-sm leading-6 text-blue-100">
              Guiding learners through real-world software engineering practices, modern architectures, and career excellence.
            </p>
          </div>
        </div>

        {/* Editorial Content Card */}
        <div className="relative rounded-2xl bg-white px-7 py-10 shadow-[0_30px_90px_rgba(0,0,0,.25)] sm:px-12 sm:py-14 lg:-ml-8 lg:px-14 lg:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs font-bold text-slate-400">
            <span>Home</span>
            <span className="mx-2 text-slate-300">›</span>
            <span>SWE Program</span>
            <span className="mx-2 text-slate-300">›</span>
            <span className="text-[#1B519F]">Smartera Trainers</span>
          </nav>

          <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[.22em] text-[#1B519F]">
            <span className="h-0.5 w-9 bg-[#F59223]" aria-hidden="true" />
            Professional Instructors
          </p>

          <h1 className="mt-5 text-[clamp(2.3rem,4.2vw,4.2rem)] font-black leading-[1.04] tracking-[-.035em] text-[#0B2A4A]">
            Meet Our Trainers
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Learn from experienced professionals who combine practical skills with real-world industry experience.
          </p>

          {/* Feature Highlights */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#1B519F]/10 text-base text-[#1B519F]">
                💻
              </span>
              <span className="text-xs font-bold text-slate-800">
                Hands-On Code Practice
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F59223]/10 text-base text-[#F59223]">
                🎯
              </span>
              <span className="text-xs font-bold text-slate-800">
                1-on-1 Guidance & Feedback
              </span>
            </div>
          </div>

          {/* CTA Link */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <a
              href="#trainers-directory"
              className="group inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1B519F] px-7 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#153e77] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2"
            >
              Explore Trainer Directory
              <span
                className="ml-3 transition-transform group-hover:translate-y-1 motion-reduce:transform-none"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
