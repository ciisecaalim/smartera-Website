"use client";
import { useState, type FormEvent } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
export function SeekerMessageForm({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch(
        `${API}/web/job-seekers/${encodeURIComponent(slug)}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const p = (await r.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;
      if (!r.ok || !p?.success)
        throw new Error(p?.message || "Unable to send your message right now.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send your message right now.",
      );
      setStatus("error");
    }
  }
  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      id="contact-candidate"
    >
      <h2 className="text-xl font-black text-[#1B519F] dark:text-blue-300">
        Contact This Candidate
      </h2>
      <p className="mt-1 text-sm text-slate-500">Candidate: {name}</p>
      {status === "sent" ? (
        <p className="mt-5 rounded-lg bg-emerald-50 p-4 font-bold text-emerald-700">
          Your message has been sent successfully.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            ["fullName", "Full Name *", "text"],
            ["email", "Email *", "email"],
            ["phone", "Phone", "tel"],
            ["organization", "Organization", "text"],
            ["subject", "Subject *", "text"],
          ].map(([n, l, t]) => (
            <label key={n} className={n === "subject" ? "sm:col-span-2" : ""}>
              <span className="mb-1 block text-sm font-bold">{l}</span>
              <input
                name={n}
                type={t}
                required={l.includes("*")}
                className="h-11 w-full rounded-lg border px-3 dark:border-slate-600 dark:bg-slate-800"
              />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-bold">Message *</span>
            <textarea
              name="message"
              required
              minLength={10}
              rows={5}
              className="w-full rounded-lg border p-3 dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
          {error ? (
            <p role="alert" className="sm:col-span-2 text-sm text-red-600">
              {error}
            </p>
          ) : null}
          <button
            disabled={status === "sending"}
            className="min-h-11 rounded-lg bg-[#1B519F] px-5 font-black text-white disabled:opacity-60 sm:col-span-2"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </section>
  );
}
