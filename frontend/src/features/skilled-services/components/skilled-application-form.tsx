"use client";

import { useState, type FormEvent } from "react";
import { submitPublicForm } from "@/features/web-submissions/public-submissions.service";
import { PublicSubmissionToast } from "@/features/web-submissions/public-submission-toast";

type Kind = "training" | "work";
const input = "mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#1B519F]";

export function SkilledApplicationForm({ kind, slug }: { kind: Kind; slug: string }) {
  const [notice, setNotice] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError("");
    try { await submitPublicForm("job-seekers", event.currentTarget, { kind, recordSlug: slug }); setNotice(true); }
    catch (problem) { setError(problem instanceof Error ? problem.message : "Unable to submit your request. Please try again."); }
    finally { setBusy(false); }
  };
  return <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <PublicSubmissionToast message={notice ? "Your request has been submitted successfully." : ""} variant="success" onDismiss={() => setNotice(false)} />
    <PublicSubmissionToast message={error} variant="error" onDismiss={() => setError("")} />
    <h2 className="text-xl font-black text-[#1B519F]">Applicant Information</h2>
    <div className="mt-6 grid gap-5 sm:grid-cols-2"><Field name="fullName" label="Full Name"/><Field name="email" label="Email" type="email"/><Field name="phone" label="Phone" type="tel"/>{kind === "training" ? <><Field name="education" label="Education Level"/><Field name="occupation" label="Current Occupation" optional/><Field name="schedule" label="Preferred Schedule" optional/><Area name="experience" label="Previous Experience" optional/><Area name="motivation" label="Why do you want to learn this skill?"/></> : <><Field name="primarySkill" label="Primary Skill"/><Field name="experience" label="Years of Experience"/><Field name="workplace" label="Previous Workplace" optional/><Area name="summary" label="Professional Summary"/><label className="text-xs font-bold text-[#1B519F] sm:col-span-2">CV / Resume<input name="resume" type="file" accept=".pdf,.doc,.docx" required className="mt-2 block w-full rounded-xl border border-dashed border-slate-300 bg-[#F8FBFF] p-4 text-xs"/></label></>}
      <label className="flex gap-3 text-xs text-slate-600 sm:col-span-2"><input type="checkbox" required/>I confirm that the information provided is accurate.</label>
    </div>
    <button disabled={busy} className="mt-6 rounded-xl bg-[#1B519F] px-6 py-3 text-sm font-black text-white disabled:opacity-60">{busy ? "Submitting..." : "Submit Application"}</button>
  </form>;
}

function Field({ name, label, type = "text", optional = false }: { name: string; label: string; type?: string; optional?: boolean }) { return <label className="text-xs font-bold text-[#1B519F]">{label}{optional ? <span className="font-normal text-slate-400"> (Optional)</span> : null}<input name={name} type={type} required={!optional} minLength={optional ? undefined : 2} maxLength={150} className={input}/></label>; }
function Area({ name, label, optional = false }: { name: string; label: string; optional?: boolean }) { return <label className="text-xs font-bold text-[#1B519F] sm:col-span-2">{label}{optional ? <span className="font-normal text-slate-400"> (Optional)</span> : null}<textarea name={name} required={!optional} minLength={optional ? undefined : 20} maxLength={1500} className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 p-3 text-sm"/></label>; }

