"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { submitPublicForm } from "@/features/web-submissions/public-submissions.service";
import { PublicSubmissionToast } from "@/features/web-submissions/public-submission-toast";

type IctServiceRequestFormProps = {
  serviceTitle: string;
  serviceSlug: string;
};

export function IctServiceRequestForm({
  serviceTitle,
  serviceSlug,
}: IctServiceRequestFormProps) {
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
    try { await submitPublicForm("ict-services", event.currentTarget, { serviceTitle, serviceSlug }); setDemoSuccess(true); } catch (error) { setSubmissionError(error instanceof Error ? error.message : "Unable to submit your request. Please try again."); }
  }

  const input =
    "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10";

  return (
    <section
      id="ict-service-request"
      className="bg-[#F6F9FD] px-4 py-14 sm:px-6 lg:px-8"
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

            <svg
              viewBox="0 0 600 700"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]"
            >
              <path
                d="M-70 180 C 110 50, 250 280, 430 150 S 650 80, 730 240"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />

              <path
                d="M-80 520 C 120 360, 300 630, 470 470 S 650 390, 740 560"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </svg>

            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#F59223]">
                Selected ICT Service
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                Request This Service
              </h2>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <p className="text-[9px] font-black uppercase tracking-[.16em] text-blue-100/50">
                  ICT Solution
                </p>

                <p className="mt-2 text-lg font-black leading-7 text-white">
                  {serviceTitle}
                </p>
              </div>

              <p className="mt-6 text-sm leading-7 text-blue-100/75">
                Tell Smartera Hub what your organization
                needs. We can review the project request,
                clarify the scope, and discuss an
                appropriate next step.
              </p>

              <div className="mt-8 space-y-5">
                <InfoItem
                  title="Business Requirements"
                  text="Describe the problem, workflow, system, website, application, or ICT service you need."
                />

                <InfoItem
                  title="Project Planning"
                  text="Share your preferred timeline, current project stage, and expected users."
                />

                <InfoItem
                  title="Smartera Coordination"
                  text="Smartera reviews the request before scope, schedule, pricing, or delivery is confirmed."
                />
              </div>
            </div>
          </div>


          {/* RIGHT FORM */}
          <form
            onSubmit={submit}
            className="p-6 sm:p-8 lg:p-10"
          >
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#F59223]">
              Project Request
            </p>

            <h3 className="mt-2 text-2xl font-black text-[#1B519F]">
              ICT Service Request Form
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              The selected ICT service is automatically
              attached to this request.
            </p>


            <div className="mt-6 rounded-xl border border-blue-100 bg-[#F5F9FF] p-4">
              <p className="text-[9px] font-black uppercase tracking-[.14em] text-slate-400">
                Selected Service
              </p>

              <p className="mt-1 text-sm font-black text-[#1B519F]">
                {serviceTitle}
              </p>
            </div>


            <div className="mt-7 grid gap-5 sm:grid-cols-2">

              <label className="text-xs font-bold text-[#1B519F]">
                Company / Organization

                <input
                  name="organization"
                  required
                  minLength={2}
                  maxLength={150}
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
                Project Stage

                <select
                  name="projectStage"
                  required
                  defaultValue=""
                  className={input}
                >
                  <option value="">
                    Select stage
                  </option>

                  <option value="idea">
                    Idea / Planning
                  </option>

                  <option value="requirements">
                    Requirements Defined
                  </option>

                  <option value="existing">
                    Existing System / Website
                  </option>

                  <option value="improvement">
                    Upgrade / Improvement
                  </option>
                </select>
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Preferred Start Date

                <input
                  name="preferredStartDate"
                  type="date"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Expected Users

                <input
                  name="expectedUsers"
                  type="number"
                  min={1}
                  max={1000000}
                  placeholder="Example: 50"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Budget Range

                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>

                <select
                  name="budgetRange"
                  defaultValue=""
                  className={input}
                >
                  <option value="">
                    Not specified
                  </option>

                  <option value="discuss">
                    Prefer to discuss
                  </option>

                  <option value="small">
                    Small project
                  </option>

                  <option value="medium">
                    Medium project
                  </option>

                  <option value="large">
                    Large / Complex project
                  </option>
                </select>
              </label>


              <label className="text-xs font-bold text-[#1B519F] sm:col-span-2">
                Project / Business Requirements

                <textarea
                  name="requirements"
                  required
                  minLength={20}
                  maxLength={3000}
                  placeholder="Describe the problem you want to solve, required features, current workflow, users, or other important project requirements..."
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
                is accurate and understand that project
                scope, pricing, schedule, and delivery are
                only confirmed after review by Smartera Hub.
              </label>

            </div>


            {/* TOAST */}
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
                  animate-[ictRequestToastIn_.3s_ease-out]
                  rounded-2xl
                  border
                  border-emerald-200
                  bg-white
                  p-4
                  shadow-[0_20px_55px_rgba(8,43,87,.20)]
                "
              >
                <div className="flex items-start gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-600
                      text-lg
                      font-black
                      text-white
                    "
                  >
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
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-sm
                          font-bold
                          text-slate-400
                          transition
                          hover:bg-slate-100
                          hover:text-slate-700
                        "
                      >
                        ×
                      </button>

                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Your request has been saved and sent to Smartera Hub for review.
                    </p>

                  </div>

                </div>

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-full
                    origin-left
                    animate-[ictRequestToastProgress_4s_linear_forwards]
                    rounded-b-2xl
                    bg-emerald-500
                  "
                />
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
              Submit Project Request
            </button>


            <input
              type="hidden"
              name="serviceSlug"
              value={serviceSlug}
            />

            <input
              type="hidden"
              name="serviceTitle"
              value={serviceTitle}
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


