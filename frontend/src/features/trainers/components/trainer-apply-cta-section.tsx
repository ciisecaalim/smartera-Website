import Link from "next/link";

function Icon({
  type,
}: {
  type: "expertise" | "calendar" | "growth";
}) {
  if (type === "calendar") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M7 3v4M17 3v4M3 9h18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "growth") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          d="M4 19V13M10 19V9M16 19V6M22 19V3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M3 21h19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 21c.8-4.3 3.1-6.5 7-6.5 2.1 0 3.8.6 5.1 1.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M19 14.5l1 2 2.2.3-1.6 1.6.4 2.2-2-1-2 1 .4-2.2-1.6-1.6 2.2-.3 1-2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function TrainerApplyCtaSection() {
  return (
    <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-r from-[#F7FAFF] via-white to-[#EEF5FF] shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:p-8">

          <div>
            <span className="inline-flex rounded-full bg-[#EAF2FF] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#1B519F]">
              Become a Trainer
            </span>

            <h2 className="mt-4 text-2xl font-black leading-tight text-[#082B66] sm:text-3xl">
              Turn Your Expertise Into{" "}
              <span className="text-[#F59223]">
                Real Impact.
              </span>
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Join Smartera Hub as a professional trainer and help
              learners build practical, job-ready skills through
              your knowledge and real-world experience.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5FF] text-[#1B519F]">
                  <Icon type="expertise" />
                </span>

                <div>
                  <p className="text-sm font-black text-[#082B66]">
                    Share Expertise
                  </p>
                  <p className="text-xs text-slate-500">
                    Teach practical skills
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5FF] text-[#1B519F]">
                  <Icon type="calendar" />
                </span>

                <div>
                  <p className="text-sm font-black text-[#082B66]">
                    Flexible Training
                  </p>
                  <p className="text-xs text-slate-500">
                    Online or in-person
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5FF] text-[#1B519F]">
                  <Icon type="growth" />
                </span>

                <div>
                  <p className="text-sm font-black text-[#082B66]">
                    Grow Your Impact
                  </p>
                  <p className="text-xs text-slate-500">
                    Support more learners
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] bg-gradient-to-br from-[#155CC7] to-[#0A3B8E] p-6 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#155CC7]">
              <Icon type="expertise" />
            </div>

            <h3 className="mt-4 text-xl font-black">
              Ready to inspire?
            </h3>

            <p className="mt-2 text-sm leading-6 text-blue-100">
              Complete the trainer application and take the first
              step toward joining our trainer community.
            </p>

            <Link
              href="/trainers/apply"
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-black text-[#1B519F] transition hover:bg-[#EEF5FF]"
            >
              Apply as a Trainer 
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
