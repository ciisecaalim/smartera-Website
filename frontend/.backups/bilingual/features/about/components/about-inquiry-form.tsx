"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { submitPublicForm } from "@/features/web-submissions/public-submissions.service";
import { PublicSubmissionToast } from "@/features/web-submissions/public-submission-toast";

export function AboutInquiryForm() {
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
    try { await submitPublicForm("about", event.currentTarget); setDemoSuccess(true); } catch (error) { setSubmissionError(error instanceof Error ? error.message : "Unable to submit your request. Please try again."); }
  }

  const input =
    "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10";

  return (
    <section
      id="about-inquiry"
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
          {/* LEFT SIDE */}
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
                Get in Touch
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                Want to know more about Smartera Hub?
              </h2>

              <p className="mt-5 text-sm leading-7 text-blue-100/75">
                Send us your question, idea, or enquiry.
                Tell us what you are interested in and
                Smartera can review your message.
              </p>

              <div className="mt-8 space-y-5">
                <InfoItem
                  title="Programs & Training"
                  text="Ask about professional training, practical learning, and skills-development activities."
                />

                <InfoItem
                  title="Career Opportunities"
                  text="Ask about internships, employment support, and career-development services."
                />

                <InfoItem
                  title="ICT Solutions"
                  text="Discuss websites, systems, applications, digital solutions, and technology services."
                />

                <InfoItem
                  title="Partnerships & Collaboration"
                  text="Start a conversation about organizational collaboration, events, or shared initiatives."
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
              General Inquiry
            </p>

            <h3 className="mt-2 text-2xl font-black text-[#1B519F]">
              Contact Smartera Hub
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Complete the form below and tell us
              what you would like to discuss.
            </p>


            <div className="mt-7 grid gap-5 sm:grid-cols-2">

              <label className="text-xs font-bold text-[#1B519F]">
                Full Name

                <input
                  name="fullName"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Email

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

                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>

                <input
                  name="phone"
                  type="tel"
                  minLength={7}
                  maxLength={20}
                  pattern="[+0-9 \(\)\-]+"
                  autoComplete="tel"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F]">
                Organization

                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>

                <input
                  name="organization"
                  maxLength={160}
                  autoComplete="organization"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F] sm:col-span-2">
                Inquiry Type

                <select
                  name="inquiryType"
                  required
                  defaultValue=""
                  className={input}
                >
                  <option value="">
                    Select inquiry type
                  </option>

                  <option value="general">
                    General Inquiry
                  </option>

                  <option value="training">
                    Training & Programs
                  </option>

                  <option value="career">
                    Career Opportunities
                  </option>

                  <option value="ict">
                    ICT Solutions
                  </option>

                  <option value="partnership">
                    Partnership & Collaboration
                  </option>

                  <option value="events">
                    Events & Programs
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </label>


              <label className="text-xs font-bold text-[#1B519F] sm:col-span-2">
                Subject

                <input
                  name="subject"
                  required
                  minLength={3}
                  maxLength={180}
                  placeholder="What would you like to discuss?"
                  className={input}
                />
              </label>


              <label className="text-xs font-bold text-[#1B519F] sm:col-span-2">
                Message

                <textarea
                  name="message"
                  required
                  minLength={20}
                  maxLength={3000}
                  placeholder="Write your question, idea, request, or enquiry..."
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

                I confirm that the information
                provided is accurate.
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
                  rounded-2xl
                  border border-emerald-200
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
                        Message Submitted Successfully
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
                      Your message has been saved and sent to Smartera Hub for review.
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
              Send Message
            </button>

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


