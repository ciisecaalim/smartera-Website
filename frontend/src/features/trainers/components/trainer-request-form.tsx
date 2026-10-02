"use client";

import { useState, type FormEvent } from "react";
import { PublicSubmissionToast } from "@/features/web-submissions/public-submission-toast";
import { publicFormDesign } from "@/components/ui/public-form-design";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";

export function TrainerRequestForm({
  trainerName,
  trainerSlug,
}: {
  trainerName: string;
  trainerSlug: string;
}) {
  const [notice, setNotice] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fieldLabels: Record<string, string> = {
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    organization: "Organization",
    subject: "Subject",
    message: "Message",
  };

  function getValidationMessage(
    element: HTMLInputElement | HTMLTextAreaElement,
  ) {
    const label = fieldLabels[element.name] ?? "This field";
    const validity = element.validity;

    if (validity.valueMissing) return `${label} is required.`;
    if (element.name === "email" && validity.typeMismatch) return "Enter a valid email address.";
    if (element.name === "phone" && validity.patternMismatch) return "Enter a valid phone number.";
    if (validity.tooShort) return `${label} must contain at least ${(element as HTMLInputElement).minLength} characters.`;
    if (validity.tooLong) return `${label} must contain no more than ${(element as HTMLInputElement).maxLength} characters.`;

    return element.validationMessage || `Check ${label}.`;
  }

  function handleInvalid(event: FormEvent<HTMLFormElement>) {
    const element = event.target;
    if (
      !(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) ||
      !element.name
    ) return;
    event.preventDefault();
    const message = getValidationMessage(element);
    setFieldErrors((c) => ({ ...c, [element.name]: message }));
    setSubmissionError((c) => c || message);
  }

  function handleInput(event: FormEvent<HTMLFormElement>) {
    const element = event.target;
    if (
      !(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) ||
      !element.name
    ) return;
    element.setCustomValidity("");
    setFieldErrors((c) => {
      if (!c[element.name]) return c;
      const next = { ...c };
      delete next[element.name];
      return next;
    });
    setSubmissionError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionError("");
    if (submitting) return;
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const body = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      phone: data.get("phone"),
      organization: data.get("organization"),
      subject: data.get("subject"),
      message: data.get("message"),
    };

    try {
      const response = await fetch(
        `${API}/web/trainers/${encodeURIComponent(trainerSlug)}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !payload?.success) {
        throw new Error(
          payload?.message || "Unable to submit your request. Please try again.",
        );
      }

      setNotice(true);
      form.reset();
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Unable to submit your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const input = `trainer-input ${publicFormDesign.input}`;

  return (
    <form
      onSubmit={submit}
      onInvalidCapture={handleInvalid}
      onInputCapture={handleInput}
      className="space-y-1"
    >
      <PublicSubmissionToast
        message={submissionError}
        variant="error"
        onDismiss={() => setSubmissionError("")}
      />

      <div className="rounded-xl bg-[#EEF5FF] p-4">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Selected Trainer
        </p>
        <p className="mt-1 text-sm font-black text-[#1B519F]">
          {trainerName}
        </p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <label className="text-xs font-bold text-[#1B519F]">
          Full Name <span className="text-red-500">*</span>
          <input
            name="fullName"
            required
            minLength={3}
            maxLength={100}
            aria-describedby="fullNameError"
            placeholder="Your full name"
            className={input}
          />
          {fieldErrors["fullName"] && (
            <span
              id="fullNameError"
              role="alert"
              className="mt-1 block text-[11px] font-semibold leading-4 text-red-600"
            >
              {fieldErrors["fullName"]}
            </span>
          )}
        </label>

        {/* Email */}
        <label className="text-xs font-bold text-[#1B519F]">
          Email <span className="text-red-500">*</span>
          <input
            name="email"
            type="email"
            required
            maxLength={150}
            aria-describedby="emailError"
            placeholder="you@example.com"
            className={input}
          />
          {fieldErrors["email"] && (
            <span
              id="emailError"
              role="alert"
              className="mt-1 block text-[11px] font-semibold leading-4 text-red-600"
            >
              {fieldErrors["email"]}
            </span>
          )}
        </label>

        {/* Phone */}
        <label className="text-xs font-bold text-[#1B519F]">
          Phone
          <input
            name="phone"
            type="tel"
            pattern="[+0-9 \(\)\-]+"
            maxLength={25}
            aria-describedby="phoneError"
            placeholder="+1 (555) 123-4567"
            className={input}
          />
          {fieldErrors["phone"] && (
            <span
              id="phoneError"
              role="alert"
              className="mt-1 block text-[11px] font-semibold leading-4 text-red-600"
            >
              {fieldErrors["phone"]}
            </span>
          )}
        </label>

        {/* Organization */}
        <label className="text-xs font-bold text-[#1B519F]">
          Organization
          <input
            name="organization"
            maxLength={150}
            aria-describedby="organizationError"
            placeholder="Company or institution name"
            className={input}
          />
          {fieldErrors["organization"] && (
            <span
              id="organizationError"
              role="alert"
              className="mt-1 block text-[11px] font-semibold leading-4 text-red-600"
            >
              {fieldErrors["organization"]}
            </span>
          )}
        </label>

        {/* Subject */}
        <label className="text-xs font-bold text-[#1B519F] sm:col-span-2">
          Subject <span className="text-red-500">*</span>
          <input
            name="subject"
            required
            minLength={5}
            maxLength={150}
            aria-describedby="subjectError"
            placeholder="What would you like to discuss?"
            className={input}
          />
          {fieldErrors["subject"] && (
            <span
              id="subjectError"
              role="alert"
              className="mt-1 block text-[11px] font-semibold leading-4 text-red-600"
            >
              {fieldErrors["subject"]}
            </span>
          )}
        </label>

        {/* Message */}
        <label className="text-xs font-bold text-[#1B519F] sm:col-span-2">
          Message <span className="text-red-500">*</span>
          <textarea
            name="message"
            required
            minLength={20}
            maxLength={2000}
            aria-describedby="messageError"
            placeholder="Describe your training requirements, goals, or questions..."
            className="trainer-input mt-2 min-h-32 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10"
          />
          {fieldErrors["message"] && (
            <span
              id="messageError"
              role="alert"
              className="mt-1 block text-[11px] font-semibold leading-4 text-red-600"
            >
              {fieldErrors["message"]}
            </span>
          )}
        </label>
      </div>

      <PublicSubmissionToast
        message={notice ? "Your request has been sent successfully. We will get back to you shortly." : ""}
        variant="success"
        onDismiss={() => setNotice(false)}
      />

      <button
        type="submit"
        disabled={submitting}
        className={`${publicFormDesign.primaryButton} w-full`}
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
