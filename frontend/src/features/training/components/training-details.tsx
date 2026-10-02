import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

import type { TrainingActivity } from "@/features/training/types/training.types";

import {
  formatTrainingDate,
  getParticipantDisplay,
} from "@/features/training/utils/training.utils";

import { TrainingGallery } from "./training-gallery";
import { TrainingInterestForm } from "./training-interest-form";
import { TrainingStatusBadge } from "./training-status-badge";

function ItemList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-black text-[#1B519F]">{title}</h2>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl bg-[#F7FAFF] p-3 text-sm text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function TextSection({ title, text }: { title: string; text?: string }) {
  if (!text?.trim()) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-black text-[#1B519F]">{title}</h2>

      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
        {text.split(/\r?\n\r?\n/).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function formatActivityTime(value?: string) {
  if (!value) return "";

  const [hours, minutes] = value.slice(0, 5).split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return value;

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(2000, 0, 1, hours, minutes));
}

function ActivityDateTime({ training }: { training: TrainingActivity }) {
  const startTime = formatActivityTime(training.startTime);
  const endTime = formatActivityTime(training.endTime);
  const time =
    startTime && endTime
      ? `${startTime} – ${endTime}`
      : startTime || endTime || "Time to be confirmed";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#F59223]">
        Date & Time
      </p>
      <h2 className="mt-1 text-xl font-black text-[#1B519F]">
        Activity Date and Time
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-[#F7FAFF] p-5">
          <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
            Date
          </p>
          <p className="mt-2 text-base font-black text-[#1B519F]">
            {formatTrainingDate(training)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-[#F7FAFF] p-5">
          <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
            Time
          </p>
          <p className="mt-2 text-base font-black text-[#1B519F]">{time}</p>
        </div>
      </div>
    </section>
  );
}
export function TrainingDetails({ training }: { training: TrainingActivity }) {
  const participants = getParticipantDisplay(training);

  const facilitators = training.facilitatorNames?.join(", ");

  const heroTitleLines =
    training.title === "AI Career Readiness Bootcamp 2026"
      ? ["AI Career Readiness", "Bootcamp 2026"]
      : undefined;

  const facts = [
    ["Status", training.status],
    ["Target Group", training.targetGroup],
    ["Participants", participants],
    ["Location", training.location],
    ["Training Type", training.trainingType],
    ["Facilitators", facilitators],
    ["Organizer", training.organizer],
    ["Partner", training.partnerName],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <>
      {/* =====================================================
          TRAINING DETAIL HERO
      ===================================================== */}
      <section className="bg-[#F5F9FF] py-7">
        <Container>
          <Link href="/opportunities/training" className="hidden">
            {null}
          </Link>

          <div
            className="
              grid
              overflow-hidden
              rounded-2xl
              border border-slate-200
              bg-white
              shadow-[0_18px_50px_rgba(8,43,87,.08)]
              transition-colors
              duration-500
              hover:bg-[#FFF7ED]
              lg:grid-cols-[1fr_1.05fr]
            "
          >
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <TrainingStatusBadge status={training.status} />

                <span className="text-[10px] font-black uppercase tracking-[.12em] text-[#1B519F]">
                  {training.trainingType}
                </span>
              </div>

              <h1
                className="
                  mt-5
                  text-[clamp(2rem,3.35vw,3rem)]
                  font-black
                  leading-tight
                  text-[#1B519F]
                "
              >
                {heroTitleLines
                  ? heroTitleLines.map((line) => (
                      <span key={line} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))
                  : training.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {training.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {training.messageFormOpen ? (
                  <a
                    href="#training-request"
                    className="
                      inline-flex
                      h-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#F59223]
                      px-5
                      text-xs
                      font-black
                      text-white
                      transition
                      hover:-translate-y-0.5
                      hover:bg-[#e0841c]
                    "
                  >
                    Request This Training
                  </a>
                ) : null}

                <Link
                  href="/contact"
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    rounded-xl
                    border border-slate-200
                    bg-white
                    px-5
                    text-xs
                    font-black
                    text-[#1B519F]
                    transition
                    hover:border-[#1B519F]
                  "
                >
                  Contact Smartera
                </Link>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden bg-[#DDEBFA] sm:min-h-[420px] lg:aspect-[4/3] lg:min-h-0">
              <Image
                src={training.coverImage}
                alt={training.coverImageAlt}
                unoptimized
                fill
                priority
                sizes="(max-width:1024px) 100vw,52vw"
                className="object-cover object-top transition duration-700 hover:scale-[1.02] hover:saturate-110"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          TRAINING CONTENT
      ===================================================== */}
      <section className="bg-[#FBFDFF] py-12">
        <Container className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <main className="space-y-6">
            <ActivityDateTime training={training} />

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                Training Overview
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {training.fullDescription ?? training.shortDescription}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                Topics Covered
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {training.topics.map((topic) => (
                  <span
                    key={topic}
                    className="
                        rounded-lg
                        bg-[#EEF5FF]
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-[#1B519F]
                      "
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                Training Gallery
              </h2>

              <div className="mt-5">
                <TrainingGallery images={training.galleryImages} />
              </div>
            </section>

            <ItemList title="Highlights" items={training.highlights} />

            <ItemList title="Outcomes" items={training.outcomes} />

            <ItemList title="Requirements" items={training.requirements} />

            <TextSection
              title="Additional Information"
              text={training.additionalInfo}
            />
          </main>

          <aside
            className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              lg:sticky
              lg:top-28
            "
          >
            <h2 className="text-lg font-black text-[#1B519F]">
              Training Information
            </h2>

            <dl className="mt-4 divide-y divide-slate-100">
              {facts.map(([label, value]) => (
                <div key={label} className="py-3">
                  <dt className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                    {label}
                  </dt>

                  <dd className="mt-1 text-sm font-bold text-[#1B519F]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {training.messageFormOpen ? (
              <a
                href="#training-request"
                className="
                  mt-6
                  flex
                  h-10
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F59223]
                  px-4
                  text-xs
                  font-black
                  text-white
                  transition
                  hover:bg-[#e0841c]
                "
              >
                Request Training
              </a>
            ) : null}
          </aside>
        </Container>
      </section>

      {/* =====================================================
          SELECTED TRAINING REQUEST FORM
      ===================================================== */}
      {training.messageFormOpen ? (
        <TrainingInterestForm
          trainingTitle={training.title}
          trainingSlug={training.slug}
        />
      ) : null}
    </>
  );
}
