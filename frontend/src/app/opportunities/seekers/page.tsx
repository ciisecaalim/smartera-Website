import type { Metadata } from "next";
import {
  SeekersExplorer,
  SeekersHeroSection,
  SeekerJourneysSection,
  getPublicSeekerJourneys,
  getPublishedSeekers,
} from "@/features/seekers";
export const metadata: Metadata = {
  title: "Job & Internship Seekers | Smartera Hub",
  description:
    "Discover skilled candidates ready for employment and internship opportunities.",
};
export default async function Page() {
  const [seekers, journeys] = await Promise.all([
    getPublishedSeekers(),
    getPublicSeekerJourneys(),
  ]);
  return (
    <>
      <SeekersHeroSection />
      {seekers === null ? (
        <section className="mx-auto max-w-3xl p-10 text-center">
          <h2 className="text-xl font-black text-[#1B519F]">
            We’re unable to load candidate profiles right now.
          </h2>
          <p className="mt-2">Please try again shortly.</p>
        </section>
      ) : (
        <SeekersExplorer seekers={seekers} />
      )}
      <SeekerJourneysSection journeys={journeys} />
    </>
  );
}
