import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { seekerAsset } from "../data/seekers.data";
import type { Seeker } from "../types/seekers.types";
import { SeekerMessageForm } from "./seeker-message-form";
const seeking = (v: Seeker["seeking"]) =>
  v === "BOTH"
    ? "Employment & Internship"
    : v === "EMPLOYMENT"
      ? "Employment"
      : "Internship";
export function SeekerProfile({ seeker }: { seeker: Seeker }) {
  const links = [
    ["LinkedIn", seeker.linkedinUrl],
    ["GitHub", seeker.githubUrl],
    ["Portfolio", seeker.portfolioUrl],
  ];
  return (
    <>
      <section className="bg-[#F5F9FF] py-9 dark:bg-slate-900">
        <Container>
          <Link
            href="/opportunities/seekers"
            className="font-bold text-[#1B519F] dark:text-blue-300"
          >
             Back to candidates
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-36 w-36 overflow-hidden rounded-xl">
              <Image
                unoptimized
                fill
                priority
                className="object-cover"
                src={seekerAsset(seeker.profileImage)}
                alt={seeker.imageAlt}
              />
            </div>
            <div>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">
                {seeking(seeker.seeking)}
              </span>
              <h1 className="mt-3 text-4xl font-black text-[#1B519F] dark:text-blue-300">
                {seeker.fullName}
              </h1>
              <p className="mt-1 text-lg font-bold text-slate-700 dark:text-slate-200">
                {seeker.professionalTitle}
              </p>
              <p className="mt-2 text-slate-500">
                {seeker.specialization} · {seeker.location} ·{" "}
                {seeker.yearsExperience} years experience
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#FBFDFF] py-10 dark:bg-slate-950">
        <Container className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <main className="space-y-6">
            <Block title="About">
              <div className="whitespace-pre-line leading-7 text-slate-600 dark:text-slate-300">
                {seeker.fullBio || seeker.shortBio}
              </div>
            </Block>
            <Block title="Skills & Expertise">
              <Tags values={seeker.skills} />
            </Block>
            <Block title="Preferred Opportunities">
              <p>
                <b>Seeking:</b> {seeking(seeker.seeking)}
              </p>
              {seeker.availability ? (
                <p className="mt-2">
                  <b>Availability:</b> {seeker.availability}
                </p>
              ) : null}
              <div className="mt-4">
                <Tags values={seeker.preferredAreas} />
              </div>
            </Block>
            {seeker.experiences.length ? (
              <Block title="Professional Experience">
                <div className="space-y-5">
                  {seeker.experiences.map((x) => (
                    <article
                      key={x.id}
                      className="border-l-2 border-blue-200 pl-4"
                    >
                      <h3 className="font-black">{x.jobTitle}</h3>
                      <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {x.organization}
                        {x.location ? " · " + x.location : ""}
                      </p>
                      <p className="text-sm text-slate-500">
                        {x.startYear}–
                        {x.isCurrent ? "Present" : x.endYear || ""}
                      </p>
                      {x.description ? (
                        <p className="mt-2 whitespace-pre-line text-sm leading-6">
                          {x.description}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </Block>
            ) : null}
            {seeker.educations.length ? (
              <Block title="Education">
                {seeker.educations.map((x) => (
                  <article key={x.id} className="mb-4">
                    <h3 className="font-black">{x.qualification}</h3>
                    <p>
                      {x.institution}{" "}
                      {x.startYear || x.endYear
                        ? `· ${x.startYear || ""}–${x.endYear || ""}`
                        : ""}
                    </p>
                    {x.description ? (
                      <p className="mt-1 text-sm">{x.description}</p>
                    ) : null}
                  </article>
                ))}
              </Block>
            ) : null}
            {seeker.certifications.length ? (
              <Block title="Certifications">
                {seeker.certifications.map((x) => (
                  <article key={x.id} className="mb-3">
                    <b>{x.name}</b>
                    <p>
                      {x.issuer}
                      {x.year ? " · " + x.year : ""}
                    </p>
                    {x.credentialUrl ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={x.credentialUrl}
                        className="text-[#1B519F] underline"
                      >
                        View credential
                      </a>
                    ) : null}
                  </article>
                ))}
              </Block>
            ) : null}
          </main>
          <aside className="space-y-5 lg:sticky lg:top-28">
            <Block title="Professional Links">
              <div className="flex flex-wrap gap-3">
                {links
                  .filter(([, v]) => v)
                  .map(([l, v]) => (
                    <a
                      key={l}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={v!}
                      className="font-bold text-[#1B519F] underline"
                    >
                      {l}
                    </a>
                  ))}
              </div>
              {seeker.publicEmail ? (
                <p className="mt-4">
                  <b>Email:</b>{" "}
                  <a href={"mailto:" + seeker.publicEmail}>
                    {seeker.publicEmail}
                  </a>
                </p>
              ) : null}
              {seeker.publicPhone ? (
                <p>
                  <b>Phone:</b>{" "}
                  <a href={"tel:" + seeker.publicPhone}>{seeker.publicPhone}</a>
                </p>
              ) : null}
              {seeker.cvPublic && seeker.cvUrl ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={seekerAsset(seeker.cvUrl)}
                  className="mt-4 inline-flex rounded-lg bg-[#1B519F] px-4 py-2 font-black text-white"
                >
                  View CV
                </a>
              ) : null}
            </Block>
            {seeker.messageFormOpen ? (
              <SeekerMessageForm slug={seeker.slug} name={seeker.fullName} />
            ) : null}
          </aside>
        </Container>
      </section>
    </>
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
    <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-black text-[#1B519F] dark:text-blue-300">
        {title}
      </h2>
      {children}
    </section>
  );
}
function Tags({ values }: { values: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {values.map((v) => (
        <li
          key={v}
          className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-[#1B519F] dark:bg-blue-950 dark:text-blue-200"
        >
          {v}
        </li>
      ))}
    </ul>
  );
}
