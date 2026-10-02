import Link from "next/link";

import {
  BrandHoverCard,
  getBrandHoverDirection,
} from "@/components/ui/brand-hover-card";

import type { Job } from "@/features/jobs/types/jobs.types";
import { EmployerAvatar } from "./employer-avatar";

export function JobCard({
  job,
  index,
}: {
  job: Job;
  index: number;
}) {
  const direction = getBrandHoverDirection(index);

  return (
    <BrandHoverCard direction={direction}>
      <article className="relative flex h-full min-h-[275px] flex-col p-4">
        <div className="flex gap-3">
          <EmployerAvatar
            company={job.companyName} logo={job.companyLogo} logoAlt={job.companyLogoAlt}
            index={index}
            large
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3
                  className="
                    text-[14px] font-black leading-5
                    text-[#1B519F]
                    transition-colors duration-500
                    group-hover:!text-white
                  "
                >
                  {job.title}
                </h3>

                <p
                  className="
                    mt-0.5 text-[10px] font-semibold
                    text-slate-500
                    transition-colors duration-500
                    group-hover:!text-white/80
                  "
                >
                  {job.companyName}
                </p>
              </div>
            </div>

            <div
              className="
                mt-2 flex flex-wrap gap-x-2.5 gap-y-1
                text-[9px] font-semibold
                text-slate-500
                transition-colors duration-500
                group-hover:!text-white/80
              "
            >
              <span>{job.location}</span>
              <span>{job.employmentType}</span>
              <span>{job.workMode}</span>

              {job.experienceLevel ? (
                <span>{job.experienceLevel}</span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="
                rounded-full bg-[#EEF5FF]
                px-2 py-1
                text-[8px] font-bold text-[#1B519F]
                transition-colors duration-500
                group-hover:!bg-white/15
                group-hover:!text-white
              "
            >
              {skill}
            </span>
          ))}
        </div>

        <p
          className="
            mt-3 line-clamp-3
            text-[10px] leading-5
            text-slate-600
            transition-colors duration-500
            group-hover:!text-white/90
          "
        >
          {job.summary}
        </p>

        <div
          className="
            mt-auto grid
            grid-cols-2
            items-center gap-2
            border-t border-slate-100
            pt-3
            transition-colors duration-500
            group-hover:border-white/20
          "
        >
          <Link
            href={`/opportunities/jobs/${job.slug}`}
            className="
              inline-flex h-9 min-w-0
              items-center justify-center
              whitespace-nowrap
              rounded-lg
              border border-[#1B519F]/25
              px-2
              text-[9px] font-black
              leading-none text-[#1B519F]
              transition-all duration-300

              hover:bg-[#EEF5FF]

              group-hover:!border-white/70
              group-hover:!bg-white/10
              group-hover:!text-white
            "
          >
            Read More...
          </Link>

          <Link
            href={`/opportunities/jobs/${job.slug}/apply`}
            className="
              inline-flex h-9 min-w-0
              items-center justify-center
              whitespace-nowrap
              rounded-lg
              bg-[#1B519F]
              px-2
              text-[9px] font-black
              leading-none text-white
              transition-all duration-300

              hover:bg-[#174783]

              group-hover:!bg-white
              group-hover:!text-[#1B519F]
            "
          >
            Apply Now
          </Link>
        </div>
      </article>
    </BrandHoverCard>
  );
}
