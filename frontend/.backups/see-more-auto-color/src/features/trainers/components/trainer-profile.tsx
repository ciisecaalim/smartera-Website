"use client";

import Image from "next/image";
import Link from "next/link";
import type { Trainer } from "../types/trainer.types";
import { trainerAsset } from "../data/trainers.data";
import { TrainerRequestForm } from "./trainer-request-form";

export function TrainerProfile({ trainer }: { trainer: Trainer }) {
  const links = [
    ["LinkedIn", ""],
    ["GitHub", ""],
    ["Portfolio", ""],
  ].filter((x): x is [string, string] => Boolean(x[1]));

  const canRequest =
    trainer.published !== false && trainer.messageFormOpen !== false;

  return (
    <main className="trainers-surface">
      <section className="bg-gradient-to-br from-[#071D3D] to-[#1B519F] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[260px_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-[28px] border-4 border-white/20">
            <Image
              unoptimized={trainerAsset(trainer.profileImage).startsWith(
                "http",
              )}
              src={trainerAsset(trainer.profileImage)}
              alt={trainer.imageAlt}
              fill
              priority
              sizes="260px"
              className="object-cover"
            />
          </div>
          <div className="self-center">
            <Link
              href="/trainers"
              className="text-xs font-bold text-orange-300 transition hover:text-orange-200"
            >
               All Trainers
            </Link>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl">
              {trainer.fullName}
            </h1>
            <p className="mt-2 text-xl font-bold text-blue-100">
              {trainer.professionalTitle}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">{trainer.specialization}</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">{trainer.yearsExperience}+ Years Experience</span>
            </div>
            {canRequest ? (
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("trainer-request")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#F59223] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition-all hover:bg-[#e0841c] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B519F]"
              >
                <span>📩</span> Request This Trainer
              </button>
            ) : null}
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-7">
          {trainer.fullBio ? (
            <Block title="About the Trainer">
              <div className="whitespace-pre-line text-sm leading-7 text-slate-600">
                {trainer.fullBio}
              </div>
            </Block>
          ) : null}
          <Block title="Expertise">
            <Tags values={trainer.skills} />
          </Block>
          <Block title="Training Areas">
            <Tags values={trainer.trainingAreas} />
          </Block>
          {trainer.experiences.length ? (
            <Block title="Professional Experience">
              <div className="space-y-5">
                {trainer.experiences.map((x) => (
                  <article
                    key={x.id}
                    className="border-l-2 border-[#F59223] pl-5"
                  >
                    <p className="text-xs font-bold text-slate-500">
                      {x.startYear} –{" "}
                      {x.isCurrent ? "Present" : x.endYear || ""}
                    </p>
                    <h3 className="mt-1 font-black text-[#1B519F]">
                      {x.jobTitle}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600">
                      {x.organization}
                      {x.location ? " • " + x.location : ""}
                    </p>
                    {x.description ? (
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {x.description}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </Block>
          ) : null}
          {trainer.educations.length ? (
            <Block title="Education">
              {trainer.educations.map((x) => (
                <Item
                  key={x.id}
                  title={x.qualification}
                  sub={
                    x.institution +
                    " • " +
                    [x.startYear, x.endYear].filter(Boolean).join(" – ")
                  }
                />
              ))}
            </Block>
          ) : null}
          {trainer.certifications.length ? (
            <Block title="Certifications">
              {trainer.certifications.map((x) => (
                <Item
                  key={x.id}
                  title={x.name}
                  sub={x.issuer + (x.year ? " • " + x.year : "")}
                  href={x.credentialUrl}
                />
              ))}
            </Block>
          ) : null}
        </div>
        <aside>
          <div className="trainer-card sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#1B519F]">
              Trainer at a Glance
            </h2>
            <dl className="mt-5 space-y-4">
              <Fact a="Specialization" b={trainer.specialization} />
              <Fact a="Experience" b={trainer.yearsExperience + "+ years"} />
            </dl>
            {links.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {links.map(([a, b]) => (
                  <a
                    key={a}
                    href={b}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-3 py-2 text-xs font-bold text-[#1B519F] transition hover:bg-blue-50"
                  >
                    {a}
                  </a>
                ))}
              </div>
            ) : null}
            {canRequest ? (
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("trainer-request")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#F59223] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#e0841c]"
              >
                📩 Request This Trainer
              </button>
            ) : null}
          </div>
        </aside>
      </div>
      <section className="bg-[#EEF5FF] px-4 py-12 text-center">
        <h2 className="text-2xl font-black text-[#1B519F]">
          Want to learn from our trainers?
        </h2>
        <Link
          href="/opportunities/training"
          className="mt-5 inline-flex rounded-xl bg-[#1B519F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#153e77]"
        >
          Explore SWE Program 
        </Link>
      </section>
      {canRequest ? (
        <section
          id="trainer-request"
          className="scroll-mt-24 bg-[#F6F9FD] px-4 py-14 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(8,43,87,.08)] lg:grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="bg-[#071D3D] p-7 text-white sm:p-9 lg:p-10">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#F59223]">
                Trainer Request
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                Request This Trainer
              </h2>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <p className="text-[9px] font-black uppercase tracking-[.16em] text-blue-100/50">
                  Selected Trainer
                </p>
                <p className="mt-2 text-lg font-black leading-7 text-white">
                  {trainer.fullName}
                </p>
                <p className="mt-1 text-sm font-semibold text-blue-100/75">
                  {trainer.professionalTitle}
                </p>
              </div>
              <p className="mt-6 text-sm leading-7 text-blue-100/75">
                Complete the request form and provide the information Smartera
                needs to understand your training interest.
              </p>
              <div className="mt-8 space-y-5 border-t border-white/10 pt-6 text-sm leading-6 text-blue-100/75">
                <p>
                  <strong className="text-white">Individuals</strong>
                  <br />
                  Request participation, guidance, or professional training
                  support.
                </p>
                <p>
                  <strong className="text-white">
                    Companies & Organizations
                  </strong>
                  <br />
                  Request training for staff, teams, or organizational
                  development.
                </p>
              </div>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#F59223]">
                Apply / Request Training
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#1B519F]">
                Request This Trainer
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                The selected trainer is already attached to this request.
              </p>
              <div className="mt-7">
                <TrainerRequestForm
                  trainerName={trainer.fullName}
                  trainerSlug={trainer.slug}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="trainer-card rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black text-[#1B519F]">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Tags({ values }: { values: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((x) => (
        <span
          key={x}
          className="rounded-lg bg-[#EEF5FF] px-3 py-2 text-sm font-bold text-[#1B519F]"
        >
          ✓ {x}
        </span>
      ))}
    </div>
  );
}

function Item({
  title,
  sub,
  href,
}: {
  title: string;
  sub: string;
  href?: string | null;
}) {
  return (
    <article>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{sub}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold hover:underline !border-0 !bg-transparent !text-black hover:!bg-transparent hover:!text-black"
        >See More...</a>
      ) : null}
    </article>
  );
}

function Fact({ a, b }: { a: string; b: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase text-slate-400">{a}</dt>
      <dd className="mt-1 font-bold text-slate-800">{b}</dd>
    </div>
  );
}
