"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { registerWebCustomer, WebAuthError } from "@/features/auth/services/web-auth.service";
import { useWebAuth } from "@/features/auth/hooks/use-web-auth";

type AuthMode = "login" | "register";
type FieldErrors = Partial<Record<"avatar" | "fullName" | "phone" | "address" | "email" | "password" | "confirmPassword" | "terms", string>>;
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

async function validImageSignature(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
  const webp = String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return (file.type === "image/jpeg" && jpeg) || (file.type === "image/png" && png) || (file.type === "image/webp" && webp);
}

export function AuthCard({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { login } = useWebAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const isLogin = mode === "login";

  useEffect(() => {
    if (isLogin && sessionStorage.getItem("smartera_registration_success")) {
      sessionStorage.removeItem("smartera_registration_success");
      const timer = window.setTimeout(() => setNotice("Account created successfully. Sign in to continue."), 0);
      return () => window.clearTimeout(timer);
    }
  }, [isLogin]);

  useEffect(() => () => { if (avatarPreview) URL.revokeObjectURL(avatarPreview); }, [avatarPreview]);

  async function chooseAvatar(file?: File) {
    setErrors((current) => ({ ...current, avatar: undefined }));
    if (!file) return;
    if (!IMAGE_TYPES.has(file.type) || file.size > MAX_AVATAR_BYTES || !(await validImageSignature(file))) {
      setErrors((current) => ({ ...current, avatar: "Upload a JPG, PNG, or WEBP image up to 2 MB." }));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function removeAvatar() {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatar(undefined); setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const nextErrors: FieldErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) nextErrors.email = "Enter a valid email address.";
    if (!password || password.length > 128) nextErrors.password = "Enter your password.";

    if (!isLogin) {
      const fullName = String(form.get("fullName") || "").trim();
      const address = String(form.get("address") || "").trim();
      const confirmPassword = String(form.get("confirmPassword") || "");
      if (!/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u.test(fullName) || fullName.length < 2 || fullName.length > 100) nextErrors.fullName = "Enter a valid full name.";
      if (!/^\+?[0-9]{7,15}$/.test(phone)) nextErrors.phone = "Phone number must contain 7 to 15 digits only.";
      if (address.length < 2 || address.length > 250 || !/^[\p{L}\p{M}\p{N} ,.'#/-]+$/u.test(address)) nextErrors.address = "Enter a valid address.";
      if (password.length < 8 || !/\p{L}/u.test(password) || !/\d/.test(password)) nextErrors.password = "Password must contain at least one letter and one number.";
      if (password !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
      if (form.get("terms") !== "on") nextErrors.terms = "Accept the terms and privacy policy to continue.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitting(true);
    try {
      if (isLogin) {
        await login({ email, password });
        router.push("/");
      } else {
        await registerWebCustomer({
          fullName: String(form.get("fullName")).trim(), email, phone,
          address: String(form.get("address")).trim(), password,
          confirmPassword: String(form.get("confirmPassword")), avatar,
        });
        sessionStorage.setItem("smartera_registration_success", "1");
        router.push("/login");
      }
      router.refresh();
    } catch (error) {
      if (error instanceof WebAuthError && error.retryAfterSeconds) {
        setNotice(`Too many failed attempts. Try again in ${error.retryAfterSeconds} seconds.`);
      } else setNotice(error instanceof Error ? error.message : "Unable to authenticate. Please try again.");
    } finally { setSubmitting(false); }
  }

  return <section className="relative isolate overflow-hidden bg-white px-4 py-12 sm:py-16">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(96,165,250,.18),transparent_32%),radial-gradient(circle_at_92%_88%,rgba(246,162,26,.14),transparent_36%)]" />
    <div className="relative mx-auto max-w-[460px] rounded-[28px] border border-slate-200 bg-white p-6 text-[#1B519F] shadow-[0_24px_70px_rgba(8,43,87,.12)] sm:p-8">
      <div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#F59223]">Smartera Hub</p><h1 className="mt-3 text-3xl font-black">{isLogin ? "Welcome back!" : "Create your account"}</h1><p className="mt-3 text-[13px] leading-6 text-slate-500">{isLogin ? "Sign in to continue your journey." : "Join Smartera Hub and begin building your future."}</p></div>
      <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
        {!isLogin ? <>
          <div className="text-center"><div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border-2 border-dashed border-blue-200 bg-blue-50 text-2xl font-bold text-[#1B519F]">{avatarPreview ? <span className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${avatarPreview})` }} role="img" aria-label="Selected profile photo" /> : "Photo"}</div><input ref={fileInputRef} className="sr-only" id="avatar" name="avatar" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void chooseAvatar(event.target.files?.[0])} /><div className="mt-3 flex justify-center gap-3"><label htmlFor="avatar" className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold hover:bg-slate-50">Choose Photo</label>{avatar ? <button type="button" onClick={removeAvatar} className="text-xs font-bold text-red-600">Remove Photo</button> : null}</div><FieldError message={errors.avatar} /></div>
          <Field name="fullName" label="Full name" type="text" autoComplete="name" maxLength={100} error={errors.fullName} />
          <div><label htmlFor="phone" className="field-label">Phone number</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={16} value={phone} onChange={(event) => { const value = event.target.value; if (/^\+?[0-9]*$/.test(value)) setPhone(value); }} className="field-input" /><FieldError message={errors.phone} /></div>
          <Field name="address" label="Address" type="text" autoComplete="street-address" maxLength={250} error={errors.address} />
        </> : null}
        <Field name="email" label="Email" type="email" autoComplete="email" maxLength={254} error={errors.email} />
        <PasswordField name="password" label="Password" visible={showPassword} toggle={() => setShowPassword((value) => !value)} autoComplete={isLogin ? "current-password" : "new-password"} error={errors.password} />
        {!isLogin ? <><PasswordField name="confirmPassword" label="Confirm password" visible={showPassword} autoComplete="new-password" error={errors.confirmPassword} /><label className="flex items-start gap-2 text-xs leading-5 text-slate-600"><input name="terms" type="checkbox" className="mt-1 accent-[#1B519F]" /><span>I agree to the <Link href="/terms-and-conditions" className="font-bold text-[#1B519F]">Terms</Link> and <Link href="/privacy-policy" className="font-bold text-[#1B519F]">Privacy Policy</Link>.</span></label><FieldError message={errors.terms} /></> : null}
        <button disabled={submitting} className="flex h-11 w-full items-center justify-center rounded-xl bg-[#1B519F] text-[13px] font-bold text-white hover:bg-[#174783] disabled:opacity-60">{submitting ? "Please wait..." : isLogin ? "Log In" : "Create Account"}</button>
      </form>
      {notice ? <p role="status" className={`mt-4 rounded-lg px-3 py-2 text-center text-xs ${notice.startsWith("Account created") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{notice}</p> : null}
      <p className="mt-6 text-center text-xs text-slate-500">{isLogin ? "New to Smartera Hub?" : "Already have an account?"} <Link href={isLogin ? "/register" : "/login"} className="font-bold text-[#1B519F]">{isLogin ? "Sign up" : "Log in"}</Link></p>
    </div>
  </section>;
}

function Field({ name, label, type, autoComplete, maxLength, error }: { name: string; label: string; type: "email" | "text"; autoComplete: string; maxLength: number; error?: string }) { return <div><label htmlFor={name} className="field-label">{label}</label><input id={name} name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} className="field-input" /><FieldError message={error} /></div>; }
function PasswordField({ name, label, visible, toggle, autoComplete, error }: { name: string; label: string; visible: boolean; toggle?: () => void; autoComplete: string; error?: string }) { return <div><label htmlFor={name} className="field-label">{label}</label><div className="relative"><input id={name} name={name} type={visible ? "text" : "password"} autoComplete={autoComplete} maxLength={128} className="field-input pr-14" />{toggle ? <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold">{visible ? "Hide" : "Show"}</button> : null}</div><FieldError message={error} /></div>; }
function FieldError({ message }: { message?: string }) { return message ? <p className="mt-1 text-left text-xs text-red-600">{message}</p> : null; }
