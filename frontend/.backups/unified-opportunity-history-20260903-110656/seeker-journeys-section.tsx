/* eslint-disable @next/next/no-img-element */
import type { PublicSeekerJourney } from "../data/seeker-journeys.data";

export function SeekerJourneysSection({
  journeys,
}: {
  journeys: PublicSeekerJourney[] | null;
}) {
  return (
    <section className="bg-[#F5F9FF] py-14 sm:py-16" aria-labelledby="seeker-journeys-title">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#F59223]">
            Opportunity Journeys
          </p>
          <h2 id="seeker-journeys-title" className="mt-2 text-3xl font-black text-[#1B519F]">
            Job &amp; Internship Seeker Stories
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Follow the journeys and achievements of people pursuing employment and internship opportunities.
          </p>
        </div>

        {journeys === null ? (
          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-semibold text-slate-500">
            Seeker journeys are unavailable right now. Please try again shortly.
          </div>
        ) : journeys.length === 0 ? (
          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-dashed border-slate-300 bg-white px-5 py-5 text-center text-sm font-semibold text-slate-500">
            Job and internship seeker journeys will appear here soon.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {journeys.map((journey) => (
              <article key={journey.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {journey.imageUrl ? (
                  <img src={journey.imageUrl} alt="" className="h-52 w-full object-cover" />
                ) : null}
                <div className="p-6">
                  <h3 className="text-xl font-black text-[#1B519F]">{journey.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {journey.story}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}