"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { resolveAvatarUrl, updateWebUserProfile } from "@/features/auth/services/web-auth.service";
import { useWebAuth } from "@/features/auth/hooks/use-web-auth";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export default function ProfilePage() {
  const { user, resolving, setUser } = useWebAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  useEffect(() => () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); }, []);

  function showToast(kind: 'success' | 'error', text: string) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (kind === 'success') { setMessage(text); setError(''); }
    else { setError(text); setMessage(''); }
    toastTimerRef.current = setTimeout(() => { setMessage(''); setError(''); }, 4000);
  }

  if (resolving) return <main className="mx-auto max-w-3xl px-4 py-16"><div className="h-56 animate-pulse rounded-3xl bg-slate-100" /></main>;
  if (!user) return <main className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="text-3xl font-black text-[#1B519F]">Sign in to view your profile</h1><Link href="/login" className="mt-6 inline-flex rounded-xl bg-[#1B519F] px-5 py-3 font-bold text-white">Go to Login</Link></main>;

  const name = user.profile?.fullName || user.email;
  const storedAvatar = removeAvatar ? null : resolveAvatarUrl(user.profile?.avatarUrl);
  const shownAvatar = preview || storedAvatar;
  const initials = name.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  function cancelEdit() {
    setEditing(false); setError(""); setMessage(""); setAvatar(undefined); setRemoveAvatar(false);
    if (preview) URL.revokeObjectURL(preview); setPreview(null);
    setFullName(user?.profile?.fullName || ""); setPhone(user?.phone || ""); setAddress(user?.profile?.address || "");
  }

  function chooseAvatar(file?: File) {
    setError("");
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > MAX_AVATAR_BYTES) {
      setError('Upload a JPG, PNG, or WEBP image up to 2 MB.'); return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setAvatar(file); setPreview(URL.createObjectURL(file)); setRemoveAvatar(false);
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage("");
    const normalizedName = fullName.trim(); const normalizedAddress = address.trim();
    if (!/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u.test(normalizedName) || normalizedName.length < 2 || normalizedName.length > 100) { setError('Enter a valid full name.'); return; }
    if (!/^\+?[0-9]{7,15}$/.test(phone)) { setError('Phone number must contain 7 to 15 digits.'); return; }
    if (normalizedAddress.length < 2 || normalizedAddress.length > 250 || !/^[\p{L}\p{M}\p{N} ,.'#/-]+$/u.test(normalizedAddress)) { setError('Enter a valid address.'); return; }
    setSaving(true);
    try {
      const updated = await updateWebUserProfile({ fullName: normalizedName, phone, address: normalizedAddress, avatar, removeAvatar });
      setUser(updated); setEditing(false); setAvatar(undefined); setRemoveAvatar(false);
      if (preview) URL.revokeObjectURL(preview); setPreview(null); showToast('success', 'Profile updated successfully.');
    } catch (problem) { showToast('error', problem instanceof Error ? problem.message : 'Unable to update profile.'); }
    finally { setSaving(false); }
  }

  return <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
    {message || error ? <div role={error ? 'alert' : 'status'} aria-live="polite" className={`fixed right-4 top-24 z-[80] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border px-5 py-3 text-sm font-semibold shadow-[0_16px_40px_rgba(15,23,42,.18)] sm:right-6 ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-white text-emerald-700'}`}><span className={`grid h-6 w-6 place-items-center rounded-full text-xs text-white ${error ? 'bg-red-600' : 'bg-emerald-600'}`}>{error ? '!' : '✓'}</span>{error || message}<button type="button" onClick={() => { setMessage(''); setError(''); }} className="ml-2 text-lg leading-none opacity-60 hover:opacity-100" aria-label="Dismiss notification">×</button></div> : null}
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(8,43,87,.1)] sm:p-10">
      <div className="flex flex-col gap-6 border-b border-slate-100 pb-8 sm:flex-row sm:items-start">
        <div className="text-center">
          <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1B519F] text-3xl font-black text-white">{shownAvatar ? <span role="img" aria-label="Profile photo" className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${shownAvatar})` }} /> : initials}</div>
          {editing ? <><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => chooseAvatar(event.target.files?.[0])} /><button type="button" onClick={() => fileRef.current?.click()} className="mt-3 block w-full text-xs font-bold text-[#1B519F]">Change photo</button>{shownAvatar ? <button type="button" onClick={() => { setAvatar(undefined); if (preview) URL.revokeObjectURL(preview); setPreview(null); setRemoveAvatar(true); }} className="mt-2 text-xs font-bold text-red-600">Remove</button> : null}</> : null}
        </div>
        <div className="flex-1 text-center sm:text-left"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#F59223]">Customer Account</p><h1 className="mt-2 text-3xl font-black text-[#1B519F]">{name}</h1><p className="mt-2 text-sm text-slate-500">Your Smartera Hub public account information.</p></div>
        {!editing ? <button type="button" onClick={() => { setFullName(user.profile?.fullName || ''); setPhone(user.phone || ''); setAddress(user.profile?.address || ''); setEditing(true); setMessage(''); }} className="rounded-xl bg-[#1B519F] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#174783]">Edit Profile</button> : null}
      </div>

      {editing ? <form onSubmit={saveProfile} className="mt-8 grid gap-5 sm:grid-cols-2">
        <EditField label="Full name" value={fullName} onChange={setFullName} maxLength={100} autoComplete="name" />
        <div><label htmlFor="profile-email" className="field-label">Email</label><input id="profile-email" value={user.email} disabled className="field-input cursor-not-allowed opacity-60" /><p className="mt-1 text-xs text-slate-400">Email changes require a separate verification flow.</p></div>
        <div><label htmlFor="profile-phone" className="field-label">Phone</label><input id="profile-phone" type="tel" inputMode="tel" value={phone} maxLength={16} autoComplete="tel" onChange={(event) => { if (/^\+?[0-9]*$/.test(event.target.value)) setPhone(event.target.value); }} className="field-input" /></div>
        <EditField label="Address" value={address} onChange={setAddress} maxLength={250} autoComplete="street-address" />
        <div className="flex gap-3 sm:col-span-2"><button disabled={saving} className="rounded-xl bg-[#1B519F] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save Changes'}</button><button type="button" onClick={cancelEdit} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700">Cancel</button></div>
      </form> : <dl className="mt-8 grid gap-6 sm:grid-cols-2"><ProfileValue label="Full name" value={user.profile?.fullName} /><ProfileValue label="Email" value={user.email} /><ProfileValue label="Phone" value={user.phone} /><ProfileValue label="Address" value={user.profile?.address} /><ProfileValue label="Account type" value="Customer" /><ProfileValue label="Status" value={user.status} /></dl>}
    </div>
  </main>;
}

function EditField({ label, value, onChange, maxLength, autoComplete }: { label: string; value: string; onChange: (value: string) => void; maxLength: number; autoComplete: string }) { const id = `profile-${label.toLowerCase().replace(/\s+/g, '-')}`; return <div><label htmlFor={id} className="field-label">{label}</label><input id={id} value={value} onChange={(event) => onChange(event.target.value)} maxLength={maxLength} autoComplete={autoComplete} className="field-input" /></div>; }
function ProfileValue({ label, value }: { label: string; value?: string | null }) { return <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt><dd className="mt-1 text-base font-semibold text-slate-800">{value || "Not provided"}</dd></div>; }
