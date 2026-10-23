"use client";
import { button as Lbutton, div as Ldiv, input as Linput, label as Llabel, option as Loption, p as Lp, select as Lselect, textarea as Ltextarea } from "@/i18n/elements";


import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import { submitPublicForm } from "@/features/web-submissions/public-submissions.service";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

/**
 * Client-side validation improves UX only.
 *
 * When a backend contact endpoint is introduced, the server must repeat
 * all validation and remain authoritative.
 */
export function ContactForm() {
  const [values, setValues] =
    useState<ContactFormValues>(initialValues);

  const [errors, setErrors] =
    useState<ContactFormErrors>({});

  const [status, setStatus] =
    useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [status]);

  function validate(): ContactFormErrors {
    const nextErrors: ContactFormErrors = {};

    const fullName = values.fullName.trim();
    const email = values.email.trim();
    const phone = values.phone.trim();
    const subject = values.subject.trim();
    const message = values.message.trim();

    if (fullName.length < 2) {
      nextErrors.fullName =
        "Fadlan geli magacaaga oo dhammeystiran.";
    }
    if (fullName.length > 100) nextErrors.fullName = "Magacu kama badnaan karo 100 xaraf.";

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nextErrors.email =
        "Fadlan geli email sax ah.";
    }
    if (email.length > 150) nextErrors.email = "Email-ku kama badnaan karo 150 xaraf.";

    if (
      phone &&
      !/^[0-9+\-\s()]{7,20}$/.test(phone)
    ) {
      nextErrors.phone =
        "Fadlan geli phone number sax ah.";
    }

    if (subject.length < 3) {
      nextErrors.subject =
        "Fadlan dooro ama geli subject sax ah.";
    }

    if (message.length < 10) {
      nextErrors.message =
        "Fariintu waa inay ka badnaataa 10 xaraf.";
    }

    if (message.length > 2000) {
      nextErrors.message =
        "Fariintu kama badnaan karto 2000 xaraf.";
    }

    return nextErrors;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("");
      setStatusType("");
      return;
    }

    setSubmitting(true);
    try {
      const request = submitPublicForm(
        "contact",
        event.currentTarget,
      );

      setValues(initialValues);
      setErrors({});

      await request;

      setStatus("Your message has been submitted successfully.");
      setStatusType("success");
    } catch (error) {
      setStatus(error instanceof Error && error.message ? error.message : "Unable to send your message right now. Please try again.");
      setStatusType("error");
    } finally { setSubmitting(false); }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(6,59,134,0.09)] sm:p-6 lg:p-7"
    >
      <Ldiv className="grid gap-4 sm:grid-cols-2">
        <FormInput
          id="fullName"
          label="Full Name"
          value={values.fullName}
          error={errors.fullName}
          placeholder="Your full name"
          onChange={(value) =>
            setValues((current) => ({
              ...current,
              fullName: value,
            }))
          }
        />

        <FormInput
          id="email"
          type="email"
          label="Email"
          value={values.email}
          error={errors.email}
          placeholder="name@example.com"
          onChange={(value) =>
            setValues((current) => ({
              ...current,
              email: value,
            }))
          }
        />

        <FormInput
          id="phone"
          type="tel"
          label="Phone"
          value={values.phone}
          error={errors.phone}
          placeholder="Phone number"
          onChange={(value) =>
            setValues((current) => ({
              ...current,
              phone: value,
            }))
          }
        />

        <Ldiv>
          <Llabel
            htmlFor="subject"
            className="mb-2 block text-xs font-black text-[#1B519F]"
          >
            Subject
          </Llabel>

          <Lselect
            id="subject"
            name="subject"
            value={values.subject}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                subject: event.target.value,
              }))
            }
            aria-invalid={
              errors.subject ? true : undefined
            }
            aria-describedby={
              errors.subject
                ? "subject-error"
                : undefined
            }
            className="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FBFF] px-4 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-[#1B519F] focus:bg-white focus:ring-4 focus:ring-[#1B519F]/10"
          >
            <Loption value="">
              Select a subject
            </Loption>

            <Loption value="training">
              Training & Academy
            </Loption>

            <Loption value="employment">
              Employment
            </Loption>

            <Loption value="internship">
              Internship
            </Loption>

            <Loption value="partnership">
              Partnership
            </Loption>

            <Loption value="other">
              Other
            </Loption>
          </Lselect>

          {errors.subject && (
            <Lp
              id="subject-error"
              className="mt-1.5 text-xs text-red-600"
            >
              {errors.subject}
            </Lp>
          )}
        </Ldiv>
      </Ldiv>

      <Ldiv className="mt-4">
        <Llabel
          htmlFor="message"
          className="mb-2 block text-xs font-black text-[#1B519F]"
        >
          Message
        </Llabel>

        <Ltextarea
          id="message"
          name="message"
          rows={6}
          maxLength={2000}
          value={values.message}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              message: event.target.value,
            }))
          }
          aria-invalid={
            errors.message ? true : undefined
          }
          aria-describedby={
            errors.message
              ? "message-error"
              : "message-count"
          }
          placeholder="Tell us how we can help..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-[#F8FBFF] px-4 py-3 text-sm leading-7 text-slate-700 outline-none transition-all duration-300 focus:border-[#1B519F] focus:bg-white focus:ring-4 focus:ring-[#1B519F]/10"
        />

        <Ldiv className="mt-1.5 flex items-center justify-between gap-4">
          <Ldiv>
            {errors.message && (
              <Lp
                id="message-error"
                className="text-xs text-red-600"
              >
                {errors.message}
              </Lp>
            )}
          </Ldiv>

          <Lp
            id="message-count"
            className="text-[10px] text-slate-400"
          >
            {values.message.length}/2000
          </Lp>
        </Ldiv>
      </Ldiv>

      <Lbutton
        type="submit"
        disabled={submitting}
        className="mt-5 flex min-h-10 w-full items-center justify-center rounded-lg bg-[#1B519F] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_18px_rgba(7,94,222,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#174783] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 motion-reduce:transform-none"
      >
        {submitting ? "Sending..." : "Send Message"}
      </Lbutton>

      {status && (
        <Ldiv
          role={statusType === "error" ? "alert" : "status"}
          className={`fixed right-5 top-24 z-[100] max-w-sm rounded-xl border px-5 py-4 text-sm font-bold shadow-xl ${statusType === "error" ? "border-red-200 bg-red-600 text-white" : "border-emerald-200 bg-emerald-600 text-white"}`}
        >
          {status}
        </Ldiv>
      )}
    </form>
  );
}


type FormInputProps = {
  id: keyof ContactFormValues;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  type?: "text" | "email" | "tel";
  onChange: (value: string) => void;
};

function FormInput({
  id,
  label,
  value,
  placeholder,
  error,
  type = "text",
  onChange,
}: FormInputProps) {
  const errorId = `${id}-error`;

  return (
    <Ldiv>
      <Llabel
        htmlFor={id}
        className="mb-2 block text-xs font-black text-[#1B519F]"
      >
        {label}
      </Llabel>

      <Linput
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        aria-invalid={
          error ? true : undefined
        }
        aria-describedby={
          error ? errorId : undefined
        }
        className="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FBFF] px-4 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-[#1B519F] focus:bg-white focus:ring-4 focus:ring-[#1B519F]/10"
      />

      {error && (
        <Lp
          id={errorId}
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </Lp>
      )}
    </Ldiv>
  );
}

