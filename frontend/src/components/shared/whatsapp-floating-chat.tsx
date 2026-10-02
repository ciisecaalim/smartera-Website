"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

const ADMIN_NUMBER = "252619810803";
type FormValues = { fullName: string; phone: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

export function WhatsAppFloatingChat() {
  const [open, setOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    nameInput.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    setErrors({});
  }
  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FormErrors = {};
    if (!values.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!values.phone.trim()) next.phone = "Please enter your phone number.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    const message = `Hello Smartera Hub,\n\nMy name is: ${values.fullName.trim()}\nMy phone number is: ${values.phone.trim()}\n\nMessage:\n${values.message.trim()}`;
    window.open(
      `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    close();
  }

  const input =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1B519F] focus:ring-4 focus:ring-[#1B519F]/10";
  return (
    <div className="fixed bottom-5 right-4 z-[70] sm:bottom-6 sm:right-6">
      {open ? (
        <section
          role="dialog"
          aria-labelledby="whatsapp-title"
          className="fixed bottom-24 right-4 w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_55px_rgba(8,43,87,.24)] sm:bottom-28 sm:right-6"
        >
          <header className="flex items-start justify-between border-b border-slate-100 bg-[#F7FAFF] px-4 py-3.5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#F59223]">
                Smartera Hub
              </p>
              <h2
                id="whatsapp-title"
                className="mt-1 text-lg font-black text-[#1B519F]"
              >
                Chat with us on WhatsApp
              </h2>
              <p className="mt-0.5 text-xs leading-4 text-slate-500">
                Please enter your details before starting the chat.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close WhatsApp form"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-lg leading-none text-slate-500 transition hover:bg-slate-100"
            >
              ×
            </button>
          </header>
          <form onSubmit={submit} noValidate className="space-y-2 p-4">
            <label className="block text-sm font-bold text-[#1B519F]">
              Full Name <span className="text-red-600">*</span>
              <input
                ref={nameInput}
                value={values.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "whatsapp-name-error" : undefined
                }
                className={input}
                placeholder="Your full name"
              />
            </label>
            {errors.fullName ? (
              <p
                id="whatsapp-name-error"
                className="-mt-1 text-xs font-semibold text-red-600"
              >
                {errors.fullName}
              </p>
            ) : null}
            <label className="block text-sm font-bold text-[#1B519F]">
              Phone Number <span className="text-red-600">*</span>
              <input
                type="tel"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? "whatsapp-phone-error" : undefined
                }
                className={input}
                placeholder="+252 ..."
              />
            </label>
            {errors.phone ? (
              <p
                id="whatsapp-phone-error"
                className="-mt-1 text-xs font-semibold text-red-600"
              >
                {errors.phone}
              </p>
            ) : null}
            <label className="block text-sm font-bold text-[#1B519F]">
              Message <span className="text-red-600">*</span>
              <textarea
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "whatsapp-message-error" : undefined
                }
                className={`${input} min-h-16 resize-none`}
                placeholder="How can we help you?"
              />
            </label>
            {errors.message ? (
              <p
                id="whatsapp-message-error"
                className="-mt-1 text-xs font-semibold text-red-600"
              >
                {errors.message}
              </p>
            ) : null}
            <button
              type="submit"
              className="mt-1 min-h-10 w-full rounded-xl bg-[#25D366] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#1fbd5b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/35"
            >
              Continue to WhatsApp
            </button>
          </form>
        </section>
      ) : null}
      <div className="group relative">
        <span
          role="tooltip"
          className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden w-max -translate-y-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:-translate-x-1 group-hover:opacity-100 group-focus-within:-translate-x-1 group-focus-within:opacity-100 sm:block"
        >
          Chat with us
        </span>
        <button
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-label={
            open ? "Close WhatsApp chat" : "Chat with Smartera Hub on WhatsApp"
          }
          aria-expanded={open}
          aria-controls="whatsapp-title"
          title="Chat on WhatsApp"
          className="relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] p-1.5 shadow-[0_10px_30px_rgba(37,211,102,.55)] transition duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 sm:h-[72px] sm:w-[72px]"
        >
          {!open ? (
            <>
              <span
                className="whatsapp-pulse absolute inset-0 -z-10 rounded-full bg-[#25D366]"
                aria-hidden="true"
              />
              <span
                className="whatsapp-pulse-delay absolute inset-0 -z-10 rounded-full border-2 border-[#25D366]"
                aria-hidden="true"
              />
            </>
          ) : null}
          {open ? (
            <span className="text-3xl font-light text-white" aria-hidden="true">
              ×
            </span>
          ) : imageFailed ? (
            <span className="text-lg font-black text-white">WA</span>
          ) : (
            <Image
              src="/images/whatsapp-chat.jpg"
              alt="WhatsApp"
              width={72}
              height={72}
              className="h-full w-full rounded-full object-cover"
              onError={() => setImageFailed(true)}
            />
          )}
        </button>
      </div>
      <style jsx global>{`
        @keyframes whatsapp-pulse {
          0% {
            transform: scale(1);
            opacity: 0.72;
          }
          70% {
            transform: scale(1.7);
            opacity: 0;
          }
          100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }
        .whatsapp-pulse {
          animation: whatsapp-pulse 1.8s cubic-bezier(0.2, 0.7, 0.3, 1) infinite;
        }
        .whatsapp-pulse-delay {
          animation: whatsapp-pulse 1.8s cubic-bezier(0.2, 0.7, 0.3, 1) 0.65s
            infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-pulse,
          .whatsapp-pulse-delay {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
