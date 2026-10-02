"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { submitPublicForm } from "@/features/web-submissions/public-submissions.service";
import { PublicSubmissionToast } from "@/features/web-submissions/public-submission-toast";

type PartnershipRequestFormProps = {
  partnerProfileId: string;
  partnerId: string;
  partnerName: string;
  partnerSlug: string;
};

export function PartnershipRequestForm({
  partnerProfileId,
  partnerId,
  partnerName,
  partnerSlug,
}: PartnershipRequestFormProps) {
  const [demoSuccess, setDemoSuccess] =
    useState(false);
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    if (!demoSuccess) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDemoSuccess(false);
    }, 4000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [demoSuccess]);

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSubmissionError("");
    try { await submitPublicForm("partners", event.currentTarget, { partnerProfileId, partnerId, partnerName, partnerSlug }); setDemoSuccess(true); } catch (error) { setSubmissionError(error instanceof Error ? error.message : "Unable to submit your request. Please try again."); }
  }

  const input =
    "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10";

  return (
    <section
      id="partnership-request"
      className="scroll-mt-24 bg-[#F6F9FD] px-4 py-14 sm:px-6 lg:px-8"
    >
      <PublicSubmissionToast message={submissionError} variant="error" onDismiss={() => setSubmissionError("")} />
      <div className="mx-auto max-w-7xl">
        <div
          className="
            overflow-hidden
            rounded-[28px]
            border border-slate-200
            bg-white
            shadow-[0_20px_55px_rgba(8,43,87,.08)]
            lg:grid
            lg:grid-cols-[.72fr_1.28fr]
          "
        >
          {/* LEFT */}
          <div
            className="
              relative
              overflow-hidden
              bg-[#071D3D]
              p-7
              text-white
              sm:p-9
              lg:p-10
            "
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255,255,255,1) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,255,255,1) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "70px 70px",
              }}
            />

            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#F59223]">
                Partnership Request
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                Explore Collaboration With Smartera
              </h2>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <p className="text-[9px] font-black uppercase tracking-[.16em] text-blue-100/50">
                  Profile Context
                </p>

                <p className="mt-2 text-lg font-black leading-7 text-white">
                  {partnerName}
                </p>
              </div>

              <p className="mt-6 text-sm leading-7 text-blue-100/75">
                Tell Smartera Hub about your
                organization and the type of
                collaboration you would like to explore.
              </p>

              <div className="mt-8 space-y-5">
                <InfoItem
                  title="Training & Capacity Building"
                  text="Professional training, workshops, and practical staff-development collaboration."
                />

                <InfoItem
                  title="Career Opportunities"
                  text="Internships, employment support, professional development, and workforce collaboration."
                />

                <InfoItem
                  title="ICT & Digital Solutions"
                  text="Technology, websites, systems, digital transformation, and other ICT initiatives."
                />

                <InfoItem
                  title="Events & Programs"
                  text="Joint events, professional activities, community programs, and other initiatives."
                />
              </div>
            </div>
          </div>


          {/* RIGHT */}
          <form
            onSubmit={submit}
            className="p-6 sm:p-8 lg:p-10"
          >
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#F59223]">
              Start Collaboration
            </p>

            <h3 className="mt-2 text-2xl font-black text-[#1B519F]">
              Partnership Request Form
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Complete the form below and Smartera can
              review your proposed collaboration.
            </p>


            <div className="mt-6 rounded-xl border border-blue-100 bg-[#F5F9FF] p-4">
              <p className="text-[9px] font-black uppercase tracking-[.14em] text-slate-400">
                See More
              </p>

              <p className="mt-1 text-sm font-black text-[#1B519F]">
                {partnerName}
              </p>
            </div>


            <div className="mt-7 grid gap-5 sm:grid-cols-2">

              <label className="text-xs font-bold text-[#1B519F]">
                Organization Name

                <input
                  name="organizationName"
                  required
                  minLength={2}
                  maxLength={160}
                  autoComplete="organization"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Contact Person

                <input
                  name="contactPerson"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Business Email

                <input
                  name="email"
                  type="email"
                  required
                  maxLength={150}
                  autoComplete="email"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Phone

                <input
                  name="phone"
                  type="tel"
                  required
                  minLength={7}
                  maxLength={20}
                  pattern="[+0-9 \(\)\-]+"
                  autoComplete="tel"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Organization Type

                <select
                  name="organizationType"
                  required
                  defaultValue=""
                  className={input}
                >
                  <option value="">
                    Select type
                  </option>

                  <option value="company">
                    Company / Business
                  </option>

                  <option value="ngo">
                    NGO / Nonprofit
                  </option>

                  <option value="education">
                    Education Institution
                  </option>

                  <option value="healthcare">
                    Healthcare Organization
                  </option>

                  <option value="government">
                    Government / Public Institution
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Partnership Interest

                <select
                  name="partnershipInterest"
                  required
                  defaultValue=""
                  className={input}
                >
                  <option value="">
                    Select interest
                  </option>

                  <option value="training">
                    Training & Capacity Building
                  </option>

                  <option value="career">
                    Internship & Employment
                  </option>

                  <option value="ict">
                    ICT Solutions
                  </option>

                  <option value="academic">
                    Academic Collaboration
                  </option>

                  <option value="events">
                    Events & Programs
                  </option>

                  <option value="other">
                    Other Collaboration
                  </option>
                </select>
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Website

                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>

                <input
                  name="website"
                  type="url"
                  maxLength={250}
                  placeholder="https://example.com"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                City / Location

                <input
                  name="location"
                  maxLength={150}
                  placeholder="Example: Mogadishu"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F] sm:col-span-2">
                Partnership Proposal / Message

                <textarea
                  name="message"
                  required
                  minLength={20}
                  maxLength={3000}
                  placeholder="Describe your organization, partnership idea, objectives, and proposed collaboration..."
                  className="
                    mt-2
                    min-h-36
                    w-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    p-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    focus:border-[#1B519F]
                    focus:ring-2
                    focus:ring-[#1B519F]/10
                  "
                />
              </label>


              <label className="flex items-start gap-3 text-xs leading-5 text-slate-600 sm:col-span-2">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[#1B519F]"
                />

                I confirm that the information provided
                is accurate and understand that this
                request does not automatically establish
                a partnership.
              </label>

            </div>


            {demoSuccess ? (
              <div
                role="status"
                aria-live="polite"
                className="
                  fixed
                  right-5
                  top-24
                  z-[100]
                  w-[min(390px,calc(100vw-2rem))]
                  animate-[partnershipToastIn_.3s_ease-out]
                  rounded-2xl
                  border border-emerald-200
                  bg-white
                  p-4
                  shadow-[0_20px_55px_rgba(8,43,87,.20)]
                "
              >
                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-black text-white">
                    ✓
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <p className="text-sm font-black text-emerald-700">
                        Request Submitted Successfully
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setDemoSuccess(false)
                        }
                        aria-label="Close notification"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        ×
                      </button>

                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Your request has been saved and sent to Smartera Hub for review.
                    </p>

                  </div>
                </div>
              </div>
            ) : null}


            <button
              type="submit"
              className="
                mt-6
                h-11
                rounded-xl
                bg-[#1B519F]
                px-6
                text-sm
                font-black
                text-white
                transition
                hover:-translate-y-0.5
                hover:bg-[#174783]
              "
            >
              Submit Partnership Request
            </button>


            <input
              type="hidden"
              name="partnerSlug"
              value={partnerSlug}
            />

            <input
              type="hidden"
              name="partnerName"
              value={partnerName}
            />

          </form>
        </div>
      </div>
    </section>
  );
}


function InfoItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-t border-white/10 pt-4">

      <p className="text-sm font-black text-white">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-blue-100/65">
        {text}
      </p>

    </div>
  );
}


