import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  fetchHeroMedia,
  heroAssetUrl,
} from "@/features/hero-media/hero-media.data";

export async function SeekersHeroSection() {
  const media = await fetchHeroMedia("job-seekers");
  const image =
    heroAssetUrl(media?.imageUrl) ||
    "/images/opportunities/opportunities-hero.jpg";
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B1F3A] text-white lg:h-screen">
      <Image
        unoptimized
        src={image}
        alt={
          media?.imageAlt ||
          "Young professionals and graduates exploring career opportunities together"
        }
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#0B1F3A]/70" aria-hidden="true" />
      <Container className="relative flex h-full items-center">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase text-[#F59223]">
            Find the right people
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.04]">
            Job &amp; Internship Seekers
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Explore people seeking job and internship opportunities through
            Smartera Hub.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            Connect with candidates based on their skills, experience, field,
            and career goals.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#available-seekers"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#F59223] px-5 text-sm font-black text-[#0B1F3A] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Browse candidates
            </Link>
            <Link
              href="/contact?interest=candidate"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/70 px-5 text-sm font-black text-white transition hover:bg-white hover:text-[#1B519F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              Contact Smartera
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
