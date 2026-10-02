"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { registerWebStudent } from "@/features/auth/services/web-auth.service";

type Fields = { fullName: string; phone: string; address: string; email: string; password: string; confirmPassword: string };
const initial: Fields = { fullName: "", phone: "", address: "", email: "", password: "", confirmPassword: "" };
const namePattern = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;
const phonePattern = /^\+?[0-9]{7,15}$/;
const addressPattern = /^[\p{L}\p{M}\p{N} ,.'#/-]+$/u;
const allowedImages = ["image/jpeg", "image/png", "image/webp"];

export function AcademicsSignupPageClient() {
  const router = useRouter(); const fileRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState(initial); const [errors, setErrors] = useState<Partial<Record<keyof Fields | "avatar" | "form", string>>>({});
  const [avatar, setAvatar] = useState<File>(); const [preview, setPreview] = useState<string>(); const [submitting, setSubmitting] = useState(false); const [success, setSuccess] = useState(false);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  function update(name: keyof Fields, value: string) { setFields((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: undefined, form: undefined })); }
  function choosePhoto(event: ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; event.target.value = ""; if (!file) return; if (!allowedImages.includes(file.type) || file.size > 2 * 1024 * 1024) { setErrors((current) => ({ ...current, avatar: "Upload JPG, PNG, or WEBP up to 2 MB." })); return; } if (preview) URL.revokeObjectURL(preview); setAvatar(file); setPreview(URL.createObjectURL(file)); setErrors((current) => ({ ...current, avatar: undefined })); }
  function validate() { const next: typeof errors = {}; if (!namePattern.test(fields.fullName.trim()) || !fields.fullName.trim().includes(" ")) next.fullName = "Enter your full name."; if (!phonePattern.test(fields.phone.trim())) next.phone = "Enter a valid phone number."; if (fields.address.trim().length < 2 || fields.address.trim().length > 250 || !addressPattern.test(fields.address.trim())) next.address = "Enter a valid address."; if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) next.email = "Enter a valid email address."; if (fields.password.length < 8 || fields.password.length > 128 || !/[\p{L}]/u.test(fields.password) || !/\d/.test(fields.password)) next.password = "Password must contain at least one letter and one number."; if (fields.password !== fields.confirmPassword) next.confirmPassword = "Passwords do not match."; setErrors(next); return !Object.keys(next).length; }
  async function submit(event: FormEvent) { event.preventDefault(); if (!validate()) return; setSubmitting(true); try { await registerWebStudent({ ...fields, fullName: fields.fullName.trim(), phone: fields.phone.trim(), address: fields.address.trim(), email: fields.email.trim().toLowerCase(), avatar }); setSuccess(true); window.setTimeout(() => router.replace("/academics/login?registered=1"), 1200); } catch (problem) { setErrors((current) => ({ ...current, form: problem instanceof Error ? problem.message : "Unable to submit Student registration." })); } finally { setSubmitting(false); } }
  const name = fields.fullName.trim(); const initials = name.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "ST";
  return <div className="mx-auto w-full max-w-2xl px-4 py-12"><h1 className="text-3xl font-black tracking-tight text-[#0B1F3A]">Academics Student Registration</h1><p className="mt-2 text-sm text-slate-500">Create your Smartera Student account for Academy verification.</p>
    {success ? <div role="status" className="fixed right-5 top-5 z-[100] rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-xl">Student registration submitted successfully.</div> : null}
    <form onSubmit={submit} className="mt-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center rounded-xl bg-slate-50 p-5"><span className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-[#1B519F] text-2xl font-black text-white">{preview ? <span role="img" aria-label="Profile preview" className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${preview})` }} /> : initials}</span><div className="mt-3 flex gap-3"><button type="button" onClick={() => fileRef.current?.click()} className="text-sm font-black text-[#1B519F] underline">{avatar ? "Change Photo" : "Choose Photo"}</button>{avatar ? <button type="button" onClick={() => { if (preview) URL.revokeObjectURL(preview); setAvatar(undefined); setPreview(undefined); }} className="text-sm font-black text-red-600 underline">Remove</button> : null}</div><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} className="sr-only" /><p className="mt-2 text-xs text-slate-500">Optional JPG, PNG, or WEBP. Maximum 2 MB.</p><ErrorText text={errors.avatar} /></div>
      <Field label="Full Name" value={fields.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} autoComplete="name" />
      <Field label="Phone Number" type="tel" inputMode="numeric" value={fields.phone} onChange={(v) => update("phone", v)} error={errors.phone} autoComplete="tel" />
      <Field label="Address" value={fields.address} onChange={(v) => update("address", v)} error={errors.address} autoComplete="street-address" /><Field label="Email" type="email" value={fields.email} onChange={(v) => update("email", v)} error={errors.email} autoComplete="email" />
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Password" type="password" value={fields.password} onChange={(v) => update("password", v)} error={errors.password} autoComplete="new-password" /><Field label="Confirm Password" type="password" value={fields.confirmPassword} onChange={(v) => update("confirmPassword", v)} error={errors.confirmPassword} autoComplete="new-password" /></div>
      <ErrorText text={errors.form} /><button disabled={submitting || success} className="min-h-12 w-full rounded-xl bg-[#1B519F] px-4 text-sm font-black text-white disabled:opacity-60">{submitting ? "Submitting..." : "Submit Student Registration"}</button>
    </form><p className="mt-5 text-center text-sm text-slate-500">Already registered? <Link href="/academics/login" className="font-black text-[#1B519F] underline">Log in</Link></p></div>;
}

function Field({ label, value, onChange, error, type = "text", inputMode, autoComplete }: { label: string; value: string; onChange: (value: string) => void; error?: string; type?: string; inputMode?: "numeric"; autoComplete: string }) { const id = `student-${label.toLowerCase().replace(/\s+/g, "-")}`; return <div><label htmlFor={id} className="block text-sm font-bold text-[#0B1F3A]">{label}</label><input id={id} type={type} inputMode={inputMode} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} className={`mt-1.5 h-11 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-[#F59223] ${error ? "border-red-400" : "border-slate-300"}`} required /><ErrorText text={error} /></div>; }
function ErrorText({ text }: { text?: string }) { return text ? <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">{text}</p> : null; }
