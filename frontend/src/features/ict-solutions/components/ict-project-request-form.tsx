"use client";

import { useState, type FormEvent } from "react";
import { submitPublicForm } from "@/features/web-submissions/public-submissions.service";
import { PublicSubmissionToast } from "@/features/web-submissions/public-submission-toast";

const fieldClass = "h-11 w-full rounded-lg border border-[#1B519F]/20 bg-white px-3 text-sm text-[#10213B] outline-none transition placeholder:text-[#475569]/65 focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/15";

export function IctProjectRequestForm() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    try {
      await submitPublicForm("ict-services", event.currentTarget, { serviceTitle: "General ICT solution request", serviceSlug: "general-request" });
      event.currentTarget.reset();
      setSuccess(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit your request. Please try again.");
    }
  }
  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <PublicSubmissionToast message={message} variant="error" onDismiss={() => setMessage("")} />
      {success ? <div role="status" className="rounded-lg border border-[#1B519F]/20 bg-[#F2F6FC] p-3 text-sm font-bold text-[#1B519F] sm:col-span-2">Your request was submitted successfully.</div> : null}
      <label className="sr-only" htmlFor="ict-full-name">Full name</label>
      <input id="ict-full-name" name="contactPerson" required minLength={2} maxLength={100} autoComplete="name" placeholder="Full Name *" className={fieldClass} />
      <label className="sr-only" htmlFor="ict-company">Company or organization</label>
      <input id="ict-company" name="organization" required minLength={2} maxLength={150} placeholder="Company / Organization *" className={fieldClass} />
      <label className="sr-only" htmlFor="ict-email">Email address</label>
      <input id="ict-email" name="email" type="email" required maxLength={150} autoComplete="email" placeholder="Email Address *" className={fieldClass} />
      <label className="sr-only" htmlFor="ict-phone">Phone number</label>
      <input id="ict-phone" name="phone" type="tel" required minLength={7} maxLength={20} pattern="[+0-9 ()-]+" autoComplete="tel" placeholder="Phone Number *" className={fieldClass} />
      <label className="sr-only" htmlFor="ict-service">Service needed</label>
      <select id="ict-service" name="serviceNeeded" required defaultValue="" className={fieldClass}>
        <option value="" disabled>Service Needed *</option>
        <option>Web Development</option><option>Management Systems</option><option>Business Automation</option><option>Database Solutions</option>
        <option>API Development</option><option>Deployment & Hosting</option><option>Technical Support</option><option>System Maintenance</option>
      </select>
      <label className="sr-only" htmlFor="ict-timeline">Estimated timeline</label>
      <select id="ict-timeline" name="estimatedTimeline" required defaultValue="" className={fieldClass}>
        <option value="" disabled>Estimated Timeline *</option><option>Less than 1 month</option><option>1-3 months</option><option>3-6 months</option><option>6+ months</option><option>Not sure yet</option>
      </select>
      <label className="sr-only" htmlFor="ict-description">Project description</label>
      <textarea id="ict-description" name="requirements" required minLength={20} maxLength={3000}
        placeholder="Tell us more about your project, goals and requirements..." className={`${fieldClass} min-h-28 resize-y py-3 sm:col-span-2`} />
      <button type="submit" className="h-11 rounded-lg bg-[#F59223] px-6 text-sm font-black text-white transition hover:bg-[#D97808] sm:col-span-2">
        Submit Request <span aria-hidden="true">-&gt;</span>
      </button>
    </form>
  );
}

