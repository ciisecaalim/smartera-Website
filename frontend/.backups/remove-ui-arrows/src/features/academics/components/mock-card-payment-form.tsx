"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CheckIcon, LockIcon } from "@/features/academics/components/icons";
import {
  isMockPaymentMode,
  MOCK_AUTH_REQUIRED_CARD,
  MOCK_DECLINED_CARD,
  MOCK_SUCCESS_CARD,
} from "@/lib/mock-payments";
import { cn } from "@/lib/cn";

export const MOCK_CHECKOUT_FORM_ID = "academics-mock-checkout-form";

type MockPaymentStatus = "IDLE" | "VALIDATING" | "PROCESSING" | "SUCCESS" | "FAILED";

type FieldErrors = {
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  name?: string;
  form?: string;
};

type MockCardPaymentFormProps = {
  payLabel: string;
  formId?: string;
  onProcessingChange?: (processing: boolean) => void;
  /** Called once on mock success (e.g. enroll courses for local UX testing). */
  onSuccess?: () => void;
  successRedirectHref?: string;
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function formatCardNumber(value: string): string {
  return digitsOnly(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

function formatExpiry(value: string): string {
  const digits = digitsOnly(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function isFutureExpiry(mm: number, yy: number): boolean {
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  if (yy > currentYear) return true;
  if (yy < currentYear) return false;
  return mm >= currentMonth;
}

function CardBrandChip({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 min-w-[38px] items-center justify-center rounded border border-[#d1d7dc] bg-white px-1.5 text-[10px] font-black tracking-wide",
        className,
      )}
    >
      {label}
    </span>
  );
}

/**
 * Development-only card UI simulator.
 * Never sends or stores card data. Not a real Stripe transaction.
 */
export function MockCardPaymentForm({
  payLabel,
  formId = MOCK_CHECKOUT_FORM_ID,
  onProcessingChange,
  onSuccess,
  successRedirectHref = "/academics/my-learning",
}: MockCardPaymentFormProps) {
  const router = useRouter();
  const ids = {
    card: useId(),
    expiry: useId(),
    cvc: useId(),
    name: useId(),
  };

  const [status, setStatus] = useState<MockPaymentStatus>("IDLE");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const successHandledRef = useRef(false);
  const onSuccessRef = useRef(onSuccess);
  const redirectHrefRef = useRef(successRedirectHref);

  const disabled = status === "PROCESSING" || status === "SUCCESS";

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    redirectHrefRef.current = successRedirectHref;
  }, [onSuccess, successRedirectHref]);

  useEffect(() => {
    if (status !== "SUCCESS") return;

    // Keep the confirmation visible briefly, then enroll and continue to My Learning.
    const timer = window.setTimeout(() => {
      if (!successHandledRef.current) {
        successHandledRef.current = true;
        onSuccessRef.current?.();
      }
      router.replace(redirectHrefRef.current);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [status, router]);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    const cardDigits = digitsOnly(cardNumber);
    const expiryDigits = digitsOnly(expiry);
    const cvcDigits = digitsOnly(cvc);

    if (cardDigits.length !== 16) {
      next.cardNumber = "Enter a valid card number.";
    }

    const mm = Number(expiryDigits.slice(0, 2));
    const yy = Number(expiryDigits.slice(2, 4));
    if (expiryDigits.length !== 4 || !isFutureExpiry(mm, yy)) {
      next.expiry = "Enter a valid expiry date.";
    }

    if (cvcDigits.length !== 3) {
      next.cvc = "Enter a valid CVC.";
    }

    if (!name.trim()) {
      next.name = "Enter the cardholder name.";
    }

    return next;
  }

  function clearSensitiveFields() {
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setName("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isMockPaymentMode()) {
      setStatus("FAILED");
      setResultMessage("Payment integration is not connected yet.");
      return;
    }

    if (status === "PROCESSING" || status === "SUCCESS") return;

    setStatus("VALIDATING");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("IDLE");
      return;
    }

    const cardDigits = digitsOnly(cardNumber);
    setStatus("PROCESSING");
    onProcessingChange?.(true);
    setResultMessage(null);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (cardDigits === MOCK_DECLINED_CARD) {
      setStatus("FAILED");
      setResultMessage("Your test card was declined.");
      onProcessingChange?.(false);
      return;
    }

    if (cardDigits === MOCK_AUTH_REQUIRED_CARD) {
      setStatus("FAILED");
      setResultMessage("Authentication Required");
      onProcessingChange?.(false);
      return;
    }

    if (cardDigits === MOCK_SUCCESS_CARD) {
      setStatus("SUCCESS");
      setResultMessage("Test payment completed successfully.");
      clearSensitiveFields();
      setErrors({});
      onProcessingChange?.(false);
      return;
    }

    setStatus("FAILED");
    setResultMessage("Your test card was declined.");
    onProcessingChange?.(false);
  }

  function goToMyLearningNow() {
    if (!successHandledRef.current) {
      successHandledRef.current = true;
      onSuccessRef.current?.();
    }
    router.replace(redirectHrefRef.current);
  }

  const inputClass =
    "mt-1.5 w-full rounded-md border border-[#1C1D1F] bg-white px-3 py-2.5 text-sm text-[#2D2F31] placeholder:text-[#6A6F73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70";

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-0" autoComplete="off">
      <div className="overflow-hidden rounded border border-[#d1d7dc]">
        <div className="border-b border-[#d1d7dc] bg-white">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <input
              type="radio"
              name="mock-payment-method"
              checked
              readOnly
              disabled={disabled}
              className="h-4 w-4 accent-[#1B519F]"
              aria-label="Cards"
            />
            <span className="text-sm font-bold text-[#2D2F31]">Cards</span>
            <div className="ml-auto flex flex-wrap items-center justify-end gap-1.5">
              <CardBrandChip label="VISA" className="text-[#1A1F71]" />
              <CardBrandChip label="MC" className="text-[#EB001B]" />
              <CardBrandChip label="AMEX" className="text-[#2E77BC]" />
              <CardBrandChip label="DISC" className="text-[#F76F00]" />
            </div>
          </div>

          <div className="space-y-4 border-t border-[#d1d7dc] bg-[#F7F9FA] px-4 py-4">
            <div>
              <label htmlFor={ids.name} className="block text-sm font-bold text-[#2D2F31]">
                Name on card
              </label>
              <input
                id={ids.name}
                name="mock-name"
                autoComplete="off"
                disabled={disabled}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name on card"
                className={cn(inputClass, errors.name && "border-[#B42318]")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${ids.name}-error` : undefined}
              />
              {errors.name ? (
                <p id={`${ids.name}-error`} className="mt-1 text-xs text-[#B42318]" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={ids.card} className="block text-sm font-bold text-[#2D2F31]">
                Card number
              </label>
              <input
                id={ids.card}
                name="mock-card-number"
                inputMode="numeric"
                autoComplete="off"
                disabled={disabled}
                value={cardNumber}
                onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                placeholder="4242 4242 4242 4242"
                className={cn(inputClass, errors.cardNumber && "border-[#B42318]")}
                aria-invalid={Boolean(errors.cardNumber)}
                aria-describedby={errors.cardNumber ? `${ids.card}-error` : undefined}
              />
              {errors.cardNumber ? (
                <p id={`${ids.card}-error`} className="mt-1 text-xs text-[#B42318]" role="alert">
                  {errors.cardNumber}
                </p>
              ) : null}
              <p className="mt-1 text-xs text-[#6A6F73]">Test card: 4242 4242 4242 4242</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={ids.expiry} className="block text-sm font-bold text-[#2D2F31]">
                  Expiry date
                </label>
                <input
                  id={ids.expiry}
                  name="mock-expiry"
                  inputMode="numeric"
                  autoComplete="off"
                  disabled={disabled}
                  value={expiry}
                  onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                  placeholder="MM / YY"
                  className={cn(inputClass, errors.expiry && "border-[#B42318]")}
                  aria-invalid={Boolean(errors.expiry)}
                  aria-describedby={errors.expiry ? `${ids.expiry}-error` : undefined}
                />
                {errors.expiry ? (
                  <p id={`${ids.expiry}-error`} className="mt-1 text-xs text-[#B42318]" role="alert">
                    {errors.expiry}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor={ids.cvc} className="block text-sm font-bold text-[#2D2F31]">
                  CVC / CVV
                </label>
                <input
                  id={ids.cvc}
                  name="mock-cvc"
                  inputMode="numeric"
                  autoComplete="off"
                  disabled={disabled}
                  value={cvc}
                  onChange={(event) => setCvc(digitsOnly(event.target.value).slice(0, 3))}
                  placeholder="CVC"
                  className={cn(inputClass, errors.cvc && "border-[#B42318]")}
                  aria-invalid={Boolean(errors.cvc)}
                  aria-describedby={errors.cvc ? `${ids.cvc}-error` : undefined}
                />
                {errors.cvc ? (
                  <p id={`${ids.cvc}-error`} className="mt-1 text-xs text-[#B42318]" role="alert">
                    {errors.cvc}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-3.5 opacity-60">
          <input type="radio" name="mock-payment-method-paypal" disabled className="h-4 w-4" aria-label="PayPal" />
          <span className="text-sm font-bold text-[#2D2F31]">PayPal</span>
          <span className="ml-auto text-xs font-semibold text-[#6A6F73]">Unavailable in demo</span>
        </div>
      </div>

      {status === "SUCCESS" ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#07182C]/55 p-4 backdrop-blur-[3px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-success-title"
            aria-describedby="payment-success-description"
            className="w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white text-center shadow-[0_30px_90px_rgba(4,20,40,0.35)]"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#1B519F] via-emerald-500 to-[#F59223]" />
            <div className="px-6 pb-7 pt-8 sm:px-9 sm:pb-9">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_10px_28px_rgba(16,185,129,0.35)]">
                  <CheckIcon className="h-7 w-7" />
                </span>
              </div>

              <span className="mt-7 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700">
                Transaction complete
              </span>
              <h2 id="payment-success-title" className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-3xl">
                Payment successful!
              </h2>
              <p id="payment-success-description" className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600" aria-live="polite">
                {resultMessage ?? "Your payment was completed successfully."} Your course is now ready in My Learning.
              </p>

              <div className="mt-6 rounded-xl border border-[#DCE6F3] bg-[#F7F9FC] px-4 py-3">
                <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
                  Redirecting to My Learning...
                </p>
              </div>

              <button
                type="button"
                onClick={goToMyLearningNow}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1B519F] px-5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(27,81,159,0.24)] transition hover:-translate-y-0.5 hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                Open My Learning
                <span aria-hidden="true">→</span>
              </button>
              <p className="mt-4 text-[11px] font-medium text-slate-400">Secure checkout powered by Smartera Hub</p>
            </div>
          </div>
        </div>
      ) : null}

      {status === "FAILED" && resultMessage ? (
        <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-[#B42318]">
          <p className="font-bold">Payment Failed</p>
          <p className="mt-1">{resultMessage}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red-700/80">Frontend Test Mode</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "PROCESSING" || status === "SUCCESS"}
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#1B519F] px-4 text-base font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
      >
        {status === "PROCESSING" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Processing...
          </>
        ) : (
          <>
            <LockIcon className="h-4 w-4" />
            {payLabel}
          </>
        )}
      </button>

      <p className="mt-3 text-xs text-[#6A6F73]">
        Frontend Test Mode only. This does not charge a card or create a real payment.
      </p>
    </form>
  );
}
