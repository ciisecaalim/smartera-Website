"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { ApplicationDocumentUpload } from "@/components/ui/application-document-upload";
import { publicFormDesign } from "@/components/ui/public-form-design";
import { PublicSubmissionToast } from "@/features/web-submissions/public-submission-toast";
import type { Internship } from "../types/internships.types";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
const inputClass = publicFormDesign.input;
const areaClass = publicFormDesign.textarea;

export function InternshipApplicationForm({ internship }: { internship: Internship }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`${API}/web/internships/${encodeURIComponent(internship.slug)}/apply`, { method: "POST", body: new FormData(form) });
      const payload = await response.json().catch(() => null) as { success?: boolean; message?: string } | null;
      if (!response.ok || !payload?.success) throw new Error(payload?.message || "Unable to submit your application.");
      form.reset();
      setSuccess(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit your application.");
    } finally {
      setBusy(false);
    }
  }

  if (success) return <div className="rounded-[28px] border border-emerald-200 bg-white p-10 text-center shadow-[0_20px_55px_rgba(8,43,87,.08)]"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-2xl text-emerald-600">✓</span><h2 className="mt-5 text-2xl font-black text-[#1B519F]">Application Submitted Successfully</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">Thank you for applying for {internship.title}. Our team will review your application and contact you if you are shortlisted.</p></div>;

  return (
    <section className={publicFormDesign.shell}>
      <PublicSubmissionToast message={error} variant="error" onDismiss={() => setError("")} />
      <div className={publicFormDesign.informationPanel}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:70px_70px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-[#F59223]/10 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#F59223]">Selected Internship</p>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Apply for This Internship</h2>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.06] p-5"><p className="text-[9px] font-black uppercase tracking-[.16em] text-blue-100/50">Internship</p><p className="mt-2 text-lg font-black leading-7 text-white">{internship.title}</p><p className="mt-1 text-sm font-semibold text-blue-100/70">{internship.organizationName}</p></div>
          <p className="mt-6 text-sm leading-7 text-blue-100/75">Complete the application form and provide the information the review team needs to assess your suitability.</p>
          <div className="mt-8 space-y-5 border-t border-white/10 pt-6"><Info title="Prepare your CV" text="Upload an updated PDF, DOC, or DOCX file up to 700 KB." /><Info title="Be specific" text="Explain why this internship matches your goals and experience." /><Info title="Review process" text="Smartera reviews every application before shortlisted candidates are contacted." /></div>
        </div>
      </div>

      <form onSubmit={submit} className={publicFormDesign.formPanel}>
        <p className={publicFormDesign.eyebrow}>Internship Application</p>
        <h3 className={publicFormDesign.heading}>Candidate Information</h3>
        <p className={publicFormDesign.description}>The selected internship is already attached to this application.</p>
        <div className={publicFormDesign.selected}><p className="text-[9px] font-black uppercase tracking-[.14em] text-slate-400">Selected Internship</p><p className="mt-1 text-sm font-black text-[#1B519F]">{internship.title}</p></div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Full Name *"><input name="fullName" required minLength={2} maxLength={100} autoComplete="name" className={inputClass} /></Field>
          <Field label="Email *"><input name="email" type="email" required maxLength={150} autoComplete="email" className={inputClass} /></Field>
          <Field label="Phone Number *"><input name="phone" type="tel" required minLength={7} maxLength={25} pattern="[+0-9 ()-]+" autoComplete="tel" className={inputClass} /></Field>
          <Field label="Current Location *"><input name="currentLocation" required minLength={2} maxLength={200} autoComplete="address-level2" className={inputClass} /></Field>
          <Field label="Education Level"><select name="education" defaultValue="" className={inputClass}><option value="">Select level</option><option>Secondary</option><option>Diploma</option><option>Undergraduate</option><option>Graduate</option><option>Other</option></select></Field>
          <Field label="Field of Study"><input name="fieldOfStudy" maxLength={150} className={inputClass} /></Field>
          <Field label="Skills" wide><textarea name="skills" maxLength={1500} className={`${areaClass} min-h-24 resize-y`} /></Field>
          <Field label="Portfolio / LinkedIn"><input name="portfolio" type="url" maxLength={1000} placeholder="https://" className={inputClass} /></Field>
          <Field label="Short Motivation / Message *" wide><textarea name="motivation" required minLength={10} maxLength={5000} className={`${areaClass} min-h-28 resize-y`} /></Field>
          <ApplicationDocumentUpload name="resume" label="CV / Resume" required />
          <label className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#F8FBFF] p-4 text-xs leading-5 text-slate-600 sm:col-span-2"><input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#F59223]" />I confirm that the information provided is accurate and may be securely submitted to Smartera Hub for application review.</label>
        </div>
        <button type="submit" disabled={busy} aria-busy={busy} className={publicFormDesign.primaryButton}>{busy ? "Submitting..." : "Submit Application"}</button>
      </form>
    </section>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return <div><p className="text-sm font-black text-white">{title}</p><p className="mt-1 text-xs leading-6 text-blue-100/65">{text}</p></div>;
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return <label className={`${publicFormDesign.label} ${wide ? "sm:col-span-2" : ""}`}>{label}{children}</label>;
}
